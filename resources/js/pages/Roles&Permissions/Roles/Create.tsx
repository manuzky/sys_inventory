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

interface Props {
    permissionGroups: PermissionGroup[];
}

export default function Create({
    permissionGroups,
}: Props) {

    return (
        <AppLayout>

            <Head title="Crear Rol" />

            <div className="p-6">

                <Form
                    permissionGroups={permissionGroups}
                    submitLabel="Crear Rol"
                />

            </div>

        </AppLayout>
    );
}