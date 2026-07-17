import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import Form from './Form';

interface Permission {
    id: number;
    name: string;
    display_name: string;
}

interface PermissionGroup {
    name: string;
    permissions: Permission[];
}

interface Role {
    id: number;
    name: string;
    permissions: Permission[];
}

interface Props {
    role: Role;
    permissionGroups: PermissionGroup[];
}

export default function Edit({
    role,
    permissionGroups,
}: Props) {

    return (
        <AppLayout>

            <Head title="Editar Rol" />

            <div className="p-6">

                <Form
                    role={role}
                    permissionGroups={permissionGroups}
                    submitLabel="Actualizar"
                />

            </div>

        </AppLayout>
    );
}