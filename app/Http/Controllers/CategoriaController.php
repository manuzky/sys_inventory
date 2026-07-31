<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Categoria;


class CategoriaController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:categorias.view')->only(['index']);
        $this->middleware('permission:categorias.create')->only(['create', 'store']);
        $this->middleware('permission:categorias.edit')->only(['edit', 'update']);
        $this->middleware('permission:categorias.delete')->only(['destroy']);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function index(Request $request)
    {
        $search = $request->search;

        $categorias = Categoria::query()
            ->when($search, function ($query) use ($search) {
                $query->where('nombre', 'like', "%{$search}%")
                    ->orWhere('descripcion', 'like', "%{$search}%");
            })
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Categorias/Index', [
            'categorias' => $categorias,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function create()
    {
        //
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function store(Request $request)
    {
        //
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function show(string $id)
    {
        //
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function edit(string $id)
    {
        //
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function update(Request $request, string $id)
    {
        //
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function destroy(string $id)
    {
        //
    }
}
