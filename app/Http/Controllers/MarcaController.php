<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Marca;
use Inertia\Inertia;
use App\Http\Requests\StoreMarcaRequest;
use App\Http\Requests\UpdateMarcaRequest;

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
        return Inertia::render('Marcas/Create');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function store(StoreMarcaRequest $request)
    {
        Marca::create(
            $request->validated()
        );

        return redirect()->route('marcas.index');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function show(string $id)
    {
        //
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function edit(Marca $marca)
    {
        return Inertia::render('Marcas/Edit', [
            'marca' => $marca,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function update(UpdateMarcaRequest $request, Marca $marca)
    {
        $marca->update(
            $request->validated()
        );

        return redirect()->route('marcas.index');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function destroy(Marca $marca)
    {
        $marca->delete();

        return redirect()->route('marcas.index');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function toggleStatus(Marca $marca)
    {
        $marca->update([
            'estado' => !$marca->estado,
        ]);

        return back();
    }
}
