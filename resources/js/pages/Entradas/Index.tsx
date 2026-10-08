import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/pagination';
import { Search, Plus } from 'lucide-react';
import { Can } from '@/components/can';

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
    categoria: {
        id: number;
        nombre: string;
    };
    marca: {
        id: number;
        nombre: string;
    };
    referencia: {
        id: number;
        codigo: string;
    };
}

interface Props {
    articulos: PaginatedArticulos;
    filters: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Entradas',
        href: '/entradas',
    },
];

export default function Index({ articulos, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');

    const handleSearch = () => {
        router.get(
            route('entradas.index'),
            { search },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Entradas" />

            <div className="p-6 space-y-4">

                {/* ENCABEZADO */}
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">
                        Entradas
                    </h1>

                    <Can permission="entradas.create">
                        <Button onClick={() => router.get(route('entradas.factura.create'))} >
                            <Plus /> Entrada múltiple
                        </Button>
                    </Can>
                </div>

                {/* BÚSQUEDA */}
                <div className="flex max-w-sm">
                    <Input
                        placeholder="Buscar artículo..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') {handleSearch();} }}
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

                {/* TABLA */}
                <DataTable
                    columns={columns}
                    data={articulos.data}
                />

                {/* PAGINACIÓN */}
                <Pagination links={articulos.links} />

            </div>
        </AppLayout>
    );
}