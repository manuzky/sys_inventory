import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { Can } from '@/components/can';
import { DataTable } from '@/components/data-table';
import { Pagination } from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { columns } from './columns';

interface Entrada {
    id: number;
    proveedores_id: number;
    fecha: string;
    tipo_documento: string;
    numero_documento: string;
    observacion: string | null;
    estado: boolean;
    proveedor: {
        id: number;
        nombre: string;
    } | null;
}

interface Props {
    entradas: {
        data: Entrada[];
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
    { title: 'Entradas', href: '/entradas' },
];

export default function Index({ entradas, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');

    const handleSearch = () => {
        router.get(route('entradas.index'), { search }, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Entradas" />

            <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Entradas</h1>

                    <Can permission="entradas.create">
                        <Link href={route('entradas.create')}>
                            <Button>Nueva entrada</Button>
                        </Link>
                    </Can>
                </div>

                <div className="flex max-w-sm">
                    <Input
                        placeholder="Buscar entrada..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        className="rounded-r-none"
                    />
                    <Button size="icon" onClick={handleSearch} className="rounded-l-none">
                        <Search className="h-4 w-4" />
                    </Button>
                </div>

                <DataTable columns={columns} data={entradas.data} />
                <Pagination links={entradas.links} />
            </div>
        </AppLayout>
    );
}