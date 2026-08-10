<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreEntradaRequest;
use App\Http\Requests\UpdateEntradaRequest;
use App\Models\Entrada;
use App\Models\Proveedor;
use App\Models\Articulo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EntradaController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:entradas.view')->only(['index','show']);
        $this->middleware('permission:entradas.create')->only(['create','store']);
        $this->middleware('permission:entradas.edit')->only(['edit','update']);
        $this->middleware('permission:entradas.delete')->only(['destroy']);
        $this->middleware('permission:entradas.toggle-status')->only(['toggleStatus']);
    }
    
    /*------------------------------------------------------------------------------------------------------------------------------------------*/
    public function index(Request $request)
    {
        $search = $request->search;

        $entradas = Entrada::with(['proveedor','usuario'])
            ->when($search, function ($query, $search) {
                $query->where('numero_documento','like',"%{$search}%")
                    ->orWhere('tipo_documento','like',"%{$search}%")
                    ->orWhereHas('proveedor', fn($q) => $q->where('nombre','like',"%{$search}%"));
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Entradas/Index', [
            'entradas' => $entradas,
            'filters' => $request->only('search'),
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function create()
    {
        return Inertia::render('Entradas/Create', [
            'proveedores' => Proveedor::where('estado',true)->orderBy('nombre')->get(['id','nombre']),
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function store(StoreEntradaRequest $request)
    {
        DB::transaction(function () use ($request) {
            $data = $request->validated();

            $entrada = Entrada::create([
                'proveedores_id' => $data['proveedores_id'],
                'users_id' => Auth::id(),
                'fecha' => $data['fecha'],
                'tipo_documento' => $data['tipo_documento'],
                'numero_documento' => $data['numero_documento'],
                'observacion' => $data['observacion'] ?? null,
            ]);

            $entrada->detalles()->createMany($data['detalles']);
        });

        return redirect()->route('entradas.index');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function show(Entrada $entrada)
    {
        $entrada->load(['proveedor','usuario','detalles']);

        return Inertia::render('Entradas/Show', [
            'entrada' => $entrada,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function edit(Entrada $entrada)
    {
        $entrada->load('detalles');

        return Inertia::render('Entradas/Edit', [
            'entrada' => $entrada,
            'proveedores' => Proveedor::where('estado',true)->orderBy('nombre')->get(['id','nombre']),
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function update(UpdateEntradaRequest $request, Entrada $entrada)
    {
        DB::transaction(function () use ($request, $entrada) {
            $data = $request->validated();

            $entrada->update([
                'proveedores_id' => $data['proveedores_id'],
                'fecha' => $data['fecha'],
                'tipo_documento' => $data['tipo_documento'],
                'numero_documento' => $data['numero_documento'],
                'observacion' => $data['observacion'] ?? null,
            ]);

            $entrada->detalles()->delete();
            $entrada->detalles()->createMany($data['detalles']);
        });

        return redirect()->route('entradas.index');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function destroy(Entrada $entrada)
    {
        $entrada->delete();

        return redirect()->route('entradas.index');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function toggleStatus(Entrada $entrada)
    {
        $entrada->update([
            'estado'=>!$entrada->estado,
        ]);

        return redirect()->back();
    }
}
