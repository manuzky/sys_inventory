<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Personnel;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:users.view')->only(['index', 'show']);
        $this->middleware('permission:users.create')->only(['create', 'store']);
        $this->middleware('permission:users.edit')->only(['edit', 'update']);
        $this->middleware('permission:users.delete')->only(['destroy']);
        $this->middleware('permission:users.toggle-status')->only(['toggleStatus']);
    }
    
    /*------------------------------------------------------------------------------------------------------------------------------------------*/
    
    public function index()
    {
        $users = User::with('personnel')
            ->orderBy('name')
            ->get();

        return Inertia::render('Users/Index', [
            'users' => $users,
            'roles' => Role::orderBy('name')->get(),
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function create()
    {
        $personnels = Personnel::query()
            ->whereDoesntHave('user')
            ->orderBy('first_name')
            ->get();

        return Inertia::render('Users/Create', [
            'personnels' => $personnels,
            'roles' => Role::orderBy('name')->get(),
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function store(Request $request)
    {
        $validated = $request->validate([
            'personnel_id' => ['required', 'exists:personnels,id'],
            'username' => ['required', 'string', 'max:255', 'unique:users,username'],
            'password' => ['required', 'confirmed', 'min:8'],
            'roles' => ['array'],
        ]);

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

        $user->syncRoles(
            $validated['roles'] ?? []
        );

        return redirect()
            ->route('users.index')
            ->with('success', 'Usuario creado correctamente.');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function show(User $user)
    {
        $user->load('personnel');

        return Inertia::render('Users/Show', [
            'user' => [
                'id' => $user->id,
                'name' => $user->personnel?->full_name,
                'username' => $user->username,
                'email' => $user->email,
                'active' => $user->active,
                'created_at' => $user->created_at?->format('d/m/Y H:i'),
                'roles' => $user->getRoleNames(),
                'personnel' => $user->personnel ? [
                    'id' => $user->personnel->id,
                    'first_name' => $user->personnel->first_name,
                    'last_name' => $user->personnel->last_name,
                    'email' => $user->personnel->email,
                ] : null,
            ],
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function edit(User $user)
    {
        $user->load('personnel');

        $personnels = Personnel::query()
            ->whereDoesntHave('user')
            ->orWhere('id', $user->personnel_id) // 👈 CLAVE
            ->orderBy('first_name')
            ->get();

        return Inertia::render('Users/Edit', [
            'user' => $user,
            'personnels' => $personnels,

            'roles' => Role::orderBy('name')->get(),

            'userRoles' => $user
                ->getRoleNames()
                ->toArray(),
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'username' => [
                'required',
                'string',
                'max:255',
                'unique:users,username,' . $user->id,
            ],

            'roles' => ['array'],
            'roles.*' => ['exists:roles,name'],
            
            'personnel_id' => ['required', 'exists:personnels,id'],
            'change_password' => ['boolean'],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
        ]);

        $newPersonnel = Personnel::findOrFail($validated['personnel_id']);

        $user->personnel_id = $newPersonnel->id;

        $user->username = $validated['username'];

        if (!empty($validated['change_password']) && !empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        $user->syncRoles(
            $validated['roles'] ?? []
        );

        return redirect()->route('users.index')->with('success', 'Usuario actualizado correctamente.');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function destroy(User $user)
    {
        //
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function toggleStatus(User $user)
    {
        if ($user->id === auth()->id()) {
            return back()->withErrors([
                'error' => 'No puedes deshabilitar tu propio usuario.'
            ]);
        }

        $user->active = ! $user->active;
        $user->save();

        return back()->with('success', 'Estado del usuario actualizado correctamente.');
    }
}
