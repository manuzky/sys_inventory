<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Personnel;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Spatie\Permission\Models\Permission;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:users.view')->only(['index', 'show']);
        $this->middleware('permission:users.create')->only(['create', 'store']);
        $this->middleware('permission:users.edit')->only(['edit', 'update']);
        // $this->middleware('permission:users.delete')->only(['destroy']);
        $this->middleware('permission:users.toggle-status')->only(['toggleStatus']);
    }
    
    /*------------------------------------------------------------------------------------------------------------------------------------------*/
    
    public function index(Request $request)
    {
        $search = $request->search;

        $users = User::with('personnel')
            ->when($search, function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('username', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhereHas('personnel', function ($q) use ($search) {
                        $q->where('first_name', 'like', "%{$search}%")
                            ->orWhere('last_name', 'like', "%{$search}%");
                    });
            })
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Users/Index', [
            'users' => $users,
            'roles' => Role::orderBy('name')->get(),
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function create()
    {
        $personnels = Personnel::query()
            ->with([ 'positionsHistory.position' ])
            ->whereDoesntHave('user')
            ->orderBy('first_name')
            ->get();

        $roles = Role::with('permissions')
            ->orderBy('name')
            ->get();

        $permissions = Permission::orderBy('name')
            ->get(['id', 'name', 'display_name']);

        $permissionGroups = $permissions
            ->groupBy(function ($permission) {
                return ucfirst(
                    explode('.', $permission->name)[0]
                );
            })
            ->map(function ($permissions, $group) {

                return [
                    'name' => $group,
                    'permissions' => $permissions->values(),
                ];

            })
            ->values();

        return Inertia::render('Users/Create', [
            'personnels' => $personnels,
            'roles' => $roles,
            'permissionGroups' => $permissionGroups,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function store(StoreUserRequest $request)
    {
        $validated = $request->validated();

        $personnel = Personnel::findOrFail($validated['personnel_id']);

        if ($personnel->user) {
            return back()
                ->withErrors([
                    'personnel_id' => 'Esta persona ya tiene un usuario asignado.',
                ])
                ->withInput();
        }

        $user = User::create([
            'personnel_id' => $personnel->id,
            'name' => trim($personnel->first_name . ' ' . $personnel->last_name),
            'username' => $validated['username'],
            'email' => $personnel->email,
            'password' => Hash::make($validated['password']),
            'active' => true,
        ]);

        // Asignar rol
        $user->assignRole($validated['role']);
        // Asignar permisos adicionales (si existen)
        $user->givePermissionTo($validated['permissions'] ?? []);

        return redirect()
            ->route('users.index')
            ->with('success', 'Usuario creado correctamente.');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function show(User $user)
    {
        $user->load([
            'personnel.positionsHistory.position',
            'roles',
        ]);

        $currentPosition = optional(
            $user->personnel?->positionsHistory()
                ->with('position')
                ->latest('start_date')
                ->first()
        )->position;

        return Inertia::render('Users/Show', [
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email,
                'active' => $user->active,
                'created_at' => $user->created_at?->format('d/m/Y H:i'),
                'roles' => $user->getRoleNames(),

                'personnel' => $user->personnel ? [
                    'id' => $user->personnel->id,
                    'first_name' => $user->personnel->first_name,
                    'last_name' => $user->personnel->last_name,
                    'full_name' => $user->personnel->full_name,
                    'email' => $user->personnel->email,
                    'document_type' => $user->personnel->document_type,
                    'id_number' => $user->personnel->id_number,
                    'phone' => $user->personnel->phone,
                    'status' => $user->personnel->status,
                    'photo' => $user->personnel->photo,
                    'position' => $currentPosition?->name,
                ] : null,
            ],
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function edit(User $user)
    {
        $user->load([
            'personnel',
            'roles',
        ]);

        $personnels = Personnel::query()
            ->with([
                'positionsHistory' => function ($query) {
                    $query->whereNull('end_date');
                },
                'positionsHistory.position',
            ])
            ->where(function ($query) use ($user) {
                $query->whereDoesntHave('user')
                    ->orWhere('id', $user->personnel_id);
            })
            ->orderBy('first_name')
            ->get();

        $permissions = Permission::orderBy('name')
            ->get(['id', 'name', 'display_name']);

        $permissionGroups = $permissions
            ->groupBy(function ($permission) {
                return ucfirst(
                    explode('.', $permission->name)[0]
                );
            })
            ->map(function ($permissions, $group) {
                return [
                    'name' => $group,
                    'permissions' => $permissions->values(),
                ];
            })
            ->values();

        return Inertia::render('Users/Edit', [
            'user' => $user,

            'personnels' => $personnels,

            'roles' => Role::with('permissions')
                ->orderBy('name')
                ->get(),

            'permissionGroups' => $permissionGroups,

            'userRoles' => $user
                ->getRoleNames()
                ->toArray(),

            'userPermissions' => $user
                ->getDirectPermissions()
                ->pluck('name')
                ->values(),
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function update(UpdateUserRequest $request, User $user)
    {
        $validated = $request->validated();

        $newPersonnel = Personnel::findOrFail(
            $validated['personnel_id']
        );

        $user->personnel_id = $newPersonnel->id;
        $user->username = $validated['username'];

        if (
            !empty($validated['change_password']) &&
            !empty($validated['password'])
        ) {
            $user->password = Hash::make(
                $validated['password']
            );
        }

        $user->save();

        // Rol
        $user->syncRoles([
            $validated['role']
        ]);

        // Permisos adicionales
        $user->syncPermissions(
            $validated['permissions'] ?? []
        );

        return redirect()
            ->route('users.index')
            ->with(
                'success',
                'Usuario actualizado correctamente.'
            );
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function destroy(User $user)
    {
        //
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function toggleStatus(User $user)
    {
        if ($user->id === Auth::id()) {
            return back()->withErrors([
                'error' => 'No puedes deshabilitar tu propio usuario.'
            ]);
        }

        $user->active = ! $user->active;
        $user->save();

        return back()->with('success', 'Estado del usuario actualizado correctamente.');
    }
}
