import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Pencil, ArrowLeft } from 'lucide-react';

interface Articulo {
    id: number;
    nombre: string;
    modelo: string | null;
    tipo_articulo: string;
    stock: string | number;
    referencia: {
        id: number;
        codigo: string;
    } | null;
    marca: {
        id: number;
        nombre: string;
    } | null;
}

interface Usuario {
    id: number;
    name: string;
}

interface Proveedor {
    id: number;
    nombre: string;
}

interface EntradaDetalle {
    id: number;
    articulo_id: number;
    cantidad: string | number;
}

interface Entrada {
    id: number;
    numero_documento: string | null;
    fecha: string;
    observaciones: string | null;
    usuario: Usuario | null;
    proveedor: Proveedor | null;
    detalles: EntradaDetalle[];
}

interface Props {
    articulo: Articulo;
    entradas: Entrada[];
    ultimaFecha: string | null;
}

export default function Show({
    articulo,
    entradas,
    ultimaFecha,
}: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Entradas',
            href: '/entradas',
        },
        {
            title: articulo.nombre,
            href: `/entradas/${articulo.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Entradas - ${articulo.nombre}`} />

            <div className="p-6 space-y-6">

                {/* ENCABEZADO */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">
                            {articulo.nombre}
                        </h1>

                        <p className="text-sm text-muted-foreground mt-1">
                            Historial de entradas de este artículo.
                        </p>
                    </div>

                    <Link href={route('entradas.index')}>
                        <Button variant="outline">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Volver
                        </Button>
                    </Link>
                </div>

                {/* INFORMACIÓN DEL ARTÍCULO */}
                <div className="rounded-lg border bg-background p-6">
                    <h2 className="text-lg font-semibold mb-5">
                        Información del artículo
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Nombre
                            </p>
                            <p className="font-medium mt-1">
                                {articulo.nombre}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Marca
                            </p>
                            <p className="font-medium mt-1">
                                {articulo.marca?.nombre ?? 'Sin marca'}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Modelo
                            </p>
                            <p className="font-medium mt-1">
                                {articulo.modelo ?? 'Sin modelo'}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Referencia
                            </p>
                            <p className="font-medium mt-1">
                                {articulo.referencia?.codigo ?? 'Sin referencia'}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Última entrada
                            </p>
                            <p className="font-medium mt-1">
                                {ultimaFecha
                                    ? new Date(ultimaFecha).toLocaleDateString('es-VE')
                                    : 'Sin entradas'}
                            </p>
                        </div>

                    </div>
                </div>

                {/* HISTORIAL */}
                <div className="rounded-lg border bg-background p-6 space-y-4">

                    <div>
                        <h2 className="text-lg font-semibold">
                            Historial de entradas
                        </h2>

                        <p className="text-sm text-muted-foreground mt-1">
                            Todas las entradas registradas para este artículo.
                        </p>
                    </div>

                    <div className="overflow-x-auto rounded-md border">
                        <table className="w-full text-sm">

                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium">
                                        Usuario
                                    </th>
                                    <th className="px-4 py-3 text-left font-medium">
                                        Factura / Documento
                                    </th>
                                    <th className="px-4 py-3 text-left font-medium">
                                        Observaciones
                                    </th>
                                    <th className="px-4 py-3 text-left font-medium">
                                        Fecha
                                    </th>
                                    <th className="px-4 py-3 text-right font-medium">
                                        Cantidad
                                    </th>
                                    <th className="px-4 py-3 text-right font-medium">
                                        Acción
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">

                                {entradas.map((entrada) => {
                                    const detalle = entrada.detalles[0];

                                    return (
                                        <tr
                                            key={entrada.id}
                                            className="hover:bg-muted/30"
                                        >
                                            <td className="px-4 py-3">
                                                {entrada.usuario?.name ?? 'Sin usuario'}
                                            </td>

                                            <td className="px-4 py-3">
                                                {entrada.numero_documento ?? 'Sin documento'}
                                            </td>

                                            <td className="px-4 py-3">
                                                {entrada.observaciones ?? 'Sin observaciones'}
                                            </td>

                                            <td className="px-4 py-3">
                                                {new Date(entrada.fecha).toLocaleDateString('es-VE')}
                                            </td>

                                            <td className="px-4 py-3 text-right font-medium">
                                                {detalle
                                                    ? Number(detalle.cantidad)
                                                    : 0}
                                            </td>

                                            <td className="px-4 py-3">
                                                <div className="flex justify-end">
                                                    <Link
                                                        href={route(
                                                            'entradas.edit',
                                                            entrada.id
                                                        )}
                                                        title="Editar entrada"
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background text-yellow-600 hover:border-yellow-300 hover:bg-yellow-50 hover:text-yellow-700 transition-all duration-200 hover:scale-105"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}

                                {entradas.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-4 py-8 text-center text-muted-foreground"
                                        >
                                            No existen entradas para este artículo.
                                        </td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </AppLayout>
    );
}