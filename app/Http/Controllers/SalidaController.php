<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreSalidaRequest;
use App\Http\Requests\UpdateSalidaRequest;
use App\Models\Salida;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SalidaController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:salidas.view')->only(['index', 'show']);
        $this->middleware('permission:salidas.create')->only(['create', 'store']);
        $this->middleware('permission:salidas.edit')->only(['edit', 'update']);
        $this->middleware('permission:salidas.delete')->only(['destroy']);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function index(Request $request)
    {
        $search = $request->search;

        $salidas = Salida::with('usuario')
            ->when($search, function ($query, $search) {
                $query->where('motivo', 'like', "%{$search}%")
                    ->orWhere('observaciones', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Salidas/Index', [
            'salidas' => $salidas,
            'filters' => $request->only('search'),
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function create()
    {
        return Inertia::render('Salidas/Create');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function store(StoreSalidaRequest $request)
    {
        Salida::create([
            'usuario_id' => Auth::id(),
            'fecha' => $request->validated()['fecha'],
            'motivo' => $request->validated()['motivo'],
            'observaciones' => $request->validated()['observaciones'] ?? null,
        ]);

        return redirect()->route('salidas.index');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function show(Salida $salida)
    {
        $salida->load('usuario');

        return Inertia::render('Salidas/Show', [
            'salida' => $salida,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function edit(Salida $salida)
    {
        return Inertia::render('Salidas/Edit', [
            'salida' => $salida,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function update(UpdateSalidaRequest $request, Salida $salida)
    {
        $data = $request->validated();

        $salida->update([
            'fecha' => $data['fecha'],
            'motivo' => $data['motivo'],
            'observaciones' => $data['observaciones'] ?? null,
        ]);

        return redirect()->route('salidas.index');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function destroy(Salida $salida)
    {
        $salida->delete();

        return redirect()->route('salidas.index');
    }
}
