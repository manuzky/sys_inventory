import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

import { DataTable } from '@/components/data-table';
import { columns, type Role } from './columns';
import { Button } from '@/components/ui/button';
import { Can } from '@/components/can';

interface Props {
    roles: Role[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
];

export default function Index({ roles }: Props) {
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

                <DataTable
                    columns={columns}
                    data={roles}
                />

            </div>
        </AppLayout>
    );
}