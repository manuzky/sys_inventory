import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

import { FormCreate } from './Form';

interface Personnel {
    id: number;
    first_name: string;
    last_name: string;
    email: string | null;
}

interface Role {
    id: number;
    name: string;
}

interface Props {
    personnels: Personnel[];
    roles: Role[];
}

export default function Create({
    personnels,
    roles,
}: Props) {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Usuarios',
            href: '/users',
        },
        {
            title: 'Crear',
            href: '/users/create',
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        personnel_id: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        roles: [] as string[],
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route('users.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Usuario" />

            <div className="p-6 max-w-2xl space-y-6">

                <h1 className="text-xl font-semibold">
                    Crear Usuario
                </h1>

                <FormCreate
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    personnels={personnels}
                    roles={roles}
                    onSubmit={submit}
                />

            </div>
        </AppLayout>
    );
}