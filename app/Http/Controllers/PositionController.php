<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Position;
use Inertia\Inertia;

class PositionController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:positions.view')->only(['index', 'show']);
        $this->middleware('permission:positions.create')->only(['create', 'store']);
        $this->middleware('permission:positions.edit')->only(['edit', 'update']);
        $this->middleware('permission:positions.delete')->only(['destroy']);
        $this->middleware('permission:positions.toggle-status')->only(['toggleStatus']);
    }
    
    /*------------------------------------------------------------------------------------------------------------------------------------------*/
    
    public function index(Request $request)
    {
        $search = $request->search;

        $positions = Position::query()
            ->when($search, function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Position/Index', [
            'positions' => $positions,
            'filters' => [
                'search' => $search,
            ],
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

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function toggleStatus(Position $position)
    {
        $position->active = !$position->active;
        $position->save();

        return redirect()->route('positions.index');
    }
}
