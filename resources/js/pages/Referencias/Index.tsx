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

interface PaginatedReferencias {
    data: Referencia[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface Referencia {
    id: number;
    codigo: string;
    descripcion: string | null;
    estado: boolean;
}

interface Props {
    referencias: PaginatedReferencias;
    filters: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Referencias',
        href: '/referencias',
    },
];

export default function Index({ referencias, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');

    const handleSearch = () => {
        router.get(
            route('referencias.index'),
            { search },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Referencias" />

            <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">
                        Referencias
                    </h1>

                    <Can permission="referencias.create">
                        <Link href={route('referencias.create')}>
                            <Button>
                                Nueva referencia
                            </Button>
                        </Link>
                    </Can>
                </div>

                <div className="flex max-w-sm">
                    <Input
                        placeholder="Buscar referencia..."
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
                    data={referencias.data}
                />

                <Pagination links={referencias.links} />
            </div>
        </AppLayout>
    );
}