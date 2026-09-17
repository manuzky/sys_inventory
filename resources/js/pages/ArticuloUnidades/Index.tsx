import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { DataTable } from '@/components/data-table';
import { Pagination } from '@/components/pagination';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { columns } from './columns';
import { Search } from 'lucide-react';
import { useState } from 'react';

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

interface PaginatedUnidades {
    data: Unidad[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface Props {
    unidades: PaginatedUnidades;
    filters: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Unidades de artículos',
        href: '/articulo-unidades',
    },
];

export default function Index({ unidades, filters }: Props) {
    const [search, setSearch] = useState(
        filters.search ?? ''
    );

    const handleSearch = () => {
        router.get(
            route('articulo-unidades.index'),
            {
                search,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Unidades de artículos" />

            <div className="p-6 space-y-4">

                <div>
                    <h1 className="text-xl font-semibold">
                        Unidades de artículos
                    </h1>

                    <p className="text-sm text-muted-foreground mt-1">
                        Consulte las unidades físicas registradas en el inventario.
                    </p>
                </div>

                <div className="flex max-w-sm">
                    <Input
                        placeholder="Buscar unidad..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                        className="rounded-r-none"
                    />

                    <Button
                        size="icon"
                        onClick={handleSearch}
                        className="rounded-l-none"
                        title="Buscar"
                    >
                        <Search className="h-4 w-4" />
                    </Button>
                </div>

                <DataTable
                    columns={columns}
                    data={unidades.data}
                />

                <Pagination
                    links={unidades.links}
                />

            </div>
        </AppLayout>
    );
}