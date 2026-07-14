import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { notify } from '@/lib/notify';

import Form from './Form';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Cargos', href: '/positions' },
    { title: 'Crear', href: '/positions/create' },
];

export default function Create() {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route('positions.store'), {
            forceFormData: true,
            onSuccess: () => { notify.success('Cargo creado correctamente'); },
            onError: () => { notify.error('Revisa los datos del formulario'); },
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear cargo" />

            <div className="p-6 max-w-xl">
                <h1 className="text-xl font-semibold mb-4">
                    Crear cargo
                </h1>

                <Form
                    data={data}
                    setData={setData}
                    submit={submit}
                    processing={processing}
                    errors={errors}
                    submitLabel="Guardar"
                />
            </div>
        </AppLayout>
    );
}