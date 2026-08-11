import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Can } from '@/components/can';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/pagination';
import { Search } from 'lucide-react';

interface PaginatedArticulos {
    data: Articulo[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface Articulo {
    id: number;
    categoria_id: number;
    marca_id: number;
    unidad_medida_id: number;
    ubicacion_id: number;
    estado_id: number;
    tipo_articulo: string;
    codigo: string;
    codigo_patrimonial: string | null;
    serial: string | null;
    nombre: string;
    descripcion: string | null;
    cantidad: string | number;
    stock_minimo: string | number;
    fecha_adquisicion: string | null;
    categoria?: { nombre: string; };
    marca?: { nombre: string; };
    unidadMedida?: { nombre: string; abreviatura: string; };
    ubicacion?: { nombre: string; };
    estado?: { nombre: string; };
}

interface Props {
    articulos: PaginatedArticulos;
    filters: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Artículos',
        href: '/articulos',
    },
];

export default function Index({ articulos, filters }: Props) {

    const [search, setSearch] = useState(
        filters.search ?? ''
    );

    const handleSearch = () => {
        router.get(
            route('articulos.index'),
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
            <Head title="Artículos" />

            <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">
                        Artículos
                    </h1>

                    <Can permission="articulos.create">
                        <Link href={route('articulos.create')}>
                            <Button>
                                Nuevo artículo
                            </Button>
                        </Link>
                    </Can>
                </div>

                <div className="flex max-w-sm">
                    <Input
                        placeholder="Buscar artículo..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value) }
                        onKeyDown={(e) => { if (e.key === 'Enter') { handleSearch(); } }}
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
                    data={articulos.data}
                />

                <Pagination
                    links={articulos.links}
                />
            </div>
        </AppLayout>
    );
}