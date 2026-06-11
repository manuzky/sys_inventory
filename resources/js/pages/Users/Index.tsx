import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { Button } from '@/components/ui/button';

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
    users: User[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usuarios',
        href: '/users',
    },
];

export default function Index({ users }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuarios" />

            <div className="p-6 space-y-4">

                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">
                        Usuarios
                    </h1>

                    <Link href={route('users.create')}>
                        <Button>
                            Nuevo usuario
                        </Button>
                    </Link>
                </div>

                <DataTable columns={columns} data={users} />

            </div>
        </AppLayout>
    );
}