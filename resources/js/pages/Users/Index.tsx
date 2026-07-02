import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Can } from '@/components/can';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/pagination';

interface PaginatedUsers {
    data: User[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string | null;
    active: boolean;

    personnel: {
        id: number;
        first_name: string;
        last_name: string;
    } | null;
}

interface Props {
    users: PaginatedUsers;
    filters: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usuarios',
        href: '/users',
    },
];

export default function Index({ users, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                route('users.index'),
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
            <Head title="Usuarios" />

            <div className="p-6 space-y-4">

                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">
                        Usuarios
                    </h1>

                    <Can permission='users.create'>
                        <Link href={route('users.create')}>
                            <Button>
                                Nuevo usuario
                            </Button>
                        </Link>
                    </Can>
                </div>

                <Input
                    placeholder="Buscar usuario..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />

                <DataTable columns={columns} data={users.data} />
                <Pagination links={users.links} />

            </div>
        </AppLayout>
    );
}