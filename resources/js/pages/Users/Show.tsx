import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

interface User {
    id: number;
    name: string;
    username: string;
    email: string | null;
    active: boolean;
    created_at: string;

    personnel: {
        id: number;
        first_name: string;
        last_name: string;
        email: string | null;
    } | null;
}

interface Props {
    user: User;
}

export default function Show({ user }: Props) {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Usuarios',
            href: '/users',
        },
        {
            title: user.username,
            href: `/users/${user.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ver Usuario" />

            <div className="p-6 max-w-4xl">

                <h1 className="text-2xl font-bold mb-6">
                    Información del Usuario
                </h1>

                <div className="border rounded-lg p-6 space-y-4">

                    <div>
                        <strong>Nombre:</strong> {user.name}
                    </div>

                    <div>
                        <strong>Usuario:</strong> {user.username}
                    </div>

                    <div>
                        <strong>Correo:</strong> {user.email ?? 'No registrado'}
                    </div>

                    <div>
                        <strong>Estado:</strong>{' '}
                        {user.active ? 'Activo' : 'Inactivo'}
                    </div>

                    <div>
                        <strong>Personal asociado:</strong>{' '}
                        {user.personnel
                            ? `${user.personnel.first_name} ${user.personnel.last_name}`
                            : 'Sin asignar'}
                    </div>

                    <div>
                        <strong>Fecha de creación:</strong>{' '}
                        {user.created_at}
                    </div>

                </div>

            </div>
        </AppLayout>
    );
}