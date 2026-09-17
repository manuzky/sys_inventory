import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Proveedor {
    id: number;
    nombre: string;
}

interface Articulo {
    id: number;
    nombre: string;
    modelo: string | null;
    referencia: {
        id: number;
        codigo: string;
    } | null;
    marca: {
        id: number;
        nombre: string;
    } | null;
}

interface EntradaDetalle {
    id: number;
    cantidad: string | number;
    articulo: Articulo;
}

interface Entrada {
    id: number;
    proveedor_id: number;
    numero_documento: string | null;
    fecha: string;
    observaciones: string | null;
    detalles: EntradaDetalle[];
}

interface Props {
    entrada: Entrada;
    proveedores: Proveedor[];
}

export default function Edit({ entrada, proveedores }: Props) {
    const detalle = entrada.detalles[0];
    const articulo = detalle?.articulo;

    const { data, setData, put, processing, errors } = useForm({
        proveedor_id: String(entrada.proveedor_id),
        numero_documento: entrada.numero_documento ?? '',
        fecha: entrada.fecha.substring(0, 10),
        observaciones: entrada.observaciones ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('entradas.update', entrada.id));
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Entradas', href: '/entradas' },
        {
            title: articulo?.nombre ?? `Entrada #${entrada.id}`,
            href: articulo ? `/entradas/${articulo.id}` : '/entradas',
        },
        {
            title: 'Editar entrada',
            href: `/entradas/${entrada.id}/edit`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar entrada #${entrada.id}`} />

            <div className="p-6 space-y-6">
                <div>
                    <h1 className="text-xl font-semibold">
                        Editar entrada #{entrada.id}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Modifique los datos de esta entrada de inventario.
                    </p>
                </div>

                {/* ARTÍCULO */}
                <div className="rounded-lg border bg-muted/30 p-5 space-y-4">
                    <h2 className="text-lg font-semibold">
                        Artículo
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div>
                            <Label>Nombre</Label>
                            <p className="mt-1 font-medium">
                                {articulo?.nombre ?? 'Sin artículo'}
                            </p>
                        </div>

                        <div>
                            <Label>Marca</Label>
                            <p className="mt-1">
                                {articulo?.marca?.nombre ?? 'Sin marca'}
                            </p>
                        </div>

                        <div>
                            <Label>Modelo</Label>
                            <p className="mt-1">
                                {articulo?.modelo ?? 'Sin modelo'}
                            </p>
                        </div>

                        <div>
                            <Label>Referencia</Label>
                            <p className="mt-1">
                                {articulo?.referencia?.codigo ?? 'Sin referencia'}
                            </p>
                        </div>

                        <div>
                            <Label>Cantidad</Label>
                            <p className="mt-1 font-medium">
                                {detalle ? Number(detalle.cantidad) : 0}
                            </p>
                        </div>
                    </div>
                </div>

                {/* DATOS DE LA ENTRADA */}
                <div className="rounded-lg border p-5 space-y-5">
                    <h2 className="text-lg font-semibold">
                        Datos de la entrada
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Label htmlFor="proveedor_id">
                                Proveedor
                            </Label>

                            <select
                                id="proveedor_id"
                                value={data.proveedor_id}
                                onChange={(e) =>
                                    setData('proveedor_id', e.target.value)
                                }
                                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                            >
                                <option value="">
                                    Seleccione un proveedor
                                </option>

                                {proveedores.map((proveedor) => (
                                    <option key={proveedor.id} value={proveedor.id}>
                                        {proveedor.nombre}
                                    </option>
                                ))}
                            </select>

                            {errors.proveedor_id && (
                                <p className="text-sm text-red-600">
                                    {errors.proveedor_id}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="numero_documento">
                                Número de factura / documento
                            </Label>

                            <Input
                                id="numero_documento"
                                value={data.numero_documento}
                                onChange={(e) =>
                                    setData('numero_documento', e.target.value)
                                }
                                placeholder="Ej. FAC-12345"
                            />

                            {errors.numero_documento && (
                                <p className="text-sm text-red-600">
                                    {errors.numero_documento}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fecha">
                                Fecha
                            </Label>

                            <Input
                                id="fecha"
                                type="date"
                                value={data.fecha}
                                onChange={(e) =>
                                    setData('fecha', e.target.value)
                                }
                            />

                            {errors.fecha && (
                                <p className="text-sm text-red-600">
                                    {errors.fecha}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="observaciones">
                                Observaciones
                            </Label>

                            <Textarea
                                id="observaciones"
                                value={data.observaciones}
                                onChange={(e) =>
                                    setData('observaciones', e.target.value)
                                }
                                placeholder="Observaciones de la entrada..."
                            />

                            {errors.observaciones && (
                                <p className="text-sm text-red-600">
                                    {errors.observaciones}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* ACCIONES */}
                <div className="flex justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => window.history.back()}
                    >
                        Cancelar
                    </Button>

                    <Button
                        type="button"
                        disabled={processing}
                        onClick={submit}
                    >
                        Guardar cambios
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}