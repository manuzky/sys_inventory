import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { notify } from '@/lib/notify';
import Form from './Form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Unidades de Medida',
        href: '/unidades-medida',
    },
    {
        title: 'Crear',
        href: '/unidades-medida/create',
    },
];

export default function Create() {

    const form = useForm({
        nombre: '',
        abreviatura: '',
        estado: true,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        form.post(route('unidades-medida.store'), {
            onSuccess: () => {
                notify.success('Unidad creada correctamente.');
            },
            onError: () => {
                notify.error('No se pudo crear la unidad.');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nueva unidad de medida" />

            <div className="p-6">

                <h1 className="text-xl font-semibold mb-6">
                    Nueva unidad de medida
                </h1>

                <Form
                    form={form}
                    submit={submit}
                    buttonText="Guardar"
                />

            </div>
        </AppLayout>
    );
}