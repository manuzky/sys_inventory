import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

interface Permission {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
}

interface Role {
    id: number;
    name: string;
    permissions: Permission[];
    users?: User[];
}

interface Props {
    role: Role;
}

export default function Show({ role }: Props) {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Roles',
            href: '/roles',
        },
        {
            title: role.name,
            href: `/roles/${role.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ver Rol" />

            <div className="p-6 max-w-4xl">

                <h1 className="text-2xl font-bold mb-6">
                    Información del Rol
                </h1>

                <div className="border rounded-lg p-6 space-y-4">

                    <div>
                        <strong>ID:</strong>{' '}
                        {role.id}
                    </div>

                    <div>
                        <strong>Nombre:</strong>{' '}
                        {role.name}
                    </div>

                    <div>
                        <strong>Total de permisos:</strong>{' '}
                        {role.permissions.length}
                    </div>

                </div>

                <div className="mt-6">

                    <h2 className="text-lg font-semibold mb-3">
                        Permisos asignados
                    </h2>

                    <div className="space-y-3">

                        {role.permissions.length > 0 ? (
                            role.permissions.map((permission) => (
                                <div
                                    key={permission.id}
                                    className="border rounded p-3"
                                >
                                    {permission.name}
                                </div>
                            ))
                        ) : (
                            <div className="border rounded p-3">
                                Este rol no tiene permisos asignados.
                            </div>
                        )}

                    </div>

                </div>

            </div>
        </AppLayout>
    );
}