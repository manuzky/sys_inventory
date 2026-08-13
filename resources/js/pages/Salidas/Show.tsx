import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import {
    ArrowLeft,
    CalendarDays,
    ClipboardList,
    FileText,
    User,
} from 'lucide-react';

interface Articulo {
    id: number;
    codigo: string;
    nombre: string;
}

interface DetalleSalida {
    id: number;
    articulo_id: number;
    cantidad: number;
    articulo: Articulo | null;
}

interface Usuario {
    id: number;
    name: string;
}

interface Salida {
    id: number;
    fecha: string;
    motivo: string;
    observaciones: string | null;
    usuario: Usuario | null;
    detalles: DetalleSalida[];
}

interface Props {
    salida: Salida;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Salidas',
        href: '/salidas',
    },
    {
        title: 'Ver salida',
        href: '#',
    },
];

export default function Show({ salida }: Props) {
    const fecha = salida.fecha
        ? new Date(`${salida.fecha}T00:00:00`).toLocaleDateString('es-VE')
        : 'Sin fecha';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Salida #${salida.id}`} />

            <div className="p-6">
                <div className="max-w-5xl mx-auto">
                    <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">

                        <div className="bg-muted/40 border-b p-6">
                            <p className="text-sm text-muted-foreground">
                                Salida de inventario
                            </p>

                            <h1 className="text-2xl font-bold">
                                Salida #{salida.id}
                            </h1>
                        </div>

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
                                <User className="h-5 w-5 text-muted-foreground mt-1" />

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Usuario
                                    </p>

                                    <p className="font-medium">
                                        {salida.usuario?.name ?? 'Sin usuario'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <FileText className="h-5 w-5 text-muted-foreground mt-1" />

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Motivo
                                    </p>

                                    <p className="font-medium">
                                        {salida.motivo}
                                    </p>
                                </div>
                            </div>

                        </div>

                        {salida.observaciones && (
                            <div className="border-t p-6">
                                <p className="text-sm text-muted-foreground mb-1">
                                    Observaciones
                                </p>

                                <p className="text-sm leading-relaxed">
                                    {salida.observaciones}
                                </p>
                            </div>
                        )}

                        <div className="border-t p-6">

                            <div className="flex items-center gap-2 mb-4">
                                <ClipboardList className="h-5 w-5" />

                                <h2 className="text-lg font-semibold">
                                    Artículos retirados
                                </h2>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">

                                    <thead>
                                        <tr className="border-b text-left">
                                            <th className="p-3 text-sm font-medium">
                                                Código
                                            </th>

                                            <th className="p-3 text-sm font-medium">
                                                Artículo
                                            </th>

                                            <th className="p-3 text-sm font-medium text-right">
                                                Cantidad
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {salida.detalles.length > 0 ? (
                                            salida.detalles.map((detalle) => (
                                                <tr
                                                    key={detalle.id}
                                                    className="border-b last:border-0"
                                                >
                                                    <td className="p-3">
                                                        {detalle.articulo?.codigo ?? 'N/A'}
                                                    </td>

                                                    <td className="p-3">
                                                        {detalle.articulo?.nombre ?? 'Artículo eliminado'}
                                                    </td>

                                                    <td className="p-3 text-right font-medium">
                                                        {Number(detalle.cantidad).toFixed(2)}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={3}
                                                    className="p-6 text-center text-muted-foreground"
                                                >
                                                    Esta salida no tiene artículos registrados.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>

                                </table>
                            </div>

                        </div>

                        <div className="border-t p-4 flex justify-end">
                            <Link href={route('salidas.index')}>
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