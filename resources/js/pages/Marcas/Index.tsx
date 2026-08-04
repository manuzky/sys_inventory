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

interface PaginatedMarcas {
    data: Marca[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface Marca {
    id: number;
    nombre: string;
    descripcion: string | null;
    estado: boolean;
}

interface Props {
    marcas: PaginatedMarcas;
    filters: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Marcas',
        href: '/marcas',
    },
];

export default function Index({ marcas, filters }: Props) {

    const [search, setSearch] = useState(
        filters.search ?? ''
    );

    const handleSearch = () => {
        router.get(
            route('marcas.index'),
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
            <Head title="Marcas" />
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">

                    <h1 className="text-xl font-semibold">
                        Marcas
                    </h1>

                    <Can permission="marcas.create">
                        <Link href={route('marcas.create')}>
                            <Button>
                                Nueva marca
                            </Button>
                        </Link>
                    </Can>
                </div>

                <div className="flex max-w-sm">
                    <Input
                        placeholder="Buscar marca..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
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
                    data={marcas.data}
                />

                <Pagination
                    links={marcas.links}
                />
            </div>
        </AppLayout>
    );
}