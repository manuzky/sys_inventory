
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Can } from '@/components/can';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pencil, Package, Tag, Barcode, Boxes, Settings2, CalendarDays, FileText, Truck, User, Clock3, Hash, } from 'lucide-react';

interface EntradaDetalle {
    id: number;
    cantidad: string | number;
    entrada: {
        id: number;
        numero_documento: string;
        fecha: string;
        proveedor?: { nombre: string } | null;
        usuario?: { name: string } | null;
    } | null;
}

interface Articulo {
    id: number;
    nombre: string;
    modelo: string | null;
    descripcion: string | null;
    control_individual: boolean;
    maneja_serial: boolean;
    stock: string | number;
    stock_minimo: string | number;
    categoria: { id: number; nombre: string } | null;
    marca: { id: number; nombre: string } | null;
    referencia: { id: number; codigo: string } | null;
    entrada_detalles: EntradaDetalle[];
}

interface Props {
    articulo: Articulo;
}

const formatoFecha = (fecha: string) => {
    if (!fecha) return 'Sin fecha';
    return new Date(`${fecha.substring(0, 10)}T00:00:00`).toLocaleDateString('es-VE', { day: '2-digit', month: 'long', year: 'numeric' },);
};

export default function Show({ articulo }: Props) {
    const stock = Number(articulo.stock);
    const stockMinimo = Number(articulo.stock_minimo);
    const stockBajo = stock <= stockMinimo;

    const entradas = [...(articulo.entrada_detalles ?? [])]
        .filter((detalle) => detalle.entrada)
        .sort((a, b) => new Date(b.entrada!.fecha).getTime() - new Date(a.entrada!.fecha).getTime(),);

    const ultimaEntrada = entradas[0]?.entrada;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Artículos', href: route('articulos.index') },
        { title: articulo.nombre, href: route('articulos.show', articulo.id) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Artículo - ${articulo.nombre}`} />

            <div className="space-y-6 p-4 md:p-6">
                {/* ENCABEZADO */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                            <Package className="h-6 w-6 text-primary" />
                        </div>

                        <div className="min-w-0">
                            <h1 className="text-xl font-bold tracking-tight">
                                {articulo.nombre}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Detalles del artículo · #{articulo.id}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Link href={route('articulos.index')}>
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Volver
                            </Button>
                        </Link>

                        <Can permission="articulos.edit">
                            <Link href={route('articulos.edit', articulo.id)}>
                                <Button>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Editar
                                </Button>
                            </Link>
                        </Can>
                    </div>
                </div>

                {/* RESUMEN DE EXISTENCIAS */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl border bg-card p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">Stock actual</p>
                            <Boxes className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <p className="mt-2 text-3xl font-bold tabular-nums">{stock}</p>
                        <div className="mt-3 flex items-center justify-between gap-2">
                            <span className="text-xs text-muted-foreground">
                                Mínimo requerido: {stockMinimo}
                            </span>
                            <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                stockBajo
                                    ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                                    : 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
                            }`}>
                                {stockBajo ? 'Stock bajo' : 'Stock normal'}
                            </span>
                        </div>
                    </div>

                    <div className="rounded-xl border bg-card p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">Control individual</p>
                            <Settings2 className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <p className="mt-2 text-2xl font-semibold">
                            {articulo.control_individual ? 'Activado' : 'Desactivado'}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                            {articulo.control_individual ? 'Cada unidad se registra por separado.' : 'Las existencias se manejan por cantidad.'}
                        </p>
                    </div>

                    <div className="rounded-xl border bg-card p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">Manejo de serial</p>
                            <Barcode className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <p className="mt-2 text-2xl font-semibold">
                            {articulo.maneja_serial ? 'Activado' : 'Desactivado'}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                            {articulo.maneja_serial ? 'Se registra el serial de cada unidad.' : 'No requiere números de serial.'}
                        </p>
                    </div>
                </div>

                {/* INFORMACIÓN DEL ARTÍCULO */}
                <section className="overflow-hidden rounded-xl border bg-card">
                    <div className="flex items-center gap-3 border-b px-5 py-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                            <Tag className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            <h2 className="font-semibold">Información del artículo</h2>
                            <p className="text-xs text-muted-foreground">
                                Datos generales y clasificación.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-x-8 gap-y-5 p-5 sm:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <p className="text-xs text-muted-foreground">Nombre</p>
                            <p className="mt-1 font-medium">{articulo.nombre}</p>
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground">Marca</p>
                            <p className="mt-1 font-medium">{articulo.marca?.nombre ?? 'Sin marca'}</p>
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground">Modelo</p>
                            <p className="mt-1 font-medium">{articulo.modelo || 'Sin modelo'}</p>
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground">Categoría</p>
                            <p className="mt-1 font-medium">{articulo.categoria?.nombre ?? 'Sin categoría'}</p>
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground">Referencia</p>
                            <p className="mt-1 font-medium">
                                {articulo.referencia?.codigo ?? 'Sin referencia'}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground">Identificador interno</p>
                            <p className="mt-1 font-medium">#{articulo.id}</p>
                        </div>

                        {articulo.descripcion && (
                            <div className="border-t pt-4 sm:col-span-2 lg:col-span-3">
                                <p className="text-xs text-muted-foreground">Descripción</p>
                                <p className="mt-2 text-sm leading-relaxed whitespace-pre-wrap">
                                    {articulo.descripcion}
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* ÚLTIMA ENTRADA */}
                {/* <section className="rounded-xl border bg-card p-5">
                    <div className="flex items-center gap-2">
                        <Clock3 className="h-5 w-5 text-muted-foreground" />
                        <h2 className="font-semibold">Última entrada</h2>
                    </div>

                    {ultimaEntrada ? (
                        <div className="mt-4 grid gap-4 sm:grid-cols-3">
                            <div>
                                <p className="text-xs text-muted-foreground">Factura</p>
                                <p className="mt-1 font-medium">{ultimaEntrada.numero_documento}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Proveedor</p>
                                <p className="mt-1 font-medium">
                                    {ultimaEntrada.proveedor?.nombre ?? 'Sin proveedor'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Fecha</p>
                                <p className="mt-1 font-medium">{formatoFecha(ultimaEntrada.fecha)}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="mt-4 text-sm text-muted-foreground">
                            Este artículo todavía no tiene entradas registradas.
                        </p>
                    )}
                </section> */}

                {/* HISTORIAL DE ENTRADAS */}
                <section className="overflow-hidden rounded-xl border bg-card shadow-sm">
                    {/* ENCABEZADO */}
                    <div className="flex flex-col justify-between gap-3 border-b bg-muted/20 px-5 py-4 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                                <FileText className="h-5 w-5 text-primary" />
                            </div>

                            <div>
                                <h2 className="font-semibold tracking-tight">
                                    Historial de entradas
                                </h2>
                                <p className="text-xs text-muted-foreground">
                                    Facturas en las que se ha registrado este artículo.
                                </p>
                            </div>
                        </div>

                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">
                            <Package className="h-3.5 w-3.5" />
                            {entradas.length} {entradas.length === 1 ? 'registro' : 'registros'}
                        </span>
                    </div>

                    {/* LISTADO */}
                    {entradas.length > 0 ? (
                        <div className="space-y-3 p-4">
                            {entradas.map((detalle) => {
                                const entrada = detalle.entrada!;

                                return (
                                    <div
                                        key={detalle.id}
                                        className="group rounded-xl border bg-background p-4 transition-all hover:border-primary/30 hover:shadow-sm"
                                    >
                                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                            {/* INFORMACIÓN DE LA FACTURA */}
                                            <div className="min-w-0 flex-1 space-y-3">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                                            Factura registrada
                                                        </p>
                                                        <p className="truncate font-semibold text-foreground">
                                                            {entrada.numero_documento}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="grid gap-3 sm:grid-cols-3">
                                                    <div className="flex min-w-0 items-center gap-2">
                                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted/70">
                                                            <Truck className="h-4 w-4 text-muted-foreground" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-[11px] text-muted-foreground">
                                                                Proveedor
                                                            </p>
                                                            <p className="truncate text-xs font-medium">
                                                                {entrada.proveedor?.nombre ?? 'Sin proveedor'}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex min-w-0 items-center gap-2">
                                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted/70">
                                                            <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-[11px] text-muted-foreground">
                                                                Fecha de entrada
                                                            </p>
                                                            <p className="truncate text-xs font-medium">
                                                                {formatoFecha(entrada.fecha)}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex min-w-0 items-center gap-2">
                                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted/70">
                                                            <User className="h-4 w-4 text-muted-foreground" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-[11px] text-muted-foreground">
                                                                Registrado por
                                                            </p>
                                                            <p className="truncate text-xs font-medium">
                                                                {entrada.usuario?.name ?? 'Usuario desconocido'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* CANTIDAD Y ACCIONES */}
                                            <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-3 lg:justify-end lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                                                <div className="flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2">
                                                    <Package className="h-4 w-4 text-primary" />
                                                    <div>
                                                        <p className="text-lg font-bold leading-none tabular-nums text-foreground">
                                                            {Number(detalle.cantidad)}
                                                        </p>
                                                        <p className="mt-1 text-[10px] text-muted-foreground">
                                                            {Number(detalle.cantidad) === 1 ? 'unidad' : 'unidades'}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    {/* DETALLE DEL ARTÍCULO */}
                                                    <Link
                                                        href={route('entradas.detalles.show', {
                                                            entrada: entrada.id,
                                                            detalle: detalle.id,
                                                        })}
                                                        title="Ver detalle del artículo"
                                                        className="inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-medium text-blue-600 transition-colors hover:border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                                                    >
                                                        <Package className="h-4 w-4" />
                                                        <span className="hidden sm:inline">
                                                            Ver artículo
                                                        </span>
                                                    </Link>

                                                    {/* FACTURA COMPLETA */}
                                                    <Link
                                                        href={route('entradas.show', entrada.id)}
                                                        title="Ver factura completa"
                                                        className="inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-medium transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                                                    >
                                                        <FileText className="h-4 w-4" />
                                                        <span className="hidden sm:inline">
                                                            Ver factura
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        /* ESTADO VACÍO */
                        <div className="flex flex-col items-center justify-center px-5 py-14 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                                <Package className="h-7 w-7 text-muted-foreground" />
                            </div>

                            <h3 className="mt-4 font-semibold">
                                Sin entradas registradas
                            </h3>

                            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                                Cuando registres una factura que incluya este artículo,
                                aparecerá aquí todo su historial de entradas.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </AppLayout>
    );
}