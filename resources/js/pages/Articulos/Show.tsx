import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Can } from '@/components/can';
import { Button } from '@/components/ui/button';
import {
    ArrowLeft,
    Pencil,
    Package,
    Tag,
    Barcode,
    Boxes,
    Ruler,
    Settings2,
} from 'lucide-react';

interface Articulo {
    id: number;
    categoria_id: number;
    marca_id: number;
    unidad_medida_id: number;
    tipo_articulo: string;
    nombre: string;
    modelo: string | null;
    descripcion: string | null;
    control_individual: boolean;
    maneja_serial: boolean;
    stock: string | number;
    stock_minimo: string | number;
    categoria: {
        id: number;
        nombre: string;
    };
    marca: {
        id: number;
        nombre: string;
    };
    unidad_medida: {
        id: number;
        nombre: string;
    };
}

interface Props {
    articulo: Articulo;
}

export default function Show({ articulo }: Props) {
    const stock = Number(articulo.stock);
    const stockMinimo = Number(articulo.stock_minimo);
    const stockBajo = stock <= stockMinimo;
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Artículos',
            href: '/articulos',
        },
        {
            title: articulo.nombre,
            href: route(
                'articulos.show',
                articulo.id
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={articulo.nombre} />

            <div className="p-6 space-y-5">
                {/* ENCABEZADO */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                            <Package className="h-5 w-5 text-primary" />
                        </div>

                        <div>
                            <h1 className="text-xl font-semibold">
                                {articulo.nombre}
                            </h1>

                            <p className="text-sm text-muted-foreground">
                                Artículo #{articulo.id}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Link href={route('articulos.index')}>
                            <Button variant="outline" type="button">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Volver
                            </Button>
                        </Link>

                        <Can permission="articulos.edit">
                            <Link href={route('articulos.edit', articulo.id)}>
                                <Button>
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Editar
                                </Button>
                            </Link>
                        </Can>
                    </div>

                </div>


                {/* INFORMACIÓN PRINCIPAL */}
                <div className="rounded-xl border bg-card overflow-hidden">
                    <div className="px-5 py-4 border-b">
                        <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <h2 className="font-semibold">
                                    Información del artículo
                                </h2>

                                <p className="text-xs text-muted-foreground">
                                    Datos generales y clasificación.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5">

                            {/* ID */}
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">
                                    Identificador
                                </p>

                                <p className="font-medium">
                                    #{articulo.id}
                                </p>
                            </div>

                            {/* NOMBRE */}
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">
                                    Nombre
                                </p>

                                <p className="font-medium">
                                    {articulo.nombre}
                                </p>
                            </div>

                            {/* MARCA */}
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">
                                    Marca
                                </p>

                                <p className="font-medium">
                                    {articulo.marca?.nombre ?? 'Sin marca'}
                                </p>
                            </div>

                            {/* MODELO */}
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">
                                    Modelo
                                </p>

                                <p className="font-medium">
                                    {articulo.modelo ?? 'Sin modelo'}
                                </p>
                            </div>

                            {/* CATEGORÍA */}
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">
                                    Categoría
                                </p>

                                <p className="font-medium">
                                    {articulo.categoria?.nombre ?? 'Sin categoría'}
                                </p>
                            </div>
                            
                            {/* TIPO */}
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">
                                    Tipo de artículo
                                </p>

                                <p className="font-medium">
                                    {articulo.tipo_articulo}
                                </p>
                            </div>

                            {/* UNIDAD */}
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">
                                    Unidad de medida
                                </p>

                                <p className="font-medium">
                                    {articulo.unidad_medida?.nombre ?? 'Sin unidad'}
                                </p>
                            </div>
                        </div>

                        {/* DESCRIPCIÓN */}
                        {articulo.descripcion && (
                            <div className="mt-5 pt-5 border-t">
                                <p className="text-xs text-muted-foreground mb-1">
                                    Descripción
                                </p>

                                <p className="text-sm whitespace-pre-wrap">
                                    {articulo.descripcion}
                                </p>
                            </div>
                        )}
                    </div>
                </div>


                {/* CONTROL E INVENTARIO */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* STOCK */}
                    <div className="rounded-xl border bg-card p-5">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Stock actual
                                </p>

                                <p className="text-3xl font-bold mt-1">
                                    {stock}
                                </p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <Boxes className="h-5 w-5 text-primary" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                                Stock mínimo: {stockMinimo}
                            </span>

                            <span
                                className={`
                                    px-2 py-1 rounded-md text-xs font-medium
                                    ${ stockBajo ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700' }
                                `}
                            >
                                {stockBajo ? 'Stock bajo' : 'Stock normal'}
                            </span>
                        </div>
                    </div>


                    {/* CONTROL INDIVIDUAL */}
                    <div className="rounded-xl border bg-card p-5">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Control individual
                                </p>

                                <p className="text-lg font-semibold mt-1">
                                    {articulo.control_individual ? 'Activado' : 'Desactivado'}
                                </p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <Settings2 className="h-5 w-5 text-primary" />
                            </div>
                        </div>

                        <p className="text-xs text-muted-foreground mt-3">
                            {articulo.control_individual
                                ? 'Cada unidad se controla individualmente.'
                                : 'Las unidades se manejan como una cantidad total.'}
                        </p>
                    </div>


                    {/* SERIAL */}
                    <div className="rounded-xl border bg-card p-5">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Manejo de serial
                                </p>

                                <p className="text-lg font-semibold mt-1">
                                    {articulo.maneja_serial
                                        ? 'Activado'
                                        : 'Desactivado'}
                                </p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <Barcode className="h-5 w-5 text-primary" />
                            </div>
                        </div>

                        <p className="text-xs text-muted-foreground mt-3">
                            {articulo.maneja_serial
                                ? 'Cada unidad debe tener un número de serial.'
                                : 'No se requiere serial para las unidades.'}
                        </p>
                    </div>
                </div>


                {/* RESUMEN */}
                <div className="rounded-xl border bg-card p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <Ruler className="h-4 w-4 text-muted-foreground" />

                        <h2 className="font-semibold">
                            Resumen de control
                        </h2>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <span
                            className={`
                                px-3 py-1.5 rounded-full text-xs font-medium
                                ${
                                    articulo.control_individual
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-700'
                                }
                            `}
                        >
                            Control individual:{' '}
                            {articulo.control_individual ? 'Sí' : 'No'}
                        </span>

                        <span
                            className={`
                                px-3 py-1.5 rounded-full text-xs font-medium
                                ${
                                    articulo.maneja_serial
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-700'
                                }
                            `}
                        >
                            Serial:{' '}
                            {articulo.maneja_serial ? 'Sí' : 'No'}
                        </span>

                        <span
                            className={`
                                px-3 py-1.5 rounded-full text-xs font-medium
                                ${
                                    stockBajo
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-green-100 text-green-700'
                                }
                            `}
                        >
                            {stockBajo
                                ? 'Existencia baja'
                                : 'Existencia normal'}
                        </span>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}