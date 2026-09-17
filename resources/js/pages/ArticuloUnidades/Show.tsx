import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface Unidad {
    id: number;
    articulo_id: number;
    identificador: string;
    serial: string | null;
    ubicacion_id: number;
    estado_id: number;
    fecha_adquisicion: string;
    articulo: {
        id: number;
        nombre: string;
        modelo: string | null;
        referencia: {
            id: number;
            codigo: string;
        };
        marca: {
            id: number;
            nombre: string;
        };
        categoria: {
            id: number;
            nombre: string;
        };
    };
    ubicacion: {
        id: number;
        nombre: string;
    };
    estado: {
        id: number;
        nombre: string;
    };
}

interface Props {
    unidad: Unidad;
}

export default function Show({ unidad }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Unidades de artículos',
            href: '/articulo-unidades',
        },
        {
            title: unidad.identificador,
            href: route('articulo-unidades.show', unidad.id),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={unidad.identificador} />

            <div className="p-6 space-y-6">

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">
                            {unidad.identificador}
                        </h1>

                        <p className="text-sm text-muted-foreground mt-1">
                            Información de la unidad física.
                        </p>
                    </div>

                    <Link href={route('articulo-unidades.index')}>
                        <Button variant="outline">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Volver
                        </Button>
                    </Link>
                </div>

                <div className="rounded-lg border p-6 space-y-6">

                    <div>
                        <h2 className="font-semibold text-lg mb-4">
                            Unidad
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Identificador
                                </p>
                                <p className="font-medium">
                                    {unidad.identificador}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Serial
                                </p>
                                <p className="font-medium">
                                    {unidad.serial ?? 'Sin serial'}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Estado
                                </p>
                                <p className="font-medium">
                                    {unidad.estado?.nombre ?? 'Sin estado'}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Ubicación
                                </p>
                                <p className="font-medium">
                                    {unidad.ubicacion?.nombre ?? 'Sin ubicación'}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Fecha de adquisición
                                </p>
                                <p className="font-medium">
                                    {unidad.fecha_adquisicion}
                                </p>
                            </div>

                        </div>
                    </div>

                    <div>
                        <h2 className="font-semibold text-lg mb-4">
                            Artículo
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Nombre
                                </p>
                                <p className="font-medium">
                                    {unidad.articulo?.nombre}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Referencia
                                </p>
                                <p className="font-medium">
                                    {unidad.articulo?.referencia?.codigo ?? 'Sin referencia'}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Marca
                                </p>
                                <p className="font-medium">
                                    {unidad.articulo?.marca?.nombre ?? 'Sin marca'}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Modelo
                                </p>
                                <p className="font-medium">
                                    {unidad.articulo?.modelo ?? 'Sin modelo'}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Categoría
                                </p>
                                <p className="font-medium">
                                    {unidad.articulo?.categoria?.nombre ?? 'Sin categoría'}
                                </p>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </AppLayout>
    );
}