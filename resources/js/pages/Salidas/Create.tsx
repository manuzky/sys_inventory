import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { notify } from '@/lib/notify';
import Form from './Form';

interface Articulo {
    id: number;
    codigo: string;
    nombre: string;
    cantidad: number;
}

interface Props {
    articulos: Articulo[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Salidas',
        href: '/salidas',
    },
    {
        title: 'Crear',
        href: '/salidas/create',
    },
];

export default function Create({ articulos }: Props) {
    const form = useForm({
        fecha: new Date().toISOString().split('T')[0],
        motivo: '',
        observaciones: '',
        detalles: [
            {
                articulo_id: 0,
                cantidad: 1,
            },
        ],
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        form.post(route('salidas.store'), {
            onSuccess: () =>
                notify.success('Salida creada correctamente.'),
            onError: () =>
                notify.error('No se pudo crear la salida.'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nueva salida" />

            <div className="p-6">
                <h1 className="text-xl font-semibold mb-6">
                    Nueva salida
                </h1>

                <Form
                    form={form}
                    articulos={articulos}
                    submit={submit}
                    buttonText="Guardar"
                />
            </div>
        </AppLayout>
    );
}