import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import Form from './Form';

interface Permission {
    id: number;
    name: string;
    display_name: string;
}

interface Props {
    permissions: Permission[];
}

export default function Create({
    permissions,
}: Props) {

    return (
        <AppLayout>

            <Head title="Crear Rol" />

            <div className="p-6">

                <h1 className="text-xl font-semibold mb-6">
                    Crear Rol
                </h1>

                <Form
                    permissions={permissions}
                    submitLabel="Guardar"
                />

            </div>

        </AppLayout>
    );
}