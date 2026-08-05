<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UnidadMedida;
use App\Http\Requests\StoreUnidadMedidaRequest;
use App\Http\Requests\UpdateUnidadMedidaRequest;
use Inertia\Inertia;

class UnidadMedidaController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:unidades-medida.view')->only(['index', 'show']);
        $this->middleware('permission:unidades-medida.create')->only(['create', 'store']);
        $this->middleware('permission:unidades-medida.edit')->only(['edit', 'update']);
        $this->middleware('permission:unidades-medida.delete')->only(['destroy']);
        $this->middleware('permission:unidades-medida.toggle-status')->only(['toggleStatus']);
    }
    
    /*------------------------------------------------------------------------------------------------------------------------------------------*/
    public function index(Request $request)
    {
        $search = $request->search;

        $unidades = UnidadMedida::query()
            ->when($search, function ($query) use ($search) {
                $query->where('nombre', 'like', "%{$search}%")
                    ->orWhere('abreviatura', 'like', "%{$search}%");
            })
            ->orderBy('id','desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('UnidadesMedida/Index', [
            'unidades' => $unidades,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function create()
    {
        return Inertia::render('UnidadesMedida/Create');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function store(StoreUnidadMedidaRequest $request)
    {
        UnidadMedida::create(
            $request->validated()
        );

        return redirect()
            ->route('unidades-medida.index');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function show(string $id)
    {
        //
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function edit(UnidadMedida $unidadMedida)
    {
        return Inertia::render('UnidadesMedida/Edit',[
            'unidad'=>$unidadMedida,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function update(UpdateUnidadMedidaRequest $request,UnidadMedida $unidadMedida)
    {
        $unidadMedida->update(
            $request->validated()
        );

        return redirect()->route('unidades-medida.index');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function destroy(UnidadMedida $unidadMedida)
    {
        $unidadMedida->delete();

        return redirect()
            ->route('unidades-medida.index');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function toggleStatus(UnidadMedida $unidadMedida)
    {
        $unidadMedida->update([
            'estado' => !$unidadMedida->estado,
        ]);

        return back();
    }
}
