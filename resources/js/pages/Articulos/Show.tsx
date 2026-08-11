import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import {
    ArrowLeft,
    Calendar,
    Hash,
    MapPin,
    Package,
    Tag,
    Wrench,
} from 'lucide-react';

interface Articulo {
    id: number;
    codigo: string;
    codigo_patrimonial: string | null;
    serial: string | null;
    nombre: string;
    descripcion: string | null;
    tipo_articulo: string;
    cantidad: string;
    stock_minimo: string;
    fecha_adquisicion: string | null;

    categoria?: {
        id: number;
        nombre: string;
    };

    marca?: {
        id: number;
        nombre: string;
    };

    unidadMedida?: {
        id: number;
        nombre: string;
        abreviatura?: string;
    };

    ubicacion?: {
        id: number;
        nombre: string;
    };

    estado?: {
        id: number;
        nombre: string;
        descripcion?: string | null;
    };
}

interface Props {
    articulo: Articulo;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Artículos',
        href: '/articulos',
    },
    {
        title: 'Ver artículo',
        href: '#',
    },
];

export default function Show({ articulo }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Artículo - ${articulo.nombre}`} />

            <div className="p-6">
                <div className="mx-auto max-w-5xl">

                    {/* Encabezado */}
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Información del artículo
                            </p>

                            <h1 className="text-2xl font-semibold tracking-tight">
                                {articulo.nombre}
                            </h1>
                        </div>

                        <Link
                            href={route('articulos.index')}
                            className="inline-flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Volver
                        </Link>
                    </div>

                    {/* Tarjeta principal */}
                    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">

                        {/* Cabecera de la tarjeta */}
                        <div className="flex items-center justify-between border-b bg-muted/30 px-5 py-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-lg border bg-background">
                                    <Package className="h-5 w-5 text-muted-foreground" />
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Código
                                    </p>

                                    <p className="font-semibold">
                                        {articulo.codigo}
                                    </p>
                                </div>
                            </div>

                            <span className="rounded-full border bg-background px-3 py-1 text-xs font-medium">
                                {articulo.tipo_articulo}
                            </span>
                        </div>

                        <div className="p-5">

                            {/* Identificación */}
                            <section>
                                <div className="mb-3 flex items-center gap-2">
                                    <Hash className="h-4 w-4 text-muted-foreground" />
                                    <h2 className="font-semibold">
                                        Identificación
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-3">

                                    <Info
                                        label="Código"
                                        value={articulo.codigo}
                                    />

                                    <Info
                                        label="Código patrimonial"
                                        value={ articulo.codigo_patrimonial ?? 'Sin código patrimonial' }
                                    />

                                    <Info
                                        label="Serial"
                                        value={ articulo.serial ?? 'Sin serial' }
                                    />

                                </div>
                            </section>

                            <div className="my-5 border-t" />

                            {/* Características */}
                            <section>
                                <div className="mb-3 flex items-center gap-2">
                                    <Tag className="h-4 w-4 text-muted-foreground" />
                                    <h2 className="font-semibold">
                                        Características
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-3">

                                    <Info
                                        label="Categoría"
                                        value={ articulo.categoria?.nombre ?? 'Sin categoría' }
                                    />

                                    <Info
                                        label="Marca"
                                        value={ articulo.marca?.nombre ?? 'Sin marca' }
                                    />

                                    <Info
                                        label="Unidad de medida"
                                        value={
                                            articulo.unidadMedida?.abreviatura
                                                ? `${articulo.unidadMedida.nombre} (${articulo.unidadMedida.abreviatura})`
                                                : articulo.unidadMedida?.nombre ??
                                                  'Sin unidad'
                                        }
                                    />

                                </div>
                            </section>

                            <div className="my-5 border-t" />

                            {/* Inventario */}
                            <section>
                                <div className="mb-3 flex items-center gap-2">
                                    <Package className="h-4 w-4 text-muted-foreground" />
                                    <h2 className="font-semibold">
                                        Inventario
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-3">

                                    <Info
                                        label="Cantidad"
                                        value={`${articulo.cantidad} ${
                                            articulo.unidadMedida?.abreviatura ?? ''
                                        }`}
                                    />

                                    <Info
                                        label="Stock mínimo"
                                        value={`${articulo.stock_minimo} ${
                                            articulo.unidadMedida?.abreviatura ?? ''
                                        }`}
                                    />

                                    <Info
                                        label="Ubicación"
                                        value={
                                            articulo.ubicacion?.nombre ??
                                            'Sin ubicación'
                                        }
                                    />

                                </div>
                            </section>

                            <div className="my-5 border-t" />

                            {/* Estado y adquisición */}
                            <section>
                                <div className="mb-3 flex items-center gap-2">
                                    <Wrench className="h-4 w-4 text-muted-foreground" />
                                    <h2 className="font-semibold">
                                        Estado y adquisición
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">

                                    <div>
                                        <p className="mb-1 text-xs text-muted-foreground">
                                            Estado
                                        </p>

                                        <span className="inline-flex rounded-full border px-3 py-1 text-sm font-medium">
                                            {articulo.estado?.nombre ??
                                                'Sin estado'}
                                        </span>
                                    </div>

                                    <Info
                                        label="Fecha de adquisición"
                                        value={
                                            articulo.fecha_adquisicion
                                                ? new Date(
                                                      articulo.fecha_adquisicion
                                                  ).toLocaleDateString(
                                                      'es-VE'
                                                  )
                                                : 'Sin fecha'
                                        }
                                        icon={
                                            <Calendar className="h-4 w-4" />
                                        }
                                    />

                                </div>
                            </section>

                            {/* Descripción */}
                            {articulo.descripcion && (
                                <>
                                    <div className="my-5 border-t" />

                                    <section>
                                        <p className="mb-2 text-xs text-muted-foreground">
                                            Descripción
                                        </p>

                                        <div className="rounded-lg border bg-muted/20 p-3 text-sm leading-relaxed">
                                            {articulo.descripcion}
                                        </div>
                                    </section>
                                </>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

interface InfoProps {
    label: string;
    value: string;
    icon?: React.ReactNode;
}

function Info({ label, value, icon }: InfoProps) {
    return (
        <div>
            <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                {icon}
                <span>{label}</span>
            </div>

            <p className="text-sm font-medium">
                {value}
            </p>
        </div>
    );
}