import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/pagination';
import { Search, Plus, FilePenLine, Eye } from 'lucide-react';
import { Can } from '@/components/can';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface PaginatedArticulos {
    data: Articulo[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export interface Articulo {
    id: number;
    categoria_id: number;
    marca_id: number;
    referencia_id: number;
    nombre: string;
    modelo: string | null;
    descripcion: string | null;
    control_individual: boolean;
    maneja_serial: boolean;
    stock: string | number;
    stock_minimo: string | number;
    categoria: { id: number; nombre: string };
    marca: { id: number; nombre: string };
    referencia: { id: number; codigo: string };
}

interface DetalleFactura {
    id: number;
    cantidad: string | number;
    articulo: string;
}

interface Factura {
    id: number;
    numero_documento: string | null;
    fecha: string;
    proveedor: string;
    detalles_count: number;
    detalles: DetalleFactura[];
}

interface Props {
    articulos: PaginatedArticulos;
    facturas: Factura[];
    filters: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Entradas', href: '/entradas' },
];

export default function Index({ articulos, facturas, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [modalFacturas, setModalFacturas] = useState(false);
    const [busquedaFactura, setBusquedaFactura] = useState('');
    const [facturaSeleccionada, setFacturaSeleccionada] = useState<Factura | null>(null);

    const facturasFiltradas = useMemo(() => {
        const busqueda = busquedaFactura.trim().toLowerCase();

        if (!busqueda) return facturas;

        return facturas.filter((factura) =>
            (factura.numero_documento ?? '').toLowerCase().includes(busqueda) ||
            factura.proveedor.toLowerCase().includes(busqueda) ||
            factura.detalles.some((detalle) =>
                detalle.articulo.toLowerCase().includes(busqueda),
            ),
        );
    }, [facturas, busquedaFactura]);

    const handleSearch = () => {
        router.get(
            route('entradas.index'),
            { search },
            { preserveState: true, replace: true },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Entradas" />

            <div className="space-y-4 p-6">
                {/* ENCABEZADO */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-xl font-semibold">Entradas</h1>

                    <div className="flex flex-wrap gap-2">
                        <Can permission="entradas.edit">
                            <Button variant="outline" onClick={() => setModalFacturas(true)}>
                                <FilePenLine className="mr-2 h-4 w-4" />
                                Gestionar facturas
                            </Button>
                        </Can>

                        <Can permission="entradas.create">
                            <Button onClick={() => router.get(route('entradas.factura.create'))} >
                                <Plus className="mr-2 h-4 w-4" />
                                Agregar factura
                            </Button>
                        </Can>
                    </div>
                </div>

                {/* BÚSQUEDA DE ARTÍCULOS */}
                <div className="flex max-w-sm">
                    <Input
                        placeholder="Buscar artículo..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {if (e.key === 'Enter') handleSearch();}}
                        className="rounded-r-none"
                    />

                    <Button
                        type="button"
                        size="icon"
                        onClick={handleSearch}
                        className="rounded-l-none"
                        title="Buscar"
                    >
                        <Search className="h-4 w-4" />
                    </Button>
                </div>

                {/* TABLA DE ARTÍCULOS */}
                <DataTable columns={columns} data={articulos.data} />

                <Pagination links={articulos.links} />

                {/* MODAL DE FACTURAS */}
                <Dialog
                    open={modalFacturas}
                    onOpenChange={(abierto) => {
                        setModalFacturas(abierto);

                        if (!abierto) {
                            setBusquedaFactura('');
                            setFacturaSeleccionada(null);
                        }
                    }}
                >
                    <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-5xl">
                        <DialogHeader>
                            <DialogTitle>Gestión de facturas</DialogTitle>
                            <DialogDescription>
                                Consulta las facturas registradas, revisa sus
                                artículos o accede a su edición.
                            </DialogDescription>
                        </DialogHeader>

                        {/* BÚSQUEDA DE FACTURAS */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                autoFocus
                                placeholder="Buscar por número, proveedor o artículo..."
                                value={busquedaFactura}
                                onChange={(e) => setBusquedaFactura(e.target.value)}
                                className="pl-9"
                            />
                        </div>

                        {/* TABLA DE FACTURAS */}
                        {facturasFiltradas.length === 0 ? (
                            <p className="py-8 text-center text-sm text-muted-foreground">
                                {facturas.length === 0 ? 'No hay facturas registradas.' : 'No se encontraron facturas con esa búsqueda.'}
                            </p>
                        ) : (
                            <div className="overflow-x-auto rounded-md border">
                                <table className="w-full text-sm">
                                    <thead className="bg-muted/50">
                                        <tr className="border-b text-left">
                                            <th className="p-3">Documento</th>
                                            <th className="p-3">Proveedor</th>
                                            <th className="p-3">Fecha</th>
                                            <th className="p-3 text-center">Artículos</th>
                                            <th className="p-3 text-right">Acciones</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {facturasFiltradas.map((factura) => (
                                            <tr
                                                key={factura.id}
                                                className="border-b last:border-0"
                                            >
                                                <td className="p-3 font-medium">
                                                    {factura.numero_documento ?? 'Sin documento'}
                                                </td>

                                                <td className="p-3">
                                                    {factura.proveedor}
                                                </td>

                                                <td className="whitespace-nowrap p-3">
                                                    {factura.fecha ? factura.fecha.substring(0, 10) : '—'}
                                                </td>

                                                <td className="p-3 text-center">
                                                    {factura.detalles_count}
                                                </td>

                                                <td className="p-3">
                                                    <div className="flex justify-end gap-2">
                                                        {/* VER ARTÍCULOS */}
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            title="Ver artículos"
                                                            onClick={() => setFacturaSeleccionada(factura)}
                                                            className="
                                                                h-9 w-9 rounded-md border bg-background
                                                                text-blue-600
                                                                hover:border-blue-300
                                                                hover:bg-blue-50
                                                                hover:text-blue-700
                                                                transition-all duration-200
                                                                hover:scale-105
                                                            "
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>

                                                        {/* EDITAR FACTURA */}
                                                        <Can permission="entradas.edit">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                title="Editar factura"
                                                                onClick={() =>
                                                                    router.get(route('entradas.edit', factura.id))
                                                                }
                                                                className="
                                                                    h-9 w-9 rounded-md border bg-background
                                                                    text-amber-600
                                                                    hover:border-amber-300
                                                                    hover:bg-amber-50
                                                                    hover:text-amber-700
                                                                    transition-all duration-200
                                                                    hover:scale-105
                                                                "
                                                            >
                                                                <FilePenLine className="h-4 w-4" />
                                                            </Button>
                                                        </Can>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* DETALLES DE LA FACTURA SELECCIONADA */}
                        {facturaSeleccionada && (
                            <div className="space-y-3 rounded-lg border p-4">
                                <div className="flex items-center justify-between gap-3">
                                    <h3 className="font-semibold">
                                        Artículos de la factura{' '}
                                        {facturaSeleccionada.numero_documento ?? `#${facturaSeleccionada.id}`}
                                    </h3>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="
                                            border border-red-200 bg-background
                                            text-red-600
                                            hover:border-red-300
                                            hover:bg-red-50
                                            hover:text-red-700
                                            transition-all duration-200
                                        "
                                        onClick={() => setFacturaSeleccionada(null)}
                                    >
                                        Cerrar detalles
                                    </Button>
                                </div>

                                {facturaSeleccionada.detalles.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">
                                        No hay detalles disponibles para esta factura.
                                    </p>
                                ) : (
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        {facturaSeleccionada.detalles.map((detalle) => (
                                            <div
                                                key={detalle.id}
                                                className="flex items-center justify-between gap-3 rounded-md border bg-muted/40 p-3"
                                            >
                                                <span className="font-medium">
                                                    {detalle.articulo}
                                                </span>

                                                <span className="shrink-0 whitespace-nowrap text-sm text-muted-foreground">
                                                    Cantidad: {Number(detalle.cantidad)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}