<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ubicacion;
use Inertia\Inertia;
use App\Http\Requests\StoreUbicacionRequest;
use App\Http\Requests\UpdateUbicacionRequest;

class UbicacionController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:ubicaciones.view')->only(['index','show']);
        $this->middleware('permission:ubicaciones.create')->only(['create','store']);
        $this->middleware('permission:ubicaciones.edit')->only(['edit','update']);
        $this->middleware('permission:ubicaciones.delete')->only(['destroy']);
        $this->middleware('permission:ubicaciones.toggle-status')->only(['toggleStatus']);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function index(Request $request)
    {
        $search = $request->search;

        $ubicaciones = Ubicacion::query()
            ->when($search, function ($query) use ($search) {
                $query->where('nombre', 'like', "%{$search}%")
                    ->orWhere('descripcion', 'like', "%{$search}%");
            })
            ->orderByDesc('id')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Ubicaciones/Index', [
            'ubicaciones' => $ubicaciones,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function create()
    {
        return Inertia::render('Ubicaciones/Create');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function store(StoreUbicacionRequest $request)
    {
        Ubicacion::create(
            $request->validated()
        );

        return redirect()->route('ubicaciones.index');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function show(Ubicacion $ubicacion)
    {
        //
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function edit(Ubicacion $ubicacion)
    {
        return Inertia::render('Ubicaciones/Edit', [
            'ubicacion' => $ubicacion,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function update(UpdateUbicacionRequest $request, Ubicacion $ubicacion)
    {
        $ubicacion->update(
            $request->validated()
        );

        return redirect()->route('ubicaciones.index');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function destroy(Ubicacion $ubicacion)
    {
        $ubicacion->delete();

        return redirect()->route('ubicaciones.index');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function toggleStatus(Ubicacion $ubicacion)
    {
        $ubicacion->update([
            'estado' => !$ubicacion->estado,
        ]);

        return back();
    }
}
