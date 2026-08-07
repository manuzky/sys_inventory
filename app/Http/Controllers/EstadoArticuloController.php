<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreEstadoArticuloRequest;
use App\Http\Requests\UpdateEstadoArticuloRequest;
use App\Models\EstadoArticulo;
use Inertia\Inertia;

class EstadoArticuloController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:estados-articulo.view')->only(['index','show']);
        $this->middleware('permission:estados-articulo.create')->only(['create','store']);
        $this->middleware('permission:estados-articulo.edit')->only(['edit','update']);
        $this->middleware('permission:estados-articulo.delete')->only(['destroy']);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function index(Request $request)
    {
        $search = $request->search;

        $estados = EstadoArticulo::when($search,function($query,$search){
            $query->where('nombre','like',"%{$search}%")
                ->orWhere('descripcion','like',"%{$search}%");
        })->latest()->paginate(10)->withQueryString();

        return Inertia::render('EstadosArticulo/Index',[
            'estados'=>$estados,
            'filters'=>$request->only('search'),
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function create()
    {
        return Inertia::render('EstadosArticulo/Create');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function store(StoreEstadoArticuloRequest $request)
    {
        EstadoArticulo::create($request->validated());

        return redirect()->route('estados-articulo.index');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function show(EstadoArticulo $estadoArticulo)
    {
        // 
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function edit(EstadoArticulo $estadoArticulo)
    {
        return Inertia::render('EstadosArticulo/Edit',[
            'estado'=>$estadoArticulo,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function update(UpdateEstadoArticuloRequest $request, EstadoArticulo $estadoArticulo)
    {
        $estadoArticulo->update($request->validated());

        return redirect()->route('estados-articulo.index');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function destroy(EstadoArticulo $estadoArticulo)
    {
        $estadoArticulo->delete();

        return redirect()->route('estados-articulo.index');
    }
}
