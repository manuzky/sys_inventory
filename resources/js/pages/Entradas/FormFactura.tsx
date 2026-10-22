
import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Plus, X, Package, Check, Boxes } from 'lucide-react';
import { router } from '@inertiajs/react';
import { notify } from '@/lib/notify';

interface Articulo {
    id: number;
    nombre: string;
    modelo: string | null;
    control_individual: boolean;
    maneja_serial: boolean;
    stock: string | number;
    referencia: { id: number; codigo: string } | null;
    marca: { id: number; nombre: string };
    categoria: { id: number; nombre: string };
}

interface Proveedor { id: number; nombre: string }
interface Ubicacion { id: number; nombre: string }
interface EstadoArticulo { id: number; nombre: string }

interface UnidadForm {
    identificador: string;
    serial: string;
    ubicacion_id: string;
    estado_id: string;
}

interface Props {
    articulos: Articulo[];
    proveedores: Proveedor[];
    ubicaciones: Ubicacion[];
    estados: EstadoArticulo[];
    siguientesNumeros?: Record<string, number>;
}

export default function FormFactura({ articulos, proveedores, ubicaciones, estados, siguientesNumeros = {}, }: Props) {
    const [busqueda, setBusqueda] = useState('');
    const [ventanaAbierta, setVentanaAbierta] = useState(false);
    const [seleccionados, setSeleccionados] = useState<Articulo[]>([]);
    const [cantidades, setCantidades] = useState<Record<number, string>>({});
    const [unidades, setUnidades] = useState<Record<number, UnidadForm[]>>({});
    const [guardando, setGuardando] = useState(false);

    const { data, setData } = useForm({
        proveedor_id: '',
        numero_documento: '',
        fecha: new Date().toISOString().split('T')[0],
        observaciones: '',
    });

    const ubicacionDefault = ubicaciones.find(
        (item) => item.nombre.toLowerCase() === 'almacén',
    )?.id.toString() ?? '';

    const estadoDefault = estados.find(
        (item) => item.nombre.toLowerCase() === 'disponible',
    )?.id.toString() ?? '';

    const disponibles = articulos.filter((articulo) => {
        const texto = `${articulo.nombre} ${articulo.marca?.nombre ?? ''} ${articulo.modelo ?? ''} ${articulo.referencia?.codigo ?? ''}`;
        return texto.toLowerCase().includes(busqueda.toLowerCase());
    });

    const agregarArticulo = (articulo: Articulo) => {
        if (seleccionados.some((item) => item.id === articulo.id)) return;

        setSeleccionados((actuales) => [...actuales, articulo]);

        setCantidades((actuales) => ({
            ...actuales,
            [articulo.id]: actuales[articulo.id] ?? '1',
        }));

        if (articulo.control_individual) {
            setUnidades((actuales) => ({
                ...actuales,
                [articulo.id]: [{
                    identificador: '',
                    serial: '',
                    ubicacion_id: ubicacionDefault,
                    estado_id: estadoDefault,
                }],
            }));
        }
    };

    const quitarArticulo = (id: number) => {
        setSeleccionados((actuales) =>
            actuales.filter((item) => item.id !== id),
        );

        setCantidades((actuales) => {
            const siguiente = { ...actuales };
            delete siguiente[id];
            return siguiente;
        });

        setUnidades((actuales) => {
            const siguiente = { ...actuales };
            delete siguiente[id];
            return siguiente;
        });
    };

    const cambiarCantidad = (articulo: Articulo, valor: string) => {
        setCantidades((actuales) => ({
            ...actuales,
            [articulo.id]: valor,
        }));

        if (!articulo.control_individual) return;

        const cantidad = Math.min(500, Math.floor(Number(valor)));
        const anteriores = unidades[articulo.id] ?? [];

        if (!valor || !Number.isFinite(cantidad) || cantidad < 1) {
            setUnidades((actuales) => ({
                ...actuales,
                [articulo.id]: [],
            }));
            return;
        }

        const nuevas = Array.from(
            { length: cantidad },
            (_, index) => anteriores[index] ?? ({
                identificador: '',
                serial: '',
                ubicacion_id: ubicacionDefault,
                estado_id: estadoDefault,
            }),
        );

        setUnidades((actuales) => ({
            ...actuales,
            [articulo.id]: nuevas,
        }));
    };

    const actualizarUnidad = (
        articuloId: number,
        index: number,
        campo: keyof UnidadForm,
        valor: string,
    ) => {
        setUnidades((actuales) => ({
            ...actuales,
            [articuloId]: (actuales[articuloId] ?? []).map(
                (unidad, i) => i === index
                    ? { ...unidad, [campo]: valor }
                    : unidad,
            ),
        }));
    };

    // Vista previa global: comparte la numeración entre artículos con la misma referencia.
    const contadores: Record<string, number> = { ...siguientesNumeros };
    const identificadores: Record<number, string[]> = {};

    seleccionados.forEach((articulo) => {
        if (!articulo.control_individual || !articulo.referencia) return;

        const codigo = articulo.referencia.codigo;
        const cantidad = unidades[articulo.id]?.length ?? 0;
        const inicio = contadores[codigo] ?? 1;

        identificadores[articulo.id] = Array.from(
            { length: cantidad },
            (_, index) => `${codigo}-${String(inicio + index).padStart(4, '0')}`,
        );

        contadores[codigo] = inicio + cantidad;
    });

    const totalUnidades = seleccionados.reduce((total, articulo) => {
        const cantidad = Number(cantidades[articulo.id] ?? 0);

        return total + (
            Number.isFinite(cantidad) && cantidad > 0 ? cantidad : 0
        );
    }, 0);

    const guardarEntrada = () => {
        if (!data.proveedor_id || !data.numero_documento || !data.fecha) { notify.error('Completa los datos de la entrada.'); return; }
        if (seleccionados.length === 0) { notify.error('Agrega al menos un artículo.'); return; }

        for (const articulo of seleccionados) {
            const cantidad = Number(cantidades[articulo.id] ?? 0);
            if (!Number.isFinite(cantidad) || cantidad <= 0) { notify.error(`Introduce una cantidad válida para ${articulo.nombre}.`); return; }
            if (articulo.control_individual) {
                const filas = unidades[articulo.id] ?? [];
                if ( !articulo.referencia || !Number.isInteger(cantidad) || filas.length !== cantidad ) { notify.error(`Revisa la cantidad y referencia de ${articulo.nombre}.`); return; }
                if (filas.some((unidad) => !unidad.estado_id || !unidad.ubicacion_id)) { notify.error(`Completa el estado y la ubicación de ${articulo.nombre}.`); return; }
                if ( articulo.maneja_serial && filas.some((unidad) => !unidad.serial.trim())) { notify.error(`Introduce el serial de cada unidad de ${articulo.nombre}.`); return; }
            }
        }

        setGuardando(true);

        router.post(route('entradas.factura.store'), {
            ...data,
            detalles: seleccionados.map((articulo) => ({
                articulo_id: articulo.id,
                cantidad: cantidades[articulo.id],
                unidades: articulo.control_individual
                    ? (unidades[articulo.id] ?? []).map((unidad, index) => ({
                        identificador: identificadores[articulo.id]?.[index] ?? '',
                        serial: unidad.serial || null,
                        estado_id: unidad.estado_id,
                        ubicacion_id: unidad.ubicacion_id,
                    }))
                    : [],
            })),
        }, {
            onSuccess: () => { notify.success('Entrada registrada correctamente.'); },
            onError: () => { notify.error('No se pudo registrar la entrada. Revisa los campos.'); },
            onFinish: () => setGuardando(false),
        });
    };

    return (
        <div className="space-y-6">
            {/* CUADRO 1: DATOS GENERALES */}
            <div className="space-y-6 rounded-xl border bg-background p-6 shadow-sm">
                <div>
                    <h2 className="text-lg font-semibold">Datos de la entrada</h2>
                    <p className="text-sm text-muted-foreground">
                        Información general de la factura que respalda esta entrada.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                        <Label htmlFor="proveedor_id">Proveedor</Label>
                        <select
                            id="proveedor_id"
                            value={data.proveedor_id}
                            onChange={(e) => setData('proveedor_id', e.target.value)}
                            className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                        >
                            <option value="">Seleccione un proveedor</option>
                            {proveedores.map((proveedor) => (
                                <option key={proveedor.id} value={proveedor.id}>
                                    {proveedor.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="numero_documento">Número de factura</Label>
                        <Input id="numero_documento" value={data.numero_documento} onChange={(e) => setData('numero_documento', e.target.value)} placeholder="Ej. FAC-12345" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="fecha">Fecha de factura</Label>
                        <Input id="fecha" type="date" value={data.fecha} onChange={(e) => setData('fecha', e.target.value)} />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="observaciones">Observaciones</Label>
                    <Textarea id="observaciones" value={data.observaciones} onChange={(e) => setData('observaciones', e.target.value)} placeholder="Información adicional sobre la entrada..." rows={3} />
                </div>

                <div className="border-t pt-5">
                    <Dialog open={ventanaAbierta} onOpenChange={setVentanaAbierta}>
                        <DialogTrigger asChild>
                            <Button type="button" variant="outline">
                                <Plus className="mr-2 h-4 w-4" />
                                Agregar artículos
                                {seleccionados.length > 0 && (
                                    <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                                        {seleccionados.length}
                                    </span>
                                )}
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="flex max-h-[85vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl">
                            <DialogHeader className="border-b p-6 pb-4">
                                <DialogTitle>Seleccionar artículos</DialogTitle>
                                <DialogDescription>
                                    Selecciona los artículos incluidos en esta factura.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="p-4 pb-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input autoFocus value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar por nombre, marca, modelo o referencia..." className="pl-9" />
                                </div>
                                <p className="mt-2 text-xs text-muted-foreground">
                                    {disponibles.length} artículos · {seleccionados.length} seleccionados
                                </p>
                            </div>

                            <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-4 pb-4">
                                {disponibles.length ? disponibles.map((articulo) => {
                                    const seleccionado = seleccionados.some( (item) => item.id === articulo.id, );

                                    return (
                                        <button
                                            key={articulo.id}
                                            type="button"
                                            onClick={() => seleccionado ? quitarArticulo(articulo.id) : agregarArticulo(articulo)}
                                            className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-muted/50 ${
                                                seleccionado ? 'border-primary bg-primary/5' : ''
                                            }`}
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                                                <Package className="h-5 w-5 text-muted-foreground" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium">{articulo.nombre}</p>
                                                <p className="truncate text-xs text-muted-foreground">
                                                    {articulo.marca?.nombre ?? 'Sin marca'} · {articulo.modelo ?? 'Sin modelo'} · {articulo.referencia?.codigo ?? 'Sin referencia'}
                                                </p>
                                            </div>
                                            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                                                seleccionado ? 'border-primary bg-primary text-primary-foreground' : ''
                                            }`}>
                                                {seleccionado ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                                            </span>
                                        </button>
                                    );
                                }) : (
                                    <p className="py-12 text-center text-sm text-muted-foreground">
                                        No se encontraron artículos.
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-between border-t p-4">
                                <span className="text-sm text-muted-foreground">
                                    {seleccionados.length} seleccionados
                                </span>
                                <Button type="button" onClick={() => { setVentanaAbierta(false); setBusqueda(''); }}>
                                    Listo
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* CUADRO 2: ARTÍCULOS Y CANTIDADES */}
            {seleccionados.length > 0 && (
                <div className="space-y-4 rounded-xl border bg-background p-6 shadow-sm">
                    <div>
                        <h2 className="text-lg font-semibold">Artículos de la entrada</h2>
                        <p className="text-sm text-muted-foreground">
                            Indica cuántas unidades de cada artículo ingresarán al inventario.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {seleccionados.map((articulo) => (
                            <div key={articulo.id} className="flex flex-wrap items-center gap-4 rounded-lg border p-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted">
                                    <Package className="h-5 w-5 text-muted-foreground" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="font-medium">{articulo.nombre}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {articulo.marca?.nombre ?? 'Sin marca'} · {articulo.modelo ?? 'Sin modelo'}
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {articulo.referencia?.codigo ?? 'Sin referencia'}
                                        {' · Stock actual: '}
                                        {Number(articulo.stock)}
                                        {articulo.control_individual ? ' · Control individual' : ' · Control por cantidad'}
                                    </p>
                                </div>

                                <div className="w-28 space-y-1">
                                    <Label htmlFor={`cantidad-${articulo.id}`}>Cantidad</Label>
                                    <Input
                                        id={`cantidad-${articulo.id}`}
                                        type="number"
                                        min="1"
                                        max="500"
                                        step={articulo.control_individual ? '1' : '0.01'}
                                        value={cantidades[articulo.id] ?? '1'}
                                        onChange={(e) => cambiarCantidad(articulo, e.target.value)}
                                    />
                                </div>

                                <Button type="button" variant="ghost" size="icon" onClick={() => quitarArticulo(articulo.id)} title="Quitar artículo" >
                                    <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between border-t pt-4 text-sm">
                        <span className="text-muted-foreground">Tipos de artículos: {seleccionados.length}</span>
                        <span className="font-medium">Cantidad total: {totalUnidades}</span>
                    </div>
                </div>
            )}

            {/* CUADRO 3: DETALLE DE UNIDADES */}
            {seleccionados.some((articulo) => articulo.control_individual) && (
                <div className="space-y-5 rounded-xl border bg-background p-6 shadow-sm">
                    <div>
                        <h2 className="text-lg font-semibold">Detalle de unidades</h2>
                        <p className="text-sm text-muted-foreground">
                            Completa los datos de cada unidad que requiere control individual.
                        </p>
                    </div>

                    {seleccionados.filter((articulo) => articulo.control_individual).map((articulo) => {
                        const filas = unidades[articulo.id] ?? [];
                        const ids = identificadores[articulo.id] ?? [];

                        return (
                            <div key={articulo.id} className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                                        <Boxes className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">{articulo.nombre}</h3>
                                        <p className="text-xs text-muted-foreground">
                                            {articulo.referencia?.codigo ?? 'Sin referencia'} · {filas.length} unidades
                                        </p>
                                    </div>
                                </div>

                                {!articulo.referencia ? (
                                    <p className="rounded-md border border-destructive/30 p-3 text-sm text-destructive">
                                        Este artículo requiere una referencia para generar sus identificadores.
                                    </p>
                                ) : filas.length > 0 ? (
                                    <div className="overflow-x-auto rounded-lg border">
                                        <table className="w-full text-sm">
                                            <thead className="bg-muted/50">
                                                <tr className="text-left">
                                                    <th className="px-4 py-3 font-medium">N.º</th>
                                                    <th className="px-4 py-3 font-medium">Identificador</th>
                                                    {articulo.maneja_serial && (
                                                        <th className="px-4 py-3 font-medium">Serial</th>
                                                    )}
                                                    <th className="px-4 py-3 font-medium">Estado</th>
                                                    <th className="px-4 py-3 font-medium">Ubicación</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filas.map((unidad, index) => (
                                                    <tr key={index} className="border-t hover:bg-muted/30">
                                                        <td className="px-4 py-3 font-medium">{index + 1}</td>
                                                        <td className="min-w-36 px-4 py-3">
                                                            <Input value={ids[index] ?? 'Pendiente'} disabled className="min-w-32 bg-muted" />
                                                        </td>
                                                        {articulo.maneja_serial && (
                                                            <td className="min-w-40 px-4 py-3">
                                                                <Input value={unidad.serial} onChange={(e) => actualizarUnidad(articulo.id, index, 'serial', e.target.value)} placeholder="Introducir serial" />
                                                            </td>
                                                        )}
                                                        <td className="min-w-36 px-4 py-3">
                                                            <select value={unidad.estado_id} onChange={(e) => actualizarUnidad(articulo.id, index, 'estado_id', e.target.value)} className="w-full rounded-md border bg-background px-3 py-2" >
                                                                <option value="">Seleccione estado</option>
                                                                {estados.map((estado) => (
                                                                    <option key={estado.id} value={estado.id}>{estado.nombre}</option>
                                                                ))}
                                                            </select>
                                                        </td>
                                                        <td className="min-w-36 px-4 py-3">
                                                            <select value={unidad.ubicacion_id} onChange={(e) => actualizarUnidad(articulo.id, index, 'ubicacion_id', e.target.value)} className="w-full rounded-md border bg-background px-3 py-2" >
                                                                <option value="">Seleccione ubicación</option>
                                                                {ubicaciones.map((ubicacion) => (
                                                                    <option key={ubicacion.id} value={ubicacion.id}>{ubicacion.nombre}</option>
                                                                ))}
                                                            </select>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p className="rounded-lg border border-dashed p-5 text-center text-sm text-muted-foreground">
                                        Introduce una cantidad entera mayor que cero en el cuadro anterior para generar las unidades.
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="flex justify-end gap-3 border-t pt-5">
                <Button type="button" variant="outline" onClick={() => window.history.back()} disabled={guardando} >
                    Cancelar
                </Button>

                <Button type="button" onClick={guardarEntrada} disabled={guardando || seleccionados.length === 0} >
                    {guardando ? 'Guardando entrada...' : 'Guardar entrada'}
                </Button>
            </div>
        </div>
    );
}
