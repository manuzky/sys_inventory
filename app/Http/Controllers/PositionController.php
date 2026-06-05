<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Position;
use Inertia\Inertia;

class PositionController extends Controller
{
    public function index()
    {
        $positions = Position::query()
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('Position/Index', [
            'positions' => $positions,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function create()
    {
        return Inertia::render('Position/Create');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['nullable', 'string'],
        ]);

        $validated['active'] = true;

        Position::create($validated);

        return redirect()->route('positions.index');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function show(Position $position)
    {
        // Here's no need to show a position, so this method is intentionally left blank.
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function edit(Position $position)
    {
        return Inertia::render('Position/Edit', [
            'position' => $position,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function update(Request $request, Position $position)
    {
        $validated = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'active' => ['boolean'],
        ]);

        $position->update($validated);

        return redirect()->route('positions.index');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function destroy(Position $position)
    {
         $hasHistory = $position->personnelHistories()->exists();

        if ($hasHistory) {
            return back()->withErrors([
                'error' => 'No se puede eliminar: este cargo tiene historial asignado.'
            ]);
        }

        $position->delete();

        return redirect()->route('positions.index');
    }
}
