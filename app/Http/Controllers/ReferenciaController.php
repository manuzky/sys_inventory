<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReferenciaRequest;
use App\Http\Requests\UpdateReferenciaRequest;
use App\Models\Referencia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReferenciaController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:referencias.view')->only(['index', 'show']);
        $this->middleware('permission:referencias.create')->only(['create', 'store']);
        $this->middleware('permission:referencias.edit')->only(['edit', 'update', 'toggleStatus']);
        $this->middleware('permission:referencias.delete')->only(['destroy']);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function index(Request $request): Response
    {
        $referencias = Referencia::query()
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('codigo', 'like', "%{$search}%")
                        ->orWhere('descripcion', 'like', "%{$search}%");
                });
            })
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Referencias/Index', [
            'referencias' => $referencias,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function create(): Response
    {
        return Inertia::render('Referencias/Create');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function store(StoreReferenciaRequest $request): RedirectResponse
    {
        Referencia::create([
            'codigo' => $request->codigo,
            'descripcion' => $request->descripcion,
            'estado' => true,
        ]);

        return redirect()
            ->route('referencias.index')
            ->with('success', 'Referencia creada correctamente.');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function show(Referencia $referencia): Response
    {
        return Inertia::render('Referencias/Show', [
            'referencia' => $referencia,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function edit(Referencia $referencia): Response
    {
        return Inertia::render('Referencias/Edit', [
            'referencia' => $referencia,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function update(
        UpdateReferenciaRequest $request,
        Referencia $referencia
    ): RedirectResponse {
        $referencia->update([
            'codigo' => $request->codigo,
            'descripcion' => $request->descripcion,
        ]);

        return redirect()
            ->route('referencias.index')
            ->with('success', 'Referencia actualizada correctamente.');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function destroy(Referencia $referencia): RedirectResponse
    {
        $referencia->delete();

        return redirect()
            ->route('referencias.index')
            ->with('success', 'Referencia eliminada correctamente.');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function toggleStatus(Referencia $referencia): RedirectResponse
    {
        $referencia->update([
            'estado' => !$referencia->estado,
        ]);

        return back();
    }
}