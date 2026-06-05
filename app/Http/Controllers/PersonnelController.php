<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Personnel;

class PersonnelController extends Controller
{
    public function index()
    {
        $personnels = Personnel::query()
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('Personnel/Index', [
            'personnels' => $personnels,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function create()
    {
        return Inertia::render('Personnel/Create');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string'],
            'last_name' => ['required', 'string'],
            'id_number' => ['required', 'unique:personnels,id_number'],
            'email' => ['required', 'email', 'unique:personnels,email'],
            'birth_date' => ['required', 'date'],
            'phone' => ['nullable'],
            'address' => ['nullable'],
            'gender' => ['required'],
        ]);

        $validated['status'] = 'active';

        Personnel::create($validated);

        return redirect()->route('personnel.index');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function show(Personnel $personnel)
    {
        return Inertia::render('Personnel/Show', [
            'personnel' => $personnel,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function edit(Personnel $personnel)
    {
        return Inertia::render('Personnel/Edit', [
            'personnel' => $personnel,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function update(Request $request, Personnel $personnel)
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string'],
            'last_name' => ['required', 'string'],
            'id_number' => [
                'required',
                'unique:personnels,id_number,' . $personnel->id,
            ],
            'email' => [
                'required',
                'email',
                'unique:personnels,email,' . $personnel->id,
            ],
            'birth_date' => ['required', 'date'],
            'phone' => ['nullable'],
            'address' => ['nullable'],
            'gender' => ['required'],
        ]);

        $personnel->update($validated);

        return redirect()
            ->route('personnel.index')
            ->with('success', 'Personal actualizado correctamente.');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function destroy(Personnel $personnel)
    {
        // Here's not a real delete, just a status change to 'inactive' to keep the data for historical purposes.
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function toggleStatus(Personnel $personnel)
    {
        $personnel->status = match ($personnel->status) {
            'active' => 'inactive',
            'inactive' => 'active',
            default => 'inactive',
        };

        $personnel->save();

        return back();
    }
}
