import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { notify } from '@/lib/notify';
import Form from './Form';

interface Proveedor {
    id: number;
    nombre: string;
}

interface Articulo {
    id: number;
    codigo: string;
    nombre: string;
    cantidad: number;
}

interface DetalleEntrada {
    id: number;
    articulo_id: number;
    cantidad: number;
    costo: number;
}

interface Entrada {
    id: number;
    proveedores_id: number;
    fecha: string;
    tipo_documento: string;
    numero_documento: string;
    observacion: string | null;
    estado: boolean;
    detalles: DetalleEntrada[];
}

interface Props {
    entrada: Entrada;
    proveedores: Proveedor[];
    articulos: Articulo[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Entradas',
        href: '/entradas',
    },
    {
        title: 'Editar',
        href: '#',
    },
];

export default function Edit({
    entrada,
    proveedores,
    articulos,
}: Props) {
    const form = useForm({
        proveedores_id: entrada.proveedores_id,
        fecha: entrada.fecha,
        tipo_documento: entrada.tipo_documento,
        numero_documento: entrada.numero_documento,
        observacion: entrada.observacion ?? '',
        estado: entrada.estado,

        detalles: entrada.detalles.map((detalle) => ({
            articulo_id: detalle.articulo_id,
            cantidad: Number(detalle.cantidad),
            costo: Number(detalle.costo),
        })),
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        form.put(route('entradas.update', entrada.id), {
            onSuccess: () =>
                notify.success(
                    'Entrada actualizada correctamente.'
                ),

            onError: () =>
                notify.error(
                    'No se pudo actualizar la entrada.'
                ),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar entrada #${entrada.id}`} />

            <div className="p-6">
                <h1 className="text-xl font-semibold mb-6">
                    Editar entrada #{entrada.id}
                </h1>

                <Form
                    form={form}
                    proveedores={proveedores}
                    articulos={articulos}
                    submit={submit}
                    buttonText="Actualizar"
                />
            </div>
        </AppLayout>
    );
}
