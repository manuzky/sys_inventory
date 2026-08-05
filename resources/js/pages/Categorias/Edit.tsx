import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { notify } from '@/lib/notify';
import Form from './Form';

interface Categoria {
    id: number;
    nombre: string;
    descripcion: string | null;
    estado: boolean;
}

interface Props {
    categoria: Categoria;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categorías',
        href: '/categorias',
    },
    {
        title: 'Editar',
        href: '#',
    },
];

export default function Edit({ categoria }: Props) {

    const form = useForm({
        nombre: categoria.nombre,
        descripcion: categoria.descripcion ?? '',
        estado: categoria.estado,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        form.put(route('categorias.update', categoria.id), {
            onSuccess: () => notify.success('Categoría actualizada correctamente.'),
            onError: () => notify.error('No se pudo actualizar la categoría.'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar categoría" />

            <div className="p-6">

                <h1 className="text-xl font-semibold mb-6">
                    Editar categoría
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