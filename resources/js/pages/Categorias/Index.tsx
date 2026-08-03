import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { type BreadcrumbItem, type Paginated } from '@/types';
import { Can } from '@/components/can';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/pagination';
import { Search } from 'lucide-react';

interface Categoria {
    id: number;
    nombre: string;
    descripcion: string | null;
    estado: boolean;
}

interface Props {
    categorias: Paginated<Categoria>;
    filters: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categorías',
        href: '/categorias',
    },
];

export default function Index({ categorias, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const handleSearch = () => {
        router.get(
            route('categorias.index'),
            { search },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categorías" />

            <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">
                        Categorías
                    </h1>
                    <Can permission="categorias.create">
                        <Link href={route('categorias.create')}>
                            <Button>
                                Nueva categoría
                            </Button>
                        </Link>
                    </Can>
                </div>

                <div className="flex max-w-sm">
                    <Input
                        placeholder="Buscar categoría..."
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
                    data={categorias.data}
                />

                <Pagination links={categorias.links} />
            </div>
        </AppLayout>
    );
}