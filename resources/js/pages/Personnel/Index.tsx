import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Can } from '@/components/can';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { Button } from '@/components/ui/button';

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
            <div className="p-6 space-y-4">

                <div className="flex justify-between items-center">
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

                <DataTable columns={columns} data={personnels} />
            </div>
        </AppLayout>
    );
}