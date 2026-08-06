import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { notify } from '@/lib/notify';
import Form from './Form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Proveedores',
        href: '/proveedores',
    },
    {
        title: 'Crear',
        href: '/proveedores/create',
    },
];

export default function Create() {

    const form = useForm({
        nombre: '',
        rif: '',
        telefono: '',
        email: '',
        direccion: '',
        estado: true,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        form.post(route('proveedores.store'), {
            onSuccess: () => {
                notify.success('Proveedor creado correctamente.');
            },
            onError: () => {
                notify.error('No se pudo crear el proveedor.');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nuevo proveedor" />

            <div className="p-6">
                <h1 className="text-xl font-semibold mb-6">
                    Nuevo proveedor
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