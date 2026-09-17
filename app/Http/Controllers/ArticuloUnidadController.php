<?php

namespace App\Http\Controllers;

use App\Models\Articulo;
use App\Models\ArticuloUnidad;
use Illuminate\Http\Request;

class ArticuloUnidadController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:articulo-unidades.view')->only(['index', 'show']);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function index(Request $request)
    {
        $query = ArticuloUnidad::with([
            'articulo.referencia',
            'articulo.marca',
            'ubicacion',
            'estado',
        ]);

        if ($request->filled('search')) {
            $search = $request->input('search');

            $query->where(function ($q) use ($search) {
                $q->where('identificador', 'like', "%{$search}%")
                    ->orWhere('serial', 'like', "%{$search}%")
                    ->orWhereHas('articulo', function ($q) use ($search) {
                        $q->where('nombre', 'like', "%{$search}%");
                    });
            });
        }

        $unidades = $query
            ->latest('id')
            ->paginate(15)
            ->withQueryString();

        return inertia('ArticuloUnidades/Index', [
            'unidades' => $unidades,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function show(ArticuloUnidad $articuloUnidad)
    {
        $articuloUnidad->load([
            'articulo.referencia',
            'articulo.categoria',
            'articulo.marca',
            'ubicacion',
            'estado',
        ]);

        return inertia('ArticuloUnidades/Show', [
            'unidad' => $articuloUnidad,
        ]);
    }
}