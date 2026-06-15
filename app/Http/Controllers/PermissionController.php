<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:permissions.view')->only(['index', 'show']);
        $this->middleware('permission:permissions.create')->only(['create', 'store']);
        $this->middleware('permission:permissions.edit')->only(['edit', 'update']);
        $this->middleware('permission:permissions.delete')->only(['destroy']);
    }
    
    /*------------------------------------------------------------------------------------------------------------------------------------------*/
    
    public function index()
    {
        $permissions = Permission::orderBy('name')->get();

        return Inertia::render('Roles&Permissions/Permissions/Index', [
            'permissions' => $permissions,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function create()
    {
        return Inertia::render('Roles&Permissions/Permissions/Create');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                'unique:permissions,name',
            ],
        ]);

        Permission::create([
            'name' => $validated['name'],
            'guard_name' => 'web',
        ]);

        return redirect()
            ->route('permissions.index')
            ->with('success', 'Permiso creado correctamente');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function show(Permission $permission)
    {
        return Inertia::render('Roles&Permissions/Permissions/Show', [
            'permission' => $permission,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function edit(Permission $permission)
    {
        return Inertia::render('Roles&Permissions/Permissions/Edit', [
            'permission' => $permission,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function update(Request $request, Permission $permission)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                'unique:permissions,name,' . $permission->id,
            ],
        ]);

        $permission->update([
            'name' => $validated['name'],
        ]);

        return redirect()
            ->route('permissions.index')
            ->with('success', 'Permiso actualizado correctamente');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function destroy(Permission $permission)
    {
        $permission->delete();

        return redirect()
            ->route('permissions.index')
            ->with('success', 'Permiso eliminado correctamente');
    }
}