
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Package } from 'lucide-react';

interface Articulo {
    id: number;
    nombre: string;
    modelo: string | null;
    control_individual: boolean;
    maneja_serial: boolean;
    stock: string | number;
    referencia: { codigo: string } | null;
    marca: { nombre: string } | null;
    categoria: { nombre: string } | null;
}

interface Proveedor {
    id: number;
    nombre: string;
}

interface Usuario {
    id: number;
    name: string;
}

interface Ubicacion {
    id: number;
    nombre: string;
}

interface EstadoArticulo {
    id: number;
    nombre: string;
}

interface Unidad {
    id: number;
    identificador: string;
    serial: string | null;
    ubicacion: Ubicacion | null;
    estado: EstadoArticulo | null;
    fecha_adquisicion: string;
}

interface Entrada {
    id: number;
    proveedor: Proveedor | null;
    usuario: Usuario | null;
    numero_documento: string | null;
    fecha: string;
    observaciones: string | null;
}

interface Detalle {
    id: number;
    cantidad: string | number;
    articulo: Articulo;
    unidades: Unidad[];
}

interface Props {
    entrada: Entrada;
    detalle: Detalle;
}

export default function ShowDetalle({ entrada, detalle }: Props) {
    const articulo = detalle.articulo;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Entradas', href: '/entradas' },
        {
            title: 'Historial de entradas',
            href: route('articulos.entradas', articulo.id),
        },
        {
            title: 'Detalle del artículo',
            href: '#',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detalle de entrada - ${articulo.nombre}`} />

            <div className="space-y-6 p-6">
                {/* ENCABEZADO */}
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-semibold">
                            Detalle de entrada
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Información del artículo registrado en esta factura.
                        </p>
                    </div>

                    <Link href={route('articulos.entradas', articulo.id)}>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver
                        </Button>
                    </Link>
                </div>

                {/* INFORMACIÓN PRINCIPAL */}
                <div className="space-y-6 rounded-lg border bg-background p-6 shadow-sm">
                    <div>
                        <h2 className="text-lg font-semibold">
                            Información del artículo
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Datos generales del artículo registrado.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                        <div className="space-y-2">
                            <Label>Nombre</Label>
                            <Input value={articulo.nombre} disabled />
                        </div>

                        <div className="space-y-2">
                            <Label>Marca</Label>
                            <Input
                                value={articulo.marca?.nombre ?? 'Sin marca'}
                                disabled
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Modelo</Label>
                            <Input
                                value={articulo.modelo ?? 'Sin modelo'}
                                disabled
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Stock actual</Label>
                            <Input value={Number(articulo.stock)} disabled />
                        </div>

                        <div className="space-y-2">
                            <Label>Referencia</Label>
                            <Input
                                value={articulo.referencia?.codigo ?? 'Sin referencia'}
                                disabled
                            />
                        </div>
                    </div>

                    {/* INFORMACIÓN DE LA FACTURA */}
                    <div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="space-y-2">
                                <Label>Proveedor</Label>
                                <Input
                                    value={entrada.proveedor?.nombre ?? 'Sin proveedor'}
                                    disabled
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Cantidad en esta entrada</Label>
                                <Input
                                    value={Number(detalle.cantidad)}
                                    disabled
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Número de factura</Label>
                                <Input
                                    value={entrada.numero_documento ?? 'Sin documento'}
                                    disabled
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Fecha de factura</Label>
                                <Input
                                    value={entrada.fecha?.substring(0, 10) ?? ''}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>

                    {/* OBSERVACIONES */}
                    <div className="space-y-2">
                        <Label>Observaciones</Label>
                        <div className="min-h-[80px] rounded-md border bg-muted/30 px-3 py-3 text-sm whitespace-pre-wrap">
                            {entrada.observaciones || 'Sin observaciones.'}
                        </div>
                    </div>

                    {/* USUARIO */}
                    {/* <div className="space-y-2">
                        <Label>Registrado por</Label>
                        <Input
                            value={entrada.usuario?.name ?? 'Sin usuario'}
                            disabled
                        />
                    </div> */}
                </div>

                {/* UNIDADES FÍSICAS */}
                {articulo.control_individual && (
                    <div className="space-y-4 rounded-lg border bg-background p-5">
                        <div>
                            <div className="flex items-center gap-2">
                                <Package className="h-5 w-5" />
                                <h2 className="font-semibold">
                                    Unidades físicas
                                </h2>
                            </div>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Unidades individuales registradas en esta entrada.
                            </p>
                        </div>

                        {detalle.unidades.length === 0 ? (
                            <p className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
                                No hay unidades asociadas a este detalle de entrada.
                            </p>
                        ) : (
                            <div className="overflow-x-auto rounded-md border">
                                <table className="w-full text-sm">
                                    <thead className="bg-muted/50">
                                        <tr>
                                            <th className="px-3 py-3 text-left">
                                                Identificador
                                            </th>

                                            {articulo.maneja_serial && (
                                                <th className="px-3 py-3 text-left">
                                                    Serial
                                                </th>
                                            )}

                                            <th className="px-3 py-3 text-left">
                                                Estado
                                            </th>

                                            <th className="px-3 py-3 text-left">
                                                Ubicación
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y">
                                        {detalle.unidades.map((unidad) => (
                                            <tr
                                                key={unidad.id}
                                                className="hover:bg-muted/30"
                                            >
                                                <td className="px-3 py-3 font-medium">
                                                    {unidad.identificador}
                                                </td>

                                                {articulo.maneja_serial && (
                                                    <td className="px-3 py-3">
                                                        {unidad.serial || 'Sin serial'}
                                                    </td>
                                                )}

                                                <td className="px-3 py-3">
                                                    {unidad.estado?.nombre ?? 'Sin estado'}
                                                </td>

                                                <td className="px-3 py-3">
                                                    {unidad.ubicacion?.nombre ?? 'Sin ubicación'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
