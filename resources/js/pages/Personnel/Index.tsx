import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';

import { DataTable } from '@/components/data-table';
import { columns } from './columns';

interface Personnel {
    id: number;
    first_name: string;
    last_name: string;
    id_number: string;
    email: string;
    status: string;
}

interface Props {
    personnels: Personnel[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Personal',
        href: '/personnel',
    },
];

export default function Index({ personnels }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Personal" />
            <Link
                href={route('personnel.create')}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                Nuevo Personal
            </Link>

            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">
                        Personal
                    </h1>
                </div>

                <DataTable columns={columns} data={personnels} />
            </div>
        </AppLayout>
    );
}