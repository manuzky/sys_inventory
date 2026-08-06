import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { notify } from '@/lib/notify';
import Form from './Form';

interface Ubicacion {
    id: number;
    nombre: string;
    descripcion: string | null;
    estado: boolean;
}

interface Props {
    ubicacion: Ubicacion;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ubicaciones',
        href: '/ubicaciones',
    },
    {
        title: 'Editar',
        href: '#',
    },
];

export default function Edit({ ubicacion }: Props) {
    const form = useForm({
        nombre: ubicacion.nombre,
        descripcion: ubicacion.descripcion ?? '',
        estado: ubicacion.estado,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        form.put(route('ubicaciones.update', ubicacion.id), {
            onSuccess: () => {
                notify.success('Ubicación actualizada correctamente.');
            },
            onError: () => {
                notify.error('No se pudo actualizar la ubicación.');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar ubicación" />

            <div className="p-6">
                <h1 className="text-xl font-semibold mb-6">
                    Editar ubicación
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