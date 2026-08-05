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

interface Unidad {
    id: number;
    nombre: string;
    abreviatura: string;
    estado: boolean;
}

interface Props {
    unidades: {
        data: Unidad[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
    filters: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Unidades de Medida',
        href: '/unidades-medida',
    },
];

export default function Index({ unidades, filters }: Props) {

    const [search, setSearch] = useState(filters.search ?? '');

    const handleSearch = () => {
        router.get(
            route('unidades-medida.index'),
            { search },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Unidades de Medida" />

            <div className="p-6 space-y-4">

                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">
                        Unidades de Medida
                    </h1>

                    <Can permission="unidades-medida.create">
                        <Link href={route('unidades-medida.create')}>
                            <Button>
                                Nueva unidad
                            </Button>
                        </Link>
                    </Can>
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

                <Pagination links={unidades.links} />

            </div>
        </AppLayout>
    );
}