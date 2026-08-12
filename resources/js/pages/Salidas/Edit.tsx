import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { notify } from '@/lib/notify';
import Form from './Form';

interface Salida {
    id: number;
    fecha: string;
    motivo: string;
    observaciones: string | null;
}

interface Props {
    salida: Salida;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Salidas',
        href: '/salidas',
    },
    {
        title: 'Editar',
        href: '#',
    },
];

export default function Edit({ salida }: Props) {
    const form = useForm({
        fecha: salida.fecha,
        motivo: salida.motivo,
        observaciones: salida.observaciones ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        form.put(
            route('salidas.update', salida.id),
            {
                onSuccess: () =>
                    notify.success(
                        'Salida actualizada correctamente.'
                    ),

                onError: () =>
                    notify.error(
                        'No se pudo actualizar la salida.'
                    ),
            }
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar salida" />

            <div className="p-6">
                <h1 className="text-xl font-semibold mb-6">
                    Editar salida
                </h1>

                <Form
                    form={form}
                    submit={submit}
                    buttonText="Actualizar"
                />
            </div>
        </AppLayout>
    );
}