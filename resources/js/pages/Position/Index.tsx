import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { Can } from '@/components/can';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { columns, Position } from './columns';
import { Pagination } from '@/components/pagination';

interface PaginatedPositions {
    data: Position[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface Props {
    positions: PaginatedPositions;
    filters: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cargos',
        href: '/positions',
    },
];

export default function Index({ positions, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                route('positions.index'),
                { search },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }, 300);

        return () => clearTimeout(timeout);
    }, [search]);
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cargos" />

            <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">
                        Cargos
                    </h1>

                    <Can permission="positions.create">
                        <Link href={route('positions.create')}>
                            <Button>
                                Nuevo cargo
                            </Button>
                        </Link>
                    </Can>
                </div>
                
                {/* Buscador */}
                <Input
                    placeholder="Buscar cargo..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />

                {/* Tabla */}
                <DataTable
                    columns={columns}
                    data={positions.data}
                />
                <Pagination links={positions.links} />
            </div>
        </AppLayout>
    );
}