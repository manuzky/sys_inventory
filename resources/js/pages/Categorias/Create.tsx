import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { notify } from '@/lib/notify';
import Form from './Form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categorías',
        href: '/categorias',
    },
    {
        title: 'Crear',
        href: '/categorias/create',
    },
];

export default function Create() {

    const form = useForm({
        nombre: '',
        descripcion: '',
        estado: true,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        form.post(route('categorias.store'), {
            onSuccess: () => notify.success('Categoría creada correctamente.'),
            onError: () => notify.error('No se pudo crear la categoría.'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nueva categoría" />

            <div className="p-6">
                <h1 className="text-xl font-semibold mb-6">
                    Nueva categoría
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