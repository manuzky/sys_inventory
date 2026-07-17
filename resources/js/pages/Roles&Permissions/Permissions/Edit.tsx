import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Form } from './Form';
import { notify } from '@/lib/notify';

export default function Edit({ permission }: any) {
    const { data, setData, put, processing, errors } = useForm({
        name: permission.name,
        display_name: permission.display_name,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();

        put(route('permissions.update', permission.id), {
            onSuccess: () => {
                notify.success('Permiso actualizado correctamente.');
            },
            onError: () => {
                notify.error('No se pudo actualizar el permiso.');
            },
        });
    }

    return (
        <AppLayout>
            <Head title="Editar permiso" />

            <div className="p-6 max-w-xl">
                <h1 className="text-xl font-semibold mb-4">
                    Editar permiso
                </h1>

                <Form
                    data={data}
                    setData={setData}
                    processing={processing}
                    errors={errors}
                    onSubmit={submit}
                    submitLabel="Actualizar"
                />
            </div>
        </AppLayout>
    );
}