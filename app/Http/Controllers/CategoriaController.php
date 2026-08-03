<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Categoria;
use App\Http\Requests\StoreCategoriaRequest;
use App\Http\Requests\UpdateCategoriaRequest;

class CategoriaController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:categorias.view')->only(['index']);
        $this->middleware('permission:categorias.create')->only(['create', 'store']);
        $this->middleware('permission:categorias.edit')->only(['edit', 'update']);
        $this->middleware('permission:categorias.delete')->only(['destroy']);
        $this->middleware('permission:categorias.toggle-status')->only(['toggleStatus']);
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
        return Inertia::render('Categorias/Create');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function store(StoreCategoriaRequest $request)
    {
        Categoria::create(
            $request->validated()
        );

        return redirect()
            ->route('categorias.index')
            ->with('success', 'Categoría creada correctamente.');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function show(string $id)
    {
        // No es necesario agregar esto porque solo hay 2 campos en el formulario xd
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function edit(Categoria $categoria)
    {
        return Inertia::render('Categorias/Edit', [
            'categoria' => $categoria,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function update(UpdateCategoriaRequest $request, Categoria $categoria)
    {
        $categoria->update(
            $request->validated()
        );

        return redirect()
            ->route('categorias.index')
            ->with('success', 'Categoría actualizada correctamente.');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function destroy(Categoria $categoria)
    {
        $categoria->delete();

        return redirect()
            ->route('categorias.index')
            ->with('success', 'Categoría eliminada correctamente.');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function toggleStatus(Categoria $categoria)
    {
        $categoria->update([
            'estado' => !$categoria->estado,
        ]);

        return back();
    }
}
