<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use App\Http\Requests\StorePermissionRequest;
use App\Http\Requests\UpdatePermissionRequest;

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
        $permissions = Permission::orderBy('name')->get()->groupBy(function ($permission) {
            return explode('.', $permission->name)[0];
        });

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

    public function store(StorePermissionRequest $request)
    {
        $data = $request->validated();

        Permission::create([
            'name' => $data['name'],
            'display_name' => $data['display_name'],
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

    public function update(UpdatePermissionRequest $request, Permission $permission)
    {
        $data = $request->validated();

        $permission->update([
            'name' => $data['name'],
            'display_name' => $data['display_name'],
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