<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEntradaRequest;
use App\Http\Requests\UpdateEntradaRequest;
use App\Models\Entrada;
use App\Models\Proveedor;
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

        $entradas = Entrada::with('proveedor')
            ->when($search,function($query,$search){
                $query->where('numero_documento','like',"%{$search}%")
                    ->orWhere('tipo_documento','like',"%{$search}%")
                    ->orWhereHas('proveedor',function($q) use ($search){
                        $q->where('nombre','like',"%{$search}%");
                    });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Entradas/Index',[
            'entradas'=>$entradas,
            'filters'=>$request->only('search'),
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function create()
    {
        return Inertia::render('Entradas/Create',[
            'proveedores'=>Proveedor::where('estado',true)
                ->orderBy('nombre')
                ->get(['id','nombre']),
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function store(StoreEntradaRequest $request)
    {
        Entrada::create($request->validated());

        return redirect()->route('entradas.index');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function show(Entrada $entrada)
    {
        $entrada->load('proveedor');

        return Inertia::render('Entradas/Show',[
            'entrada'=>$entrada,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function edit(Entrada $entrada)
    {
        return Inertia::render('Entradas/Edit',[
            'entrada'=>$entrada,
            'proveedores'=>Proveedor::where('estado',true)
                ->orderBy('nombre')
                ->get(['id','nombre']),
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function update(UpdateEntradaRequest $request, Entrada $entrada)
    {
        $entrada->update($request->validated());

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
