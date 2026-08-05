import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { notify } from '@/lib/notify';
import Form from './Form';

interface Marca {
    id: number;
    nombre: string;
    descripcion: string | null;
    estado: boolean;
}

interface Props {
    marca: Marca;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Marcas',
        href: '/marcas',
    },
    {
        title: 'Editar',
        href: '#',
    },
];

export default function Edit({ marca }: Props) {
    const form = useForm({
        nombre: marca.nombre,
        descripcion: marca.descripcion ?? '',
        estado: marca.estado,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.put(
            route(
                'marcas.update',
                marca.id
            ),
            {
                onSuccess: () => { notify.success( "Marca actualizada correctamente." ); },
                onError: () => { notify.error( "No se pudo actualizar la marca." ); },
            }
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar marca" />
            <div className="p-6">
                <h1 className="text-xl font-semibold mb-6">
                    Editar marca
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