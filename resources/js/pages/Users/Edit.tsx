import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { notify } from '@/lib/notify';

import { FormEdit } from './Form';

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
    roles: Role[];
    userRoles: string[];
}

export default function Edit({
    user,
    personnels,
    roles,
    userRoles,
}: Props) {

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
        personnel_id: user.personnel_id
            ? String(user.personnel_id)
            : '',

        username: user.username ?? '',
        email: user.personnel?.email ?? '',
        active: user.active ?? true,

        role: userRoles[0] ?? '',

        change_password: false,
        password: '',
        password_confirmation: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();

        put(route('users.update', user.id), {
            preserveScroll: true,
            onSuccess: () => { notify.success('Usuario actualizado correctamente'); },
            onError: () => { notify.error('Revisa los campos marcados'); },
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
                    roles={roles}
                    onSubmit={submit}
                    submitLabel="Actualizar"
                />

            </div>
        </AppLayout>
    );
}