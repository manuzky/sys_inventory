import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Can } from '@/components/can';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/pagination';
import { Search } from 'lucide-react';
import { useState } from 'react';

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

interface PaginatedSalidas {
    data: Salida[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface Props {
    salidas: PaginatedSalidas;
    filters: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Salidas',
        href: '/salidas',
    },
];

export default function Index({ salidas, filters }: Props) {
    const [search, setSearch] = useState(
        filters.search ?? ''
    );

    const handleSearch = () => {
        router.get(
            route('salidas.index'),
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
            <Head title="Salidas" />

            <div className="p-6 space-y-4">

                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">
                        Salidas
                    </h1>

                    <Can permission="salidas.create">
                        <Link href={route('salidas.create')}>
                            <Button>
                                Nueva salida
                            </Button>
                        </Link>
                    </Can>
                </div>

                <div className="flex max-w-sm">
                    <Input
                        placeholder="Buscar salida..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') {handleSearch();} }}
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
                    data={salidas.data}
                />

                <Pagination
                    links={salidas.links}
                />
            </div>
        </AppLayout>
    );
}