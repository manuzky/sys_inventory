import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CalendarDays, FileText, Hash, MapPin, Truck } from 'lucide-react';

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
}

interface Props {
    entrada: Entrada;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Entradas', href: '/entradas' },
    { title: 'Ver entrada', href: '#' },
];

export default function Show({ entrada }: Props) {
    const fecha = new Date(`${entrada.fecha}T00:00:00`).toLocaleDateString('es-VE');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Entrada #${entrada.id}`} />

            <div className="p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
                        <div className="bg-muted/40 border-b p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Entrada de inventario</p>
                                <h1 className="text-2xl font-bold">Entrada #{entrada.id}</h1>
                            </div>

                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                entrada.estado
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                            }`}>
                                {entrada.estado ? 'Activa' : 'Anulada'}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                            <div className="flex gap-3">
                                <CalendarDays className="h-5 w-5 text-muted-foreground mt-1" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Fecha</p>
                                    <p className="font-medium">{fecha}</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Truck className="h-5 w-5 text-muted-foreground mt-1" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Proveedor</p>
                                    <p className="font-medium">{entrada.proveedor?.nombre ?? 'Sin proveedor'}</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <FileText className="h-5 w-5 text-muted-foreground mt-1" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Tipo de documento</p>
                                    <p className="font-medium">{entrada.tipo_documento}</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Hash className="h-5 w-5 text-muted-foreground mt-1" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Número de documento</p>
                                    <p className="font-medium">{entrada.numero_documento}</p>
                                </div>
                            </div>
                        </div>

                        {entrada.observacion && (
                            <div className="border-t p-6">
                                <p className="text-sm text-muted-foreground mb-1">Observación</p>
                                <p className="text-sm leading-relaxed">{entrada.observacion}</p>
                            </div>
                        )}

                        <div className="border-t p-4 flex justify-end">
                            <Link href={route('entradas.index')}>
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