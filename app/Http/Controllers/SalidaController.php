<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreSalidaRequest;
use App\Http\Requests\UpdateSalidaRequest;
use App\Models\Articulo;
use Illuminate\Support\Facades\DB;
use App\Models\Salida;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SalidaController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:salidas.view')->only(['index', 'show']);
        $this->middleware('permission:salidas.create')->only(['create', 'store']);
        $this->middleware('permission:salidas.edit')->only(['edit', 'update']);
        $this->middleware('permission:salidas.delete')->only(['destroy']);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function index(Request $request)
    {
        $search = $request->search;

        $salidas = Salida::with('usuario')
            ->when($search, function ($query, $search) {
                $query->where('motivo', 'like', "%{$search}%")
                    ->orWhere('observaciones', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Salidas/Index', [
            'salidas' => $salidas,
            'filters' => $request->only('search'),
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function create()
    {
        return Inertia::render('Salidas/Create', [
            'articulos' => Articulo::where('cantidad', '>', 0)
                ->orderByRaw('id')
                ->get(['id','codigo','nombre','cantidad',]),
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function store(StoreSalidaRequest $request)
    {
        DB::transaction(function () use ($request) {
            $data = $request->validated();

            /* Creamos la cabecera de la salida. */
            $salida = Salida::create([
                'usuario_id' => Auth::id(),
                'fecha' => $data['fecha'],
                'motivo' => $data['motivo'],
                'observaciones' => $data['observaciones'] ?? null,
            ]);

            /* Procesamos cada artículo. */
            foreach ($data['detalles'] as $detalle) {

                $articulo = Articulo::lockForUpdate()
                    ->findOrFail($detalle['articulo_id']);

                $cantidad = (float) $detalle['cantidad'];

                /* No permitimos sacar más de lo disponible. */
                if ((float) $articulo->cantidad < $cantidad) {
                    throw \Illuminate\Validation\ValidationException::withMessages([
                        'detalles' => "No hay suficiente stock para el artículo {$articulo->nombre}. Stock disponible: {$articulo->cantidad}.",
                    ]);
                }

                /* Descontamos el stock. */
                $articulo->decrement('cantidad', $cantidad);

                /* Guardamos el detalle de la salida. */
                $salida->detalles()->create([
                    'articulo_id' => $articulo->id,
                    'cantidad' => $cantidad,
                ]);
            }
        });

        return redirect()->route('salidas.index');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function show(Salida $salida)
    {
        $salida->load([
            'usuario',
            'detalles.articulo',
        ]);

        return Inertia::render('Salidas/Show', [
            'salida' => $salida,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function edit(Salida $salida)
    {
        $salida->load([
            'detalles.articulo',
        ]);

        return Inertia::render('Salidas/Edit', [
            'salida' => $salida,
            'articulos' => Articulo::orderBy('nombre')
                ->get([
                    'id',
                    'codigo',
                    'nombre',
                    'cantidad',
                ]),
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function update(UpdateSalidaRequest $request, Salida $salida)
    {
        DB::transaction(function () use ($request, $salida) {

            $data = $request->validated();

            /* Primero devolvemos al inventario las cantidades de los detalles anteriores. */
            foreach ($salida->detalles as $detalle) {

                $articulo = Articulo::lockForUpdate()
                    ->find($detalle->articulo_id);

                if ($articulo) {
                    $articulo->increment(
                        'cantidad',
                        $detalle->cantidad
                    );
                }
            }

            /* Actualizamos la información de la salida. */
            $salida->update([
                'fecha' => $data['fecha'],
                'motivo' => $data['motivo'],
                'observaciones' => $data['observaciones'] ?? null,
            ]);

            /* Eliminamos los detalles anteriores. */
            $salida->detalles()->delete();

            /* Registramos los nuevos detalles y descontamos nuevamente el stock. */
            foreach ($data['detalles'] as $detalle) {

                $articulo = Articulo::lockForUpdate()
                    ->findOrFail($detalle['articulo_id']);

                $cantidad = (float) $detalle['cantidad'];

                if ((float) $articulo->cantidad < $cantidad) {
                    throw \Illuminate\Validation\ValidationException::withMessages([
                        'detalles' => "No hay suficiente stock para el artículo {$articulo->nombre}. Stock disponible: {$articulo->cantidad}.",
                    ]);
                }

                $articulo->decrement('cantidad', $cantidad);

                $salida->detalles()->create([
                    'articulo_id' => $articulo->id,
                    'cantidad' => $cantidad,
                ]);
            }
        });

        return redirect()->route('salidas.index');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function destroy(Salida $salida)
    {
        DB::transaction(function () use ($salida) {

            /* Antes de eliminar la salida, devolvemos las cantidades al inventario. */
            foreach ($salida->detalles as $detalle) {

                $articulo = Articulo::lockForUpdate()
                    ->find($detalle->articulo_id);

                if ($articulo) {
                    $articulo->increment(
                        'cantidad',
                        $detalle->cantidad
                    );
                }
            }

            /* Eliminamos los detalles y la salida. */
            $salida->detalles()->delete();
            $salida->delete();
        });

        return redirect()->route('salidas.index');
    }
}
