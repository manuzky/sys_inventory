import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { Can } from '@/components/can';

import { columns, Position } from './columns';

interface Props {
    positions: Position[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cargos',
        href: '/positions',
    },
];

export default function Index({ positions }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cargos" />

            <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">
                        Cargos
                    </h1>

                    <Can permission="positions.create">
                        <Link href={route('positions.create')}>
                            <Button>
                                Nuevo cargo
                            </Button>
                        </Link>
                    </Can>
                </div>

                <DataTable
                    columns={columns}
                    data={positions}
                />
            </div>
        </AppLayout>
    );
}