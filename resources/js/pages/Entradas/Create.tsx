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

interface Props {
    proveedores: Proveedor[];
    articulos: Articulo[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Entradas',
        href: '/entradas',
    },
    {
        title: 'Crear',
        href: '/entradas/create',
    },
];

export default function Create({
    proveedores,
    articulos,
}: Props) {

    const form = useForm({
        proveedores_id: 0,
        fecha: new Date().toISOString().split('T')[0],
        tipo_documento: '',
        numero_documento: '',
        observacion: '',
        estado: true,

        detalles: [
            {
                articulo_id: 0,
                cantidad: 1,
                costo: 0,
            },
        ] as {
            articulo_id: number;
            cantidad: number;
            costo: number;
        }[],
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        form.post(route('entradas.store'), {
            onSuccess: () => notify.success(
                'Entrada creada correctamente.'
            ),

            onError: () => notify.error(
                'No se pudo crear la entrada.'
            ),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nueva entrada" />

            <div className="p-6">
                <h1 className="text-xl font-semibold mb-6">
                    Nueva entrada
                </h1>

                <Form
                    form={form}
                    proveedores={proveedores}
                    articulos={articulos}
                    submit={submit}
                    buttonText="Guardar"
                />
            </div>
        </AppLayout>
    );
}