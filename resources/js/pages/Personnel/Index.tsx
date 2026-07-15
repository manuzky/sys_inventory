import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { useEffect, useState } from 'react';
import { Can } from '@/components/can';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/pagination';
import { Search } from 'lucide-react';

interface PaginatedPersonnels {
    data: Personnel[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface Personnel {
    id: number;
    first_name: string;
    last_name: string;
    document_type: string;
    id_number: string;
    email: string;
    status: string;
}

interface Props {
    personnels: PaginatedPersonnels;
    filters: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Personal',
        href: '/personnel',
    },
];

export default function Index({ personnels, filters, }: Props) {

    const [search, setSearch] = useState(filters.search ?? '');
    const handleSearch = () => {
        router.get(
            route('personnel.index'),
            { search },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Personal" />
            <div className="p-6 space-y-4">

                {/* Encabezado */}
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">
                        Personal
                    </h1>
                    <Can permission="personnel.create">
                        <Link href={route('personnel.create')}>
                            <Button>
                                Nuevo personal
                            </Button>
                        </Link>
                    </Can>
                </div>

                {/* Buscador */}
                <div className="flex max-w-sm">
                    <Input
                        placeholder="Buscar personal..."
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

                {/* Tabla */}
                <DataTable
                    columns={columns}
                    data={personnels.data}
                />

                {/* Paginación */}
                <Pagination links={personnels.links} />

            </div>
        </AppLayout>
    );
}