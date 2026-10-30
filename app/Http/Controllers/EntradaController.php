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
use App\Models\Referencia;
use App\Http\Requests\StoreEntradaRequest;
use App\Http\Requests\UpdateEntradaRequest;

class EntradaController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:entradas.view')->only(['index', 'show',]);
        $this->middleware('permission:entradas.create')->only(['create', 'createFactura', 'store', 'storeFactura',]);
        $this->middleware('permission:entradas.edit')->only(['edit', 'update',]);
        $this->middleware('permission:entradas.edit-detalle')->only(['editDetalle', 'updateDetalle',]);
        $this->middleware('permission:entradas.delete')->only(['destroy',]);
    }
    
    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function index(Request $request)
    {
        $articulos = Articulo::with(['categoria', 'marca', 'referencia'])
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('nombre', 'like', "%{$search}%")
                        ->orWhere('modelo', 'like', "%{$search}%");
                });
            })
            ->orderByDesc('id')
            ->paginate(10)
            ->withQueryString();

        $facturas = Entrada::query()
            ->with(['proveedor:id,nombre', 'detalles.articulo:id,nombre',])
            ->withCount('detalles')
            ->orderByDesc('fecha')
            ->orderByDesc('id')
            ->get()
            ->map(function ($entrada) {
                return [
                    'id' => $entrada->id,
                    'numero_documento' => $entrada->numero_documento,
                    'fecha' => $entrada->fecha,
                    'proveedor' => $entrada->proveedor?->nombre ?? 'Sin proveedor',
                    'detalles_count' => $entrada->detalles_count,
                    'detalles' => $entrada->detalles->map(function ($detalle) {
                        return [
                            'id' => $detalle->id,
                            'cantidad' => $detalle->cantidad,
                            'articulo' => $detalle->articulo?->nombre ?? 'Artículo no disponible',
                        ];
                    })->values(),
                ];
            })
            ->values();

        return inertia('Entradas/Index', [
            'articulos' => $articulos,
            'facturas' => $facturas,
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
        $siguientesNumeros = ArticuloUnidad::query()
            ->selectRaw("SUBSTRING_INDEX(identificador, '-', 1) AS codigo")
            ->selectRaw("MAX(CAST(SUBSTRING_INDEX(identificador, '-', -1) AS UNSIGNED)) AS ultimo")
            ->groupByRaw("SUBSTRING_INDEX(identificador, '-', 1)")
            ->pluck('ultimo', 'codigo')
            ->map(fn ($ultimo) => (int) $ultimo + 1)
            ->all();

        return inertia('Entradas/CreateFactura', [
            'articulos' => $articulos,
            'proveedores' => $proveedores,
            'ubicaciones' => $ubicaciones,
            'estados' => $estados,
            'siguientesNumeros' => $siguientesNumeros,
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

            $detalleEntrada = EntradaDetalle::create([
                'entrada_id' => $entrada->id,
                'articulo_id' => $articulo->id,
                'cantidad' => $data['cantidad'],
            ]);

            $articulo->increment('stock', $data['cantidad']);

            if (!$articulo->control_individual) {
                return;
            }

            $cantidad = (int) $data['cantidad'];
            $unidades = $data['unidades'];

            DB::table('referencias')
                ->where('id', $articulo->referencia_id)
                ->lockForUpdate()
                ->first();

            $codigo = $articulo->referencia->codigo;
            $prefijo = $codigo . '-';

            $ultimoNumero = ArticuloUnidad::query()
                ->where('identificador', 'like', $prefijo . '%')
                ->lockForUpdate()
                ->get(['identificador'])
                ->map(fn ($unidad) => (int) str_replace($prefijo, '', $unidad->identificador))
                ->max() ?? 0;

            for ($i = 0; $i < $cantidad; $i++) {
                ArticuloUnidad::create([
                    'articulo_id' => $articulo->id,
                    'entrada_detalle_id' => $detalleEntrada->id,
                    'identificador' => $codigo . '-' . str_pad($ultimoNumero + $i + 1, 4, '0', STR_PAD_LEFT),
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

    public function storeFactura(Request $request)
    {
        $data = $request->validate([
            'proveedor_id' => ['required', 'integer', 'exists:proveedores,id'],
            'numero_documento' => ['required', 'string', 'max:255'],
            'fecha' => ['required', 'date'],
            'observaciones' => ['nullable', 'string'],
            'detalles' => ['required', 'array', 'min:1'],
            'detalles.*.articulo_id' => ['required', 'integer', 'distinct', 'exists:articulos,id'],
            'detalles.*.cantidad' => ['required', 'numeric', 'gt:0'],
            'detalles.*.unidades' => ['present', 'array'],
            'detalles.*.unidades.*.serial' => ['nullable', 'string', 'max:255', 'distinct', 'unique:articulo_unidades,serial'],
            'detalles.*.unidades.*.estado_id' => ['required', 'integer', 'exists:estados_articulo,id'],
            'detalles.*.unidades.*.ubicacion_id' => ['required', 'integer', 'exists:ubicaciones,id'],
        ]);

        DB::transaction(function () use ($data) {
            $entrada = Entrada::create([
                'proveedor_id' => $data['proveedor_id'],
                'usuario_id' => Auth::id(),
                'numero_documento' => $data['numero_documento'],
                'fecha' => $data['fecha'],
                'observaciones' => $data['observaciones'] ?? null,
            ]);

            foreach ($data['detalles'] as $detalle) {
                $articulo = Articulo::query()
                    ->with('referencia')
                    ->lockForUpdate()
                    ->findOrFail($detalle['articulo_id']);

                $cantidad = (float) $detalle['cantidad'];
                $unidades = $detalle['unidades'];

                if ($articulo->control_individual) {
                    if (!$articulo->referencia) {
                        throw \Illuminate\Validation\ValidationException::withMessages([
                            'detalles' => "El artículo {$articulo->nombre} necesita una referencia.",
                        ]);
                    }

                    if ($cantidad != (int) $cantidad || count($unidades) !== (int) $cantidad) {
                        throw \Illuminate\Validation\ValidationException::withMessages([
                            'detalles' => "La cantidad y las unidades del artículo {$articulo->nombre} no coinciden.",
                        ]);
                    }

                    DB::table('referencias')
                        ->where('id', $articulo->referencia_id)
                        ->lockForUpdate()
                        ->first();

                    $codigo = $articulo->referencia->codigo;
                    $prefijo = $codigo . '-';

                    $ultimoNumero = ArticuloUnidad::query()
                        ->where('identificador', 'like', $prefijo . '%')
                        ->lockForUpdate()
                        ->get(['identificador'])
                        ->map(fn ($unidad) => (int) str_replace($prefijo, '', $unidad->identificador))
                        ->max() ?? 0;
                }

                $detalleEntrada = EntradaDetalle::create([
                    'entrada_id' => $entrada->id,
                    'articulo_id' => $articulo->id,
                    'cantidad' => $cantidad,
                ]);

                $articulo->increment('stock', $cantidad);

                if (!$articulo->control_individual) {
                    continue;
                }

                foreach ($unidades as $index => $unidad) {
                    ArticuloUnidad::create([
                        'articulo_id' => $articulo->id,
                        'entrada_detalle_id' => $detalleEntrada->id,
                        'identificador' => $codigo . '-' . str_pad($ultimoNumero + $index + 1, 4, '0', STR_PAD_LEFT),
                        'serial' => $unidad['serial'] ?? null,
                        'ubicacion_id' => $unidad['ubicacion_id'],
                        'estado_id' => $unidad['estado_id'],
                        'fecha_adquisicion' => $data['fecha'],
                    ]);
                }
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
            'detalles.articulo.categoria',
            'detalles.articulo.marca',
            'detalles.articulo.referencia',
            'detalles.unidades.ubicacion',
            'detalles.unidades.estado',
        ]);

        $proveedores = Proveedor::where('estado', true)->orderBy('nombre')->get(['id', 'nombre']);
        $articulos = Articulo::with(['categoria', 'marca', 'referencia'])->orderBy('nombre')->get();
        $ubicaciones = Ubicacion::where('estado', true)->orderBy('nombre')->get(['id', 'nombre']);
        $estados = EstadoArticulo::orderBy('nombre')->get(['id', 'nombre']);
        $siguientesNumeros = [];

        foreach (Referencia::all(['codigo']) as $referencia) {
            $prefijo = $referencia->codigo . '-';
            $ultimoNumero = ArticuloUnidad::where('identificador', 'like', $prefijo . '%')
                ->get(['identificador'])
                ->map(fn ($unidad) => (int) str_replace($prefijo, '', $unidad->identificador))
                ->max() ?? 0;

            $siguientesNumeros[$referencia->codigo] = $ultimoNumero + 1;
        }

        return inertia('Entradas/Edit', [
            'entrada' => $entrada,
            'proveedores' => $proveedores,
            'articulos' => $articulos,
            'ubicaciones' => $ubicaciones,
            'estados' => $estados,
            'siguientesNumeros' => $siguientesNumeros,
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function editDetalle(Entrada $entrada, EntradaDetalle $detalle)
    {
        abort_unless($detalle->entrada_id === $entrada->id, 404);

        $detalle->load([
            'articulo.marca',
            'articulo.categoria',
            'articulo.referencia',
            'unidades.ubicacion',
            'unidades.estado',
        ]);

        $entrada->load(['proveedor', 'usuario']);

        return inertia('Entradas/EditDetalle', [
            'entrada' => $entrada,
            'detalle' => $detalle,
            'ubicaciones' => Ubicacion::orderBy('nombre')->get(['id', 'nombre']),
            'estados' => EstadoArticulo::orderBy('nombre')->get(['id', 'nombre']),
        ]);
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function update(UpdateEntradaRequest $request, Entrada $entrada)
    {
        $data = $request->validated();

        DB::transaction(function () use ($data, $entrada) {
            $entrada = Entrada::with('detalles.unidades')->lockForUpdate()->findOrFail($entrada->id);

            $entrada->update([
                'proveedor_id' => $data['proveedor_id'],
                'numero_documento' => $data['numero_documento'],
                'fecha' => $data['fecha'],
                'observaciones' => $data['observaciones'] ?? null,
            ]);

            if (empty($data['detalles'])) {
                throw \Illuminate\Validation\ValidationException::withMessages([
                    'detalles' => 'La factura debe contener al menos un artículo.',
                ]);
            }

            $detallesEnviados = collect($data['detalles']);
            $idsEnviados = $detallesEnviados->pluck('id')->filter()->map(fn ($id) => (int) $id);

            // Eliminar artículos que fueron quitados de la factura.
            foreach ($entrada->detalles as $detalleExistente) {
                if (!$idsEnviados->contains($detalleExistente->id)) {
                    $articulo = Articulo::lockForUpdate()->findOrFail($detalleExistente->articulo_id);
                    $articulo->decrement('stock', $detalleExistente->cantidad);
                    $detalleExistente->unidades()->delete();
                    $detalleExistente->delete();
                }
            }

            foreach ($detallesEnviados as $detalleData) {
                $articulo = Articulo::with('referencia')->lockForUpdate()->findOrFail($detalleData['articulo_id']);
                $detalle = !empty($detalleData['id']) ? $entrada->detalles()->findOrFail($detalleData['id']) : null;

                // No permitir cambiar el artículo de un detalle existente.
                if ($detalle && (int) $detalle->articulo_id !== (int) $articulo->id) {
                    throw \Illuminate\Validation\ValidationException::withMessages([
                        'detalles' => 'No puedes cambiar el artículo de un detalle existente.',
                    ]);
                }

                $cantidadAnterior = $detalle ? (float) $detalle->cantidad : 0;
                $cantidadNueva = (float) $detalleData['cantidad'];

                if ($articulo->control_individual) {
                    if (!$articulo->referencia) {
                        throw \Illuminate\Validation\ValidationException::withMessages([
                            'detalles' => "El artículo {$articulo->nombre} no tiene una referencia configurada.",
                        ]);
                    }

                    if ($cantidadNueva != (int) $cantidadNueva) {
                        throw \Illuminate\Validation\ValidationException::withMessages([
                            'detalles' => "La cantidad de {$articulo->nombre} debe ser un número entero.",
                        ]);
                    }

                    if (count($detalleData['unidades'] ?? []) !== (int) $cantidadNueva) {
                        throw \Illuminate\Validation\ValidationException::withMessages([
                            'detalles' => "Debes registrar una unidad por cada cantidad de {$articulo->nombre}.",
                        ]);
                    }
                }

                if (!$detalle) {
                    $detalle = EntradaDetalle::create([
                        'entrada_id' => $entrada->id,
                        'articulo_id' => $articulo->id,
                        'cantidad' => $cantidadNueva,
                    ]);
                } else {
                    $detalle->update(['cantidad' => $cantidadNueva]);
                }

                // Ajustar existencias según la diferencia.
                $diferencia = $cantidadNueva - $cantidadAnterior;

                if ($diferencia > 0) {
                    $articulo->increment('stock', $diferencia);
                } elseif ($diferencia < 0) {
                    $articulo->decrement('stock', abs($diferencia));
                }

                if (!$articulo->control_individual) {
                    // Los artículos por cantidad no tienen unidades individuales.
                    $detalle->unidades()->delete();
                    continue;
                }

                $unidadesEnviadas = collect($detalleData['unidades'] ?? []);
                $idsUnidadesEnviadas = $unidadesEnviadas->pluck('id')->filter()->map(fn ($id) => (int) $id);

                // Eliminar unidades que fueron quitadas del formulario.
                $detalle->unidades()
                    ->when(
                        $idsUnidadesEnviadas->isNotEmpty(),
                        fn ($query) => $query->whereNotIn('id', $idsUnidadesEnviadas),
                        fn ($query) => $query
                    )
                    ->get()
                    ->each
                    ->delete();

                foreach ($unidadesEnviadas as $unidadData) {
                    $unidad = !empty($unidadData['id']) ? $detalle->unidades()->findOrFail($unidadData['id']) : null;

                    if ($unidad) {
                        $unidad->update([
                            'serial' => $articulo->maneja_serial ? ($unidadData['serial'] ?? null) : null,
                            'ubicacion_id' => $unidadData['ubicacion_id'],
                            'estado_id' => $unidadData['estado_id'],
                            'fecha_adquisicion' => $data['fecha'],
                        ]);

                        continue;
                    }

                    $codigo = $articulo->referencia->codigo;
                    $prefijo = $codigo . '-';

                    // Bloquear la referencia para evitar identificadores repetidos.
                    DB::table('referencias')->where('id', $articulo->referencia_id)->lockForUpdate()->first();

                    $ultimoNumero = ArticuloUnidad::where('identificador', 'like', $prefijo . '%')
                        ->lockForUpdate()
                        ->get(['identificador'])
                        ->map(fn ($item) => (int) str_replace($prefijo, '', $item->identificador))
                        ->max() ?? 0;

                    $unidad = ArticuloUnidad::create([
                        'articulo_id' => $articulo->id,
                        'entrada_detalle_id' => $detalle->id,
                        'identificador' => $codigo . '-' . str_pad( $ultimoNumero + 1, 4, '0', STR_PAD_LEFT ),
                        'serial' => $articulo->maneja_serial ? ($unidadData['serial'] ?? null) : null,
                        'ubicacion_id' => $unidadData['ubicacion_id'],
                        'estado_id' => $unidadData['estado_id'],
                        'fecha_adquisicion' => $data['fecha'],
                    ]);
                }
            }
        });

        return redirect()->route('entradas.index')->with('success', "La factura {$entrada->numero_documento} fue actualizada correctamente.");
    }

    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function updateDetalle(Request $request, Entrada $entrada, EntradaDetalle $detalle)
    {
        abort_unless($detalle->entrada_id === $entrada->id, 404);

        $articulo = $detalle->articulo;

        if ($articulo->control_individual) {
            $data = $request->validate([
                'observaciones' => ['nullable', 'string', 'max:2000'],
                'unidades' => ['required', 'array', 'min:1'],
                'unidades.*.id' => ['required', 'integer', 'distinct'],
                'unidades.*.serial' => ['nullable', 'string', 'max:255'],
                'unidades.*.ubicacion_id' => ['required', 'integer', 'exists:ubicaciones,id'],
                'unidades.*.estado_id' => ['required', 'integer', 'exists:estados_articulo,id'],
                'unidades.*.fecha_adquisicion' => ['required', 'date'],
            ]);

            DB::transaction(function () use ($entrada, $detalle, $data, $articulo) {
                $entradaBloqueada = Entrada::query()->lockForUpdate()->findOrFail($entrada->id);
                $entradaBloqueada->update(['observaciones' => $data['observaciones'] ?? null,]);

                $detalleBloqueado = EntradaDetalle::query()
                    ->where('entrada_id', $entrada->id)
                    ->lockForUpdate()
                    ->findOrFail($detalle->id);

                $unidadesActuales = ArticuloUnidad::query()
                    ->where('entrada_detalle_id', $detalleBloqueado->id)
                    ->where('articulo_id', $articulo->id)
                    ->lockForUpdate()
                    ->get()
                    ->keyBy('id');

                if (count($data['unidades']) !== $unidadesActuales->count()) {
                    throw \Illuminate\Validation\ValidationException::withMessages([
                        'unidades' => 'La lista de unidades no coincide con las unidades registradas en esta entrada.',
                    ]);
                }

                foreach ($data['unidades'] as $indice => $datosUnidad) {
                    $unidad = $unidadesActuales->get($datosUnidad['id']);

                    if (!$unidad) {
                        throw \Illuminate\Validation\ValidationException::withMessages([
                            'unidades' => 'Una de las unidades no pertenece a esta entrada.',
                        ]);
                    }

                    $serial = trim($datosUnidad['serial'] ?? '');

                    if ($articulo->maneja_serial && $serial === '') {
                        throw \Illuminate\Validation\ValidationException::withMessages([
                            "unidades.{$indice}.serial" => 'El serial es obligatorio para este artículo.',
                        ]);
                    }

                    if ($serial !== '') {
                        $duplicado = ArticuloUnidad::query()->where('serial', $serial)->where('id', '!=', $unidad->id)->exists();

                        if ($duplicado) {
                            throw \Illuminate\Validation\ValidationException::withMessages([
                                "unidades.{$indice}.serial" => "El serial {$serial} ya está registrado en otra unidad.",
                            ]);
                        }
                    }

                    $unidad->update([
                        'serial' => $serial !== '' ? $serial : null,
                        'ubicacion_id' => $datosUnidad['ubicacion_id'],
                        'estado_id' => $datosUnidad['estado_id'],
                        'fecha_adquisicion' => $datosUnidad['fecha_adquisicion'],
                    ]);
                }
            });

            return redirect()->route('entradas.show', $articulo->id)->with('success', 'Unidades y observaciones actualizadas correctamente.');
        }

        $data = $request->validate([
            'cantidad' => ['required', 'numeric', 'gt:0', 'max:9999999999.99'],
            'observaciones' => ['nullable', 'string', 'max:2000'],
        ]);

        DB::transaction(function () use ($entrada, $detalle, $data) {
            $entradaBloqueada = Entrada::query()->lockForUpdate()->findOrFail($entrada->id);
            $detalle = EntradaDetalle::query()->where('entrada_id', $entradaBloqueada->id)->lockForUpdate()->findOrFail($detalle->id);

            $articulo = Articulo::query()
                ->lockForUpdate()
                ->findOrFail($detalle->articulo_id);

            if ($articulo->control_individual) {
                throw \Illuminate\Validation\ValidationException::withMessages([
                    'cantidad' => 'La cantidad de este artículo debe ajustarse mediante sus unidades físicas.',
                ]);
            }

            $cantidadAnterior = (float) $detalle->cantidad;
            $cantidadNueva = (float) $data['cantidad'];
            $diferencia = $cantidadNueva - $cantidadAnterior;

            if ((float) $articulo->stock + $diferencia < 0) {
                throw \Illuminate\Validation\ValidationException::withMessages([
                    'cantidad' => 'No se puede reducir la cantidad porque el stock resultante sería negativo.',
                ]);
            }

            $detalle->update(['cantidad' => $cantidadNueva,]);
            $entradaBloqueada->update(['observaciones' => $data['observaciones'] ?? null,]);

            if (abs($diferencia) > 0.00001) {
                $articulo->increment('stock', $diferencia);
            }
        });

        return redirect()->route('entradas.show', $detalle->articulo_id)->with('success', 'Detalle de entrada actualizado correctamente.');
    }
    
    /*------------------------------------------------------------------------------------------------------------------------------------------*/

    public function destroy(Entrada $entrada)
    {
        //
    }
}