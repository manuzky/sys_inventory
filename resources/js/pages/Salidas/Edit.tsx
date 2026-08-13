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

interface DetalleSalida {
    id: number;
    articulo_id: number;
    cantidad: number;
    articulo: {
        id: number;
        codigo: string;
        nombre: string;
        cantidad: number;
    };
}

interface Salida {
    id: number;
    fecha: string;
    motivo: string;
    observaciones: string | null;
    detalles: DetalleSalida[];
}

interface Props {
    salida: Salida;
    articulos: Articulo[];
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

export default function Edit({ salida, articulos }: Props) {
    const form = useForm({
        fecha: salida.fecha,
        motivo: salida.motivo,
        observaciones: salida.observaciones ?? '',
        detalles: salida.detalles.map((detalle) => ({
            articulo_id: detalle.articulo_id,
            cantidad: Number(detalle.cantidad),
        })),
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        form.put(route('salidas.update', salida.id), {
            onSuccess: () =>
                notify.success(
                    'Salida actualizada correctamente.'
                ),
            onError: () =>
                notify.error(
                    'No se pudo actualizar la salida.'
                ),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar salida #${salida.id}`} />

            <div className="p-6">
                <h1 className="text-xl font-semibold mb-6">
                    Editar salida #{salida.id}
                </h1>

                <Form
                    form={form}
                    articulos={articulos}
                    submit={submit}
                    buttonText="Actualizar"
                />
            </div>
        </AppLayout>
    );
}