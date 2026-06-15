import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

interface Permission {
    id: number;
    name: string;
}

interface Props {
    permissions: Permission[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Permisos',
        href: '/permissions',
    },
];

export default function Index({ permissions }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permisos" />

            <div className="p-6 space-y-4">

            <div className="flex justify-between items-center">

                <div className="flex items-center gap-2">
                    <Link href={route('roles.index')}>
                        <Button
                            variant="outline"
                            size="sm"
                        >
                            Roles
                        </Button>
                    </Link>

                    <Link href={route('permissions.index')}>
                        <Button
                            variant="default"
                            size="sm"
                        >
                            Permisos
                        </Button>
                    </Link>
                </div>

                <Link href={route('permissions.create')}>
                    <Button>
                        Nuevo permiso
                    </Button>
                </Link>

            </div>

                <DataTable columns={columns} data={permissions} />
            </div>
        </AppLayout>
    );
}