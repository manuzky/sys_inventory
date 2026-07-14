import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Form } from './Form';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        display_name: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route('permissions.store'));
    }

    return (
        <AppLayout>
            <Head title="Crear permiso" />

            <div className="p-6 max-w-xl">
                <h1 className="text-xl font-semibold mb-4">
                    Crear permiso
                </h1>

                <Form
                    data={data}
                    setData={setData}
                    processing={processing}
                    errors={errors}
                    onSubmit={submit}
                    submitLabel="Guardar"
                />
            </div>
        </AppLayout>
    );
}