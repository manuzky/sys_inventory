<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreArticuloRequest;
use App\Http\Requests\UpdateArticuloRequest;
use App\Models\Articulo;
use App\Models\Categoria;
use App\Models\Marca;
use App\Models\UnidadMedida;
use App\Models\Ubicacion;
use App\Models\EstadoArticulo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticuloController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:articulos.view')->only(['index']);
        $this->middleware('permission:articulos.create')->only(['create','store']);
        $this->middleware('permission:articulos.edit')->only(['edit','update']);
        $this->middleware('permission:articulos.delete')->only(['destroy']);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function index(Request $request)
    {
        $search = $request->search;

        $articulos = Articulo::with([
            'categoria',
            'marca',
            'unidadMedida',
            'ubicacion',
            'estado',
        ])
        ->when($search, function ($query, $search) {
            $query->where(function ($q) use ($search) {
                $q->where('codigo', 'like', "%{$search}%")
                    ->orWhere('codigo_patrimonial', 'like', "%{$search}%")
                    ->orWhere('serial', 'like', "%{$search}%")
                    ->orWhere('nombre', 'like', "%{$search}%")
                    ->orWhereHas('categoria', fn ($q) => $q->where('nombre', 'like', "%{$search}%"))
                    ->orWhereHas('marca', fn ($q) => $q->where('nombre', 'like', "%{$search}%"));
            });
        })
        ->latest()
        ->paginate(10)
        ->withQueryString();

        return Inertia::render('Articulos/Index', [
            'articulos' => $articulos,
            'filters' => $request->only('search'),
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function create()
    {
        return Inertia::render('Articulos/Create', [
            'categorias' => Categoria::where('estado', true)->orderBy('nombre')->get(['id','nombre']),
            'marcas' => Marca::where('estado', true)->orderBy('nombre')->get(['id','nombre']),
            'unidadesMedida' => UnidadMedida::where('estado', true)->orderBy('nombre')->get(['id','nombre','abreviatura']),
            'ubicaciones' => Ubicacion::where('estado', true)->orderBy('nombre')->get(['id','nombre']),
            'estadosArticulo' => EstadoArticulo::orderBy('nombre')->get(['id','nombre']),
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function store(StoreArticuloRequest $request)
    {
        Articulo::create($request->validated());

        return redirect()
            ->route('articulos.index')
            ->with('success', 'Artículo registrado correctamente.');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function show(Articulo $articulo)
    {
        $articulo->load([
            'categoria',
            'marca',
            'unidadMedida',
            'ubicacion',
            'estado',
        ]);

        return Inertia::render('Articulos/Show', [
            'articulo' => $articulo,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function edit(Articulo $articulo)
    {
        return Inertia::render('Articulos/Edit', [
            'articulo' => $articulo,
            'categorias' => Categoria::where('estado', true)->orderBy('nombre')->get(['id','nombre']),
            'marcas' => Marca::where('estado', true)->orderBy('nombre')->get(['id','nombre']),
            'unidadesMedida' => UnidadMedida::where('estado', true)->orderBy('nombre')->get(['id','nombre','abreviatura']),
            'ubicaciones' => Ubicacion::where('estado', true)->orderBy('nombre')->get(['id','nombre']),
            'estadosArticulo' => EstadoArticulo::orderBy('nombre')->get(['id','nombre']),
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function update(UpdateArticuloRequest $request, Articulo $articulo)
    {
        $articulo->update($request->validated());

        return redirect()
            ->route('articulos.index')
            ->with('success', 'Artículo actualizado correctamente.');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function destroy(Articulo $articulo)
    {
        $articulo->delete();

        return redirect()
            ->route('articulos.index')
            ->with('success', 'Artículo eliminado correctamente.');
    }
}
