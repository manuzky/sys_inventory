<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $user = $request->user()?->load([
            'personnel',
        ]);

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'username' => $user->username,
                    'email' => $user->email,
                    'email_verified_at' => $user->email_verified_at,

                    'personnel' => $user->personnel ? [
                        'first_name' => $user->personnel->first_name,
                        'last_name' => $user->personnel->last_name,
                        'id_number' => $user->personnel->id_number,
                        'email' => $user->personnel->email,
                        'birth_date' => $user->personnel->birth_date,
                        'gender' => $user->personnel->gender,
                        'phone' => $user->personnel->phone,
                        'address' => $user->personnel->address,
                        'status' => $user->personnel->status,
                        'photo' => $user->personnel->photo,
                    ] : null,
                ] : null,

                'permissions' => $user
                    ? $user->getAllPermissions()->pluck('name')
                    : [],

                'roles' => $user
                    ? $user->getRoleNames()
                    : [],
            ],
        ]);
    }
}