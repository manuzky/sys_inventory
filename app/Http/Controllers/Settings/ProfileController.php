<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        $personnel = $request->user()->personnel;

        $personnel->load([
            'positionsHistory.position',
            'emergencyContacts.relationship',
            'user.roles',
        ]);

        $currentPosition = $personnel->positionsHistory()
            ->whereNull('end_date')
            ->with('position')
            ->first();

        $history = $personnel->positionsHistory()
            ->with('position')
            ->latest('start_date')
            ->get();

        return Inertia::render('settings/profile', [
            'personnel' => $personnel,
            'current_position' => $currentPosition,
            'history' => $history,
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        $request->user()->save();

        return to_route('profile.edit');
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
