<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Personnel;
use App\Models\Position;

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
        return Inertia::render('Personnel/Create', [
            'positions' => Position::where('active', true)->get()
        ]);
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

            // 👇 NUEVO
            'position_id' => ['required', 'exists:positions,id'],
        ]);

        DB::transaction(function () use ($validated) {

            // 1. Crear personnel
            $personnel = Personnel::create([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'id_number' => $validated['id_number'],
                'email' => $validated['email'],
                'birth_date' => $validated['birth_date'],
                'phone' => $validated['phone'] ?? null,
                'address' => $validated['address'] ?? null,
                'gender' => $validated['gender'],
                'status' => 'active',
            ]);

            // 2. Crear historial de cargo
            $personnel->positionsHistory()->create([
                'position_id' => $validated['position_id'],
                'start_date' => now(),
                'end_date' => null,
            ]);

        });

        return redirect()->route('personnel.index');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function show(Personnel $personnel)
    {
        $personnel->load(['positionsHistory.position']);

        $currentPosition = $personnel->positionsHistory()
            ->whereNull('end_date')
            ->with('position')
            ->first();

        $history = $personnel->positionsHistory()
            ->with('position')
            ->orderByDesc('start_date')
            ->get();

        return Inertia::render('Personnel/Show', [
            'personnel' => $personnel,
            'current_position' => $currentPosition,
            'history' => $history,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function edit(Personnel $personnel)
    {
        $currentPosition = $personnel->positionsHistory()
            ->whereNull('end_date')
            ->first();

        $positions = Position::where('active', true)->get();

        if (
            $currentPosition &&
            !$positions->contains('id', $currentPosition->position_id)
        ) {
            $positions->push(
                Position::find($currentPosition->position_id)
            );
        }

        return Inertia::render('Personnel/Edit', [
            'personnel' => $personnel,
            'positions' => $positions,
            'current_position_id' => $currentPosition?->position_id,
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

            // 👇 NUEVO
            'position_id' => ['required', 'exists:positions,id'],
        ]);

        DB::transaction(function () use ($personnel, $validated) {

            // 1. Guardar datos básicos
            $personnel->update([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'id_number' => $validated['id_number'],
                'email' => $validated['email'],
                'birth_date' => $validated['birth_date'],
                'phone' => $validated['phone'] ?? null,
                'address' => $validated['address'] ?? null,
                'gender' => $validated['gender'],
            ]);

            // 2. Obtener cargo actual activo
            $currentPosition = $personnel->positionsHistory()
                ->whereNull('end_date')
                ->first();

            // 3. Si cambió el cargo, cerramos el anterior y abrimos uno nuevo
            if (!$currentPosition || $currentPosition->position_id != $validated['position_id']) {

                // cerrar el actual
                if ($currentPosition) {
                    $currentPosition->update([
                        'end_date' => now(),
                    ]);
                }

                // crear nuevo cargo
                $personnel->positionsHistory()->create([
                    'position_id' => $validated['position_id'],
                    'start_date' => now(),
                    'end_date' => null,
                ]);
            }

        });

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
