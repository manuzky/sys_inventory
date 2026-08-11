import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import {
    ArrowLeft,
    CalendarDays,
    FileText,
    Hash,
    Package,
    Truck,
    User,
} from 'lucide-react';

interface Articulo {
    id: number;
    codigo: string;
    nombre: string;
}

interface DetalleEntrada {
    id: number;
    articulo_id: number;
    cantidad: number;
    costo: number;
    articulo: Articulo | null;
}

interface Entrada {
    id: number;
    fecha: string;
    tipo_documento: string;
    numero_documento: string;
    observacion: string | null;
    estado: boolean;

    proveedor: {
        id: number;
        nombre: string;
    } | null;

    usuario: {
        id: number;
        name: string;
    } | null;

    detalles: DetalleEntrada[];
}

interface Props {
    entrada: Entrada;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Entradas',
        href: '/entradas',
    },
    {
        title: 'Ver entrada',
        href: '#',
    },
];

export default function Show({ entrada }: Props) {
    const fecha = new Date(
        `${entrada.fecha}T00:00:00`
    ).toLocaleDateString('es-VE');

    const total = entrada.detalles.reduce(
        (sum, detalle) =>
            sum +
            Number(detalle.cantidad) *
                Number(detalle.costo),
        0
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Entrada #${entrada.id}`} />

            <div className="p-6">
                <div className="max-w-5xl mx-auto">
                    <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">

                        {/* Encabezado */}
                        <div className="bg-muted/40 border-b p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Entrada de inventario
                                </p>

                                <h1 className="text-2xl font-bold">
                                    Entrada #{entrada.id}
                                </h1>
                            </div>

                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    entrada.estado
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                }`}
                            >
                                {entrada.estado
                                    ? 'Activa'
                                    : 'Anulada'}
                            </span>
                        </div>

                        {/* Información */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">

                            <div className="flex gap-3">
                                <CalendarDays className="h-5 w-5 text-muted-foreground mt-1" />

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Fecha
                                    </p>

                                    <p className="font-medium">
                                        {fecha}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Truck className="h-5 w-5 text-muted-foreground mt-1" />

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Proveedor
                                    </p>

                                    <p className="font-medium">
                                        {entrada.proveedor?.nombre ??
                                            'Sin proveedor'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <FileText className="h-5 w-5 text-muted-foreground mt-1" />

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Tipo de documento
                                    </p>

                                    <p className="font-medium">
                                        {entrada.tipo_documento}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Hash className="h-5 w-5 text-muted-foreground mt-1" />

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Número de documento
                                    </p>

                                    <p className="font-medium">
                                        {entrada.numero_documento}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <User className="h-5 w-5 text-muted-foreground mt-1" />

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Registrado por
                                    </p>

                                    <p className="font-medium">
                                        {entrada.usuario?.name ??
                                            'Usuario desconocido'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Artículos */}
                        <div className="border-t p-6">

                            <div className="flex items-center gap-2 mb-4">
                                <Package className="h-5 w-5" />

                                <h2 className="text-lg font-semibold">
                                    Artículos
                                </h2>
                            </div>

                            {entrada.detalles.length > 0 ? (
                                <div className="overflow-x-auto rounded-lg border">
                                    <table className="w-full text-sm">
                                        <thead className="bg-muted/40 border-b">
                                            <tr>
                                                <th className="text-left px-4 py-3">
                                                    Código
                                                </th>

                                                <th className="text-left px-4 py-3">
                                                    Artículo
                                                </th>

                                                <th className="text-right px-4 py-3">
                                                    Cantidad
                                                </th>

                                                <th className="text-right px-4 py-3">
                                                    Costo
                                                </th>

                                                <th className="text-right px-4 py-3">
                                                    Subtotal
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {entrada.detalles.map(
                                                (detalle) => {
                                                    const subtotal =
                                                        Number(
                                                            detalle.cantidad
                                                        ) *
                                                        Number(
                                                            detalle.costo
                                                        );

                                                    return (
                                                        <tr
                                                            key={
                                                                detalle.id
                                                            }
                                                            className="border-b last:border-0"
                                                        >
                                                            <td className="px-4 py-3">
                                                                {detalle.articulo
                                                                    ?.codigo ??
                                                                    '—'}
                                                            </td>

                                                            <td className="px-4 py-3 font-medium">
                                                                {detalle.articulo
                                                                    ?.nombre ??
                                                                    'Artículo eliminado'}
                                                            </td>

                                                            <td className="px-4 py-3 text-right">
                                                                {Number(
                                                                    detalle.cantidad
                                                                ).toFixed(
                                                                    2
                                                                )}
                                                            </td>

                                                            <td className="px-4 py-3 text-right">
                                                                $
                                                                {Number(
                                                                    detalle.costo
                                                                ).toFixed(
                                                                    2
                                                                )}
                                                            </td>

                                                            <td className="px-4 py-3 text-right font-medium">
                                                                $
                                                                {subtotal.toFixed(
                                                                    2
                                                                )}
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                        </tbody>

                                        <tfoot className="bg-muted/40">
                                            <tr>
                                                <td
                                                    colSpan={4}
                                                    className="px-4 py-3 text-right font-semibold"
                                                >
                                                    Total
                                                </td>

                                                <td className="px-4 py-3 text-right font-bold">
                                                    $
                                                    {total.toFixed(
                                                        2
                                                    )}
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    Esta entrada no tiene artículos registrados.
                                </p>
                            )}
                        </div>

                        {/* Observación */}
                        {entrada.observacion && (
                            <div className="border-t p-6">
                                <p className="text-sm text-muted-foreground mb-1">
                                    Observación
                                </p>

                                <p className="text-sm leading-relaxed">
                                    {entrada.observacion}
                                </p>
                            </div>
                        )}

                        {/* Acciones */}
                        <div className="border-t p-4 flex justify-end">
                            <Link
                                href={route(
                                    'entradas.index'
                                )}
                            >
                                <Button variant="outline">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Volver
                                </Button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}