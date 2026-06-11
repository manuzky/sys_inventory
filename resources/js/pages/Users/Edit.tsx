import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

import { FormEdit } from './Form';

interface Personnel {
    id: number;
    first_name: string;
    last_name: string;
    email: string | null;
}

interface User {
    id: number;
    username: string;
    personnel_id: number | null;
    active: boolean;

    personnel: {
        id: number;
        first_name: string;
        last_name: string;
        email: string | null;
    } | null;
}

interface Props {
    user: User;
    personnels: Personnel[];
}

export default function Edit({ user, personnels }: Props) {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Usuarios',
            href: '/users',
        },
        {
            title: 'Editar',
            href: `/users/${user.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        personnel_id: user.personnel_id ? String(user.personnel_id) : '',
        username: user.username ?? '',
        email: user.personnel?.email ?? '',
        active: user.active ?? true,

        change_password: false,
        password: '',
        password_confirmation: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();

        put(route('users.update', user.id), {
            preserveScroll: true,
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Usuario" />

            <div className="p-6 max-w-2xl space-y-6">

                <h1 className="text-xl font-semibold">
                    Editar Usuario
                </h1>

                <FormEdit
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    personnels={personnels}
                    onSubmit={submit}
                    submitLabel="Actualizar"
                />

            </div>
        </AppLayout>
    );
}