import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { useEffect, useState } from 'react';
import { Can } from '@/components/can';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Personnel {
    id: number;
    first_name: string;
    last_name: string;
    document_type: string;
    id_number: string;
    email: string;
    status: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    personnels: {
        data: Personnel[];
        current_page: number;
        last_page: number;
        links: PaginationLink[];
    };

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
    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                route('personnel.index'),
                {
                    search,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );

        }, 400);
        return () => clearTimeout(timer);
    }, [search]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Personal" />
            <div className="p-6 space-y-6">

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
                <Input
                    placeholder="Buscar por nombre, apellido, cédula o correo..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* Tabla */}
                <DataTable
                    columns={columns}
                    data={personnels.data}
                />

                {/* Paginación */}
                <div className="flex justify-center gap-2 flex-wrap">
                    {personnels.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url ?? '#'}
                            preserveScroll
                            className={`px-3 py-2 rounded border text-sm transition
                                ${ link.active
                                        ? 'bg-primary text-primary-foreground'
                                        : ''
                                }
                                ${ !link.url
                                        ? 'pointer-events-none opacity-50'
                                        : 'hover:bg-muted'
                                }
                            `}
                            dangerouslySetInnerHTML={{
                                __html: link.label,
                            }}
                        />
                    ))}
                </div>

            </div>
        </AppLayout>
    );
}