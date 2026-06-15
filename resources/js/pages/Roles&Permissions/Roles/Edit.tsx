import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import Form from './Form';

interface Permission {
    id: number;
    name: string;
}

interface Role {
    id: number;
    name: string;
    permissions: Permission[];
}

interface Props {
    role: Role;
    permissions: Permission[];
}

export default function Edit({
    role,
    permissions,
}: Props) {

    return (
        <AppLayout>

            <Head title="Editar Rol" />

            <div className="p-6">

                <h1 className="text-xl font-semibold mb-6">
                    Editar Rol
                </h1>

                <Form
                    role={role}
                    permissions={permissions}
                />

            </div>

        </AppLayout>
    );
}