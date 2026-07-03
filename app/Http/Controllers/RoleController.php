<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:roles.view')->only(['index', 'show']);
        $this->middleware('permission:roles.create')->only(['create', 'store']);
        $this->middleware('permission:roles.edit')->only(['edit', 'update']);
        $this->middleware('permission:roles.delete')->only(['destroy']);
    }
    
    /*------------------------------------------------------------------------------------------------------------------------------------------*/
    
    public function index(Request $request)
    {
        $search = $request->search;

        $roles = Role::withCount('permissions')
            ->withCount('users')
            ->when($search, function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Roles&Permissions/Roles/Index', [
            'roles' => $roles,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function create()
    {
        $permissions = Permission::orderBy('name')
            ->get(['id', 'name', 'display_name']);

        return Inertia::render('Roles&Permissions/Roles/Create', [
            'permissions' => $permissions,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:roles,name'],
            'permissions' => ['array'],
        ]);

        $role = Role::create([
            'name' => $validated['name'],
        ]);

        $role->syncPermissions(
            $validated['permissions'] ?? []
        );

        return redirect()
            ->route('roles.index')
            ->with('success', 'Rol creado correctamente');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function show(Role $role)
    {
        $role->load([
            'permissions',
            'users',
        ]);

        return Inertia::render('Roles&Permissions/Roles/Show', [
            'role' => $role,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function edit(Role $role)
    {
        $role->load('permissions');

        $permissions = Permission::orderBy('name')
            ->get();

        return Inertia::render('Roles&Permissions/Roles/Edit', [
            'role' => $role,
            'permissions' => $permissions,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function update(Request $request, Role $role)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                'unique:roles,name,' . $role->id,
            ],
            'permissions' => ['array'],
        ]);

        $role->update([
            'name' => $validated['name'],
        ]);

        $role->syncPermissions(
            $validated['permissions'] ?? []
        );

        return redirect()
            ->route('roles.index')
            ->with('success', 'Rol actualizado correctamente');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function destroy(Role $role)
    {
        if ($role->users()->exists()) {
            return back()->withErrors([
                'error' => 'No se pudo eliminar el rol porque actualmente está asignado a uno o más usuarios.',
            ]);
        }

        $role->delete();

        return back()->with('success', 'Rol eliminado correctamente.');
    }
}
