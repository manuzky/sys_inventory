import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { DataTable } from '@/components/data-table';
import { columns, type Role } from './columns';
import { Button } from '@/components/ui/button';
import { Can } from '@/components/can';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/pagination';

interface PaginatedRoles {
    data: Role[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface Props {
    roles: PaginatedRoles;
    filters: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
];

export default function Index({ roles, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const handleSearch = (value: string) => {
        router.get(
            route('roles.index'),
            { search: value },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />

            <div className="p-6 space-y-4">

                <div className="flex justify-between items-center">

                    <div className="flex items-center gap-2">
                        <Link href={route('roles.index')}>
                            <Button
                                variant="default"
                                size="sm"
                            >
                                Roles
                            </Button>
                        </Link>

                        <Can permission='permissions.view'>
                            <Link href={route('permissions.index')}>
                                <Button
                                    variant="outline"
                                    size="sm"
                                >
                                    Permisos
                                </Button>
                            </Link>
                        </Can>
                    </div>

                    <Can permission='roles.create'>
                        <Link href={route('roles.create')}>
                            <Button>
                                Nuevo rol
                            </Button>
                        </Link>
                    </Can>

                </div>

                <Input
                    placeholder="Buscar rol..."
                    value={search}
                    onChange={(e) => {
                        const value = e.target.value;
                        setSearch(value);
                        handleSearch(value);
                    }}
                    className="max-w-sm"
                />

                <DataTable
                    columns={columns}
                    data={roles.data}
                />
                <Pagination links={roles.links}  />

            </div>
        </AppLayout>
    );
}