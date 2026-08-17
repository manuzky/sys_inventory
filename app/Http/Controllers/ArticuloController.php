<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreArticuloRequest;
use App\Http\Requests\UpdateArticuloRequest;
use App\Models\Articulo;
use App\Models\Categoria;
use App\Models\Marca;
use App\Models\UnidadMedida;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ArticuloController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:articulos.view')->only(['index', 'show',]);
        $this->middleware('permission:articulos.create')->only(['create', 'store',]);
        $this->middleware('permission:articulos.edit')->only(['edit', 'update',]);
        $this->middleware('permission:articulos.delete')->only(['destroy',]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function index(Request $request): Response
    {
        $search = $request->input('search');

        $articulos = Articulo::with([
            'categoria',
            'marca',
            'unidadMedida',
        ])
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('nombre', 'like', "%{$search}%")
                        ->orWhere('modelo', 'like', "%{$search}%")
                        ->orWhere('tipo_articulo', 'like', "%{$search}%")
                        ->orWhereHas('marca', function ($query) use ($search) {
                            $query->where('nombre', 'like', "%{$search}%");
                        })
                        ->orWhereHas('categoria', function ($query) use ($search) {
                            $query->where('nombre', 'like', "%{$search}%");
                        });
                });
            })
            ->orderBy('nombre')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Articulos/Index', [
            'articulos' => $articulos,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function create(): Response
    {
        return Inertia::render('Articulos/Create', [
            'categorias' => Categoria::where('estado', true)
                ->orderBy('nombre')
                ->get(),

            'marcas' => Marca::where('estado', true)
                ->orderBy('nombre')
                ->get(),

            'unidadesMedida' => UnidadMedida::where('estado', true)
                ->orderBy('nombre')
                ->get(),
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function store(StoreArticuloRequest $request): RedirectResponse
    {
        Articulo::create([
            'categoria_id' => $request->categoria_id,
            'marca_id' => $request->marca_id,
            'unidad_medida_id' => $request->unidad_medida_id,

            'tipo_articulo' => $request->tipo_articulo,
            'nombre' => $request->nombre,
            'modelo' => $request->modelo,
            'descripcion' => $request->descripcion,

            'control_individual' => $request->boolean('control_individual'),
            'maneja_serial' => $request->boolean('maneja_serial'),

            'stock' => 0,
            'stock_minimo' => $request->stock_minimo ?? 0,
        ]);

        return redirect()
            ->route('articulos.index')
            ->with('success', 'Artículo creado correctamente.');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function show(Articulo $articulo): Response
    {
        $articulo->load([
            'categoria',
            'marca',
            'unidadMedida',
        ]);

        return Inertia::render('Articulos/Show', [
            'articulo' => $articulo,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function edit(Articulo $articulo): Response
    {
        return Inertia::render('Articulos/Edit', [
            'articulo' => $articulo,

            'categorias' => Categoria::where('estado', true)
                ->orderBy('nombre')
                ->get(),

            'marcas' => Marca::where('estado', true)
                ->orderBy('nombre')
                ->get(),

            'unidadesMedida' => UnidadMedida::where('estado', true)
                ->orderBy('nombre')
                ->get(),
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function update(UpdateArticuloRequest $request, Articulo $articulo): RedirectResponse
    {
        $articulo->update([
            'categoria_id' => $request->categoria_id,
            'marca_id' => $request->marca_id,
            'unidad_medida_id' => $request->unidad_medida_id,

            'tipo_articulo' => $request->tipo_articulo,
            'nombre' => $request->nombre,
            'modelo' => $request->modelo,
            'descripcion' => $request->descripcion,

            'control_individual' => $request->boolean('control_individual'),
            'maneja_serial' => $request->boolean('maneja_serial'),

            'stock_minimo' => $request->stock_minimo ?? 0,
        ]);

        return redirect()
            ->route('articulos.index')
            ->with('success', 'Artículo actualizado correctamente.');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function destroy(Articulo $articulo): RedirectResponse
    {
        $articulo->delete();

        return redirect()
            ->route('articulos.index')
            ->with('success', 'Artículo eliminado correctamente.');
    }
}
