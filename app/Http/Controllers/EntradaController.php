<?php

namespace App\Http\Controllers;

use App\Models\Articulo;
use App\Models\Entrada;
use Illuminate\Http\Request;
use App\Models\Proveedor;
use App\Models\EntradaDetalle;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Ubicacion;
use App\Models\EstadoArticulo;
use App\Models\ArticuloUnidad;
use App\Http\Requests\StoreEntradaRequest;
use App\Http\Requests\UpdateEntradaRequest;

class EntradaController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:entradas.view')->only(['index', 'show',]);
        $this->middleware('permission:entradas.create')->only(['create', 'createFactura', 'store',]);
        $this->middleware('permission:entradas.edit')->only(['edit', 'update',]);
        $this->middleware('permission:entradas.delete')->only(['destroy',]);
    }
    
    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function index(Request $request)
    {
        $articulos = Articulo::with(['categoria', 'marca', 'referencia',])
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('nombre', 'like', "%{$search}%")
                        ->orWhere('modelo', 'like', "%{$search}%");
                });
            })
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString();

        return inertia('Entradas/Index', [
            'articulos' => $articulos,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function create(Request $request)
    {
        $request->validate([ 'articulo_id' => ['required', 'integer', 'exists:articulos,id'] ]);

        $articulo = Articulo::with([ 'categoria', 'marca', 'referencia', ])->findOrFail($request->integer('articulo_id'));

        $siguienteNumero = 1;
        if ($articulo->control_individual && $articulo->referencia) {
            $prefijo = $articulo->referencia->codigo . '-';
            $ultimoNumero = ArticuloUnidad::query()
                ->where('identificador', 'like', $prefijo . '%')
                ->get()
                ->map(fn ($unidad) => (int) str_replace($prefijo, '', $unidad->identificador))
                ->max() ?? 0;
            $siguienteNumero = $ultimoNumero + 1;
        }

        $proveedores = Proveedor::query()->where('estado', true)->orderBy('nombre')->get(['id', 'nombre']);
        $ubicaciones = Ubicacion::query()->where('estado', true)->orderBy('nombre')->get(['id', 'nombre']);
        $estados = EstadoArticulo::query()->orderBy('nombre')->get(['id', 'nombre']);
        $ubicacionDefault = $ubicaciones->firstWhere('nombre', 'Almacén');
        $estadoDefault = $estados->firstWhere('nombre', 'Disponible');

        return inertia('Entradas/Create', [
            'articulo' => $articulo,
            'proveedores' => $proveedores,
            'ubicaciones' => $ubicaciones,
            'estados' => $estados,
            'defaults' => [
                'ubicacion_id' => $ubicacionDefault?->id,
                'estado_id' => $estadoDefault?->id,
            ],
            'siguienteNumero' => $siguienteNumero,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function createFactura()
    {
        $proveedores = Proveedor::query()->where('estado', true)->orderBy('nombre')->get(['id', 'nombre']);
        $articulos = Articulo::query()->with(['marca', 'categoria', 'referencia'])->orderBy('nombre')->get();
        $ubicaciones = Ubicacion::query()->where('estado', true)->orderBy('nombre')->get(['id', 'nombre']);
        $estados = EstadoArticulo::query()->orderBy('nombre')->get(['id', 'nombre']);

        return inertia('Entradas/CreateFactura', [
            'articulos' => $articulos,
            'proveedores' => $proveedores,
            'ubicaciones' => $ubicaciones,
            'estados' => $estados,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function store(StoreEntradaRequest $request)
    {
        $data = $request->validated();

        DB::transaction(function () use ($data) {
            $articulo = Articulo::with('referencia')->lockForUpdate()->findOrFail($data['articulo_id']);

            $entrada = Entrada::create([
                'proveedor_id' => $data['proveedor_id'],
                'usuario_id' => Auth::id(),
                'numero_documento' => $data['numero_documento'] ?? null,
                'fecha' => $data['fecha'],
                'observaciones' => $data['observaciones'] ?? null,
            ]);

            EntradaDetalle::create([
                'entrada_id' => $entrada->id,
                'articulo_id' => $articulo->id,
                'cantidad' => $data['cantidad'],
            ]);

            $articulo->increment('stock', $data['cantidad']);

            if (!$articulo->control_individual) { return; }

            $cantidad = (int) $data['cantidad'];
            $unidades = $data['unidades'];

            $ultimoNumero = ArticuloUnidad::query()
                ->where('identificador', 'like', $articulo->referencia->codigo . '-%')
                ->lockForUpdate()
                ->get()
                ->map(function ($unidad) use ($articulo) {
                    $prefijo = $articulo->referencia->codigo . '-';
                    return (int) str_replace($prefijo, '', $unidad->identificador);
                })
                ->max() ?? 0;

            for ($i = 0; $i < $cantidad; $i++) {
                $numero = $ultimoNumero + $i + 1;

                ArticuloUnidad::create([
                    'articulo_id' => $articulo->id,
                    'identificador' => $articulo->referencia->codigo . '-' . str_pad( $numero, 4, '0', STR_PAD_LEFT ),
                    'serial' => $unidades[$i]['serial'] ?? null,
                    'ubicacion_id' => $unidades[$i]['ubicacion_id'],
                    'estado_id' => $unidades[$i]['estado_id'],
                    'fecha_adquisicion' => $data['fecha'],
                ]);
            }
        });

        return redirect()->route('entradas.index')->with('success', 'Entrada registrada correctamente.');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function show(Articulo $articulo)
    {
        $articulo->load(['categoria', 'marca', 'referencia',]);

        $entradas = Entrada::query()
            ->with([
                'usuario',
                'proveedor',
                'detalles' => function ($query) use ($articulo) {
                    $query->where('articulo_id', $articulo->id);
                },
            ])
            ->whereHas('detalles', function ($query) use ($articulo) { $query->where('articulo_id', $articulo->id); })
            ->orderByDesc('fecha')
            ->orderByDesc('id')
            ->get();

        $ultimaFecha = $entradas->first()?->fecha;

        return inertia('Entradas/Show', [
            'articulo' => $articulo,
            'entradas' => $entradas,
            'ultimaFecha' => $ultimaFecha,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function edit(Entrada $entrada)
    {
        $entrada->load([
            'proveedor',
            'usuario',
            'detalles.articulo.referencia',
            'detalles.articulo.marca',
            'detalles.articulo.categoria',
            'detalles.articulo',
        ]);

        $proveedores = Proveedor::query()->where('estado', true)->orderBy('nombre')->get(['id', 'nombre']);

        return inertia('Entradas/Edit', [
            'entrada' => $entrada,
            'proveedores' => $proveedores,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function update(UpdateEntradaRequest $request, Entrada $entrada)
    {
        $data = $request->validated();

        $entrada->update([
            'proveedor_id' => $data['proveedor_id'],
            'numero_documento' => $data['numero_documento'] ?? null,
            'fecha' => $data['fecha'],
            'observaciones' => $data['observaciones'] ?? null,
        ]);

        return redirect()->route('entradas.show', $entrada)->with('success', 'Entrada actualizada correctamente.');
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function destroy(Entrada $entrada)
    {
        //
    }
}