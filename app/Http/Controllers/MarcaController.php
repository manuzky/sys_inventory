<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Marca;
use Inertia\Inertia;

class MarcaController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:marcas.view')->only(['index']);
        $this->middleware('permission:marcas.create')->only(['create', 'store']);
        $this->middleware('permission:marcas.edit')->only(['edit', 'update']);
        $this->middleware('permission:marcas.delete')->only(['destroy']);
        $this->middleware('permission:marcas.toggle-status')->only(['toggleStatus']);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function index(Request $request)
    {
        $search = $request->search;

        $marcas = Marca::query()
            ->when($search, function ($query) use ($search) {
                $query->where('nombre', 'like', "%{$search}%")
                    ->orWhere('descripcion', 'like', "%{$search}%");
            })
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Marcas/Index', [
            'marcas' => $marcas,
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

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function toggleStatus(Marca $marca)
    {
        //
    }
}
