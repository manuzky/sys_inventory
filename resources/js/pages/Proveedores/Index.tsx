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

interface Proveedor {
    id: number;
    nombre: string;
    rif: string;
    telefono: string | null;
    email: string | null;
    direccion: string | null;
    estado: boolean;
}

interface Props {
    proveedores: {
        data: Proveedor[];
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
        title: 'Proveedores',
        href: '/proveedores',
    },
];

export default function Index({ proveedores, filters }: Props) {

    const [search, setSearch] = useState(filters.search ?? '');

    const handleSearch = () => {
        router.get(
            route('proveedores.index'),
            { search },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Proveedores" />

            <div className="p-6 space-y-4">

                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">
                        Proveedores
                    </h1>

                    <Can permission="proveedores.create">
                        <Link href={route('proveedores.create')}>
                            <Button>
                                Nuevo proveedor
                            </Button>
                        </Link>
                    </Can>
                </div>

                <div className="flex max-w-sm">
                    <Input
                        placeholder="Buscar proveedor..."
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
                        className="rounded-l-none"
                        onClick={handleSearch}
                    >
                        <Search className="h-4 w-4" />
                    </Button>
                </div>

                <DataTable
                    columns={columns}
                    data={proveedores.data}
                />

                <Pagination
                    links={proveedores.links}
                />

            </div>
        </AppLayout>
    );
}