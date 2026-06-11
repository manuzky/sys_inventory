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

interface Props {
    personnels: Personnel[];
}

export default function Create({ personnels }: Props) {

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
                    onSubmit={submit}
                />

            </div>
        </AppLayout>
    );
}