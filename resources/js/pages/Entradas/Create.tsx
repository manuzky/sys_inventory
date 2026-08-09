import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { notify } from '@/lib/notify';
import Form from './Form';

interface Proveedor {
    id: number;
    nombre: string;
}

interface Props {
    proveedores: Proveedor[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Entradas', href: '/entradas' },
    { title: 'Crear', href: '/entradas/create' },
];

export default function Create({ proveedores }: Props) {
    const form = useForm({
        proveedores_id: 0,
        fecha: new Date().toISOString().split('T')[0],
        tipo_documento: '',
        numero_documento: '',
        observacion: '',
        estado: true,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        form.post(route('entradas.store'), {
            onSuccess: () => notify.success('Entrada creada correctamente.'),
            onError: () => notify.error('No se pudo crear la entrada.'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nueva entrada" />
            <div className="p-6">
                <h1 className="text-xl font-semibold mb-6">Nueva entrada</h1>
                <Form form={form} proveedores={proveedores} submit={submit} buttonText="Guardar" />
            </div>
        </AppLayout>
    );
}