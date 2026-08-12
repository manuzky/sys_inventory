import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import {
    ArrowLeft,
    CalendarDays,
    FileText,
    User,
} from 'lucide-react';

interface Usuario {
    id: number;
    name: string;
}

interface Salida {
    id: number;
    usuario_id: number;
    fecha: string;
    motivo: string;
    observaciones: string | null;
    usuario: Usuario | null;
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
    const fecha = new Date(
        `${salida.fecha}T00:00:00`
    ).toLocaleDateString('es-VE');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Salida #${salida.id}`} />

            <div className="p-6">
                <div className="max-w-4xl mx-auto">

                    <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">

                        {/* Encabezado */}
                        <div className="bg-muted/40 border-b p-6">
                            <p className="text-sm text-muted-foreground">
                                Salida de inventario
                            </p>

                            <h1 className="text-2xl font-bold">
                                Salida #{salida.id}
                            </h1>
                        </div>

                        {/* Información */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">

                            {/* Fecha */}
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

                            {/* Usuario */}
                            <div className="flex gap-3">
                                <User className="h-5 w-5 text-muted-foreground mt-1" />

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Registrado por
                                    </p>

                                    <p className="font-medium">
                                        {salida.usuario?.name ?? 'Usuario no disponible'}
                                    </p>
                                </div>
                            </div>

                            {/* Motivo */}
                            <div className="flex gap-3 md:col-span-2">
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

                        {/* Observaciones */}
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

                        {/* Botón volver */}
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