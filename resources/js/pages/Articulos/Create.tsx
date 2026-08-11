import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { notify } from '@/lib/notify';
import Form from './Form';

interface Props {
    categorias: {
        id: number;
        nombre: string;
    }[];

    marcas: {
        id: number;
        nombre: string;
    }[];

    unidadesMedida: {
        id: number;
        nombre: string;
        abreviatura: string;
    }[];

    ubicaciones: {
        id: number;
        nombre: string;
    }[];

    estadosArticulo: {
        id: number;
        nombre: string;
    }[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Artículos',
        href: '/articulos',
    },
    {
        title: 'Nuevo',
        href: '#',
    },
];

export default function Create({
    categorias,
    marcas,
    unidadesMedida,
    ubicaciones,
    estadosArticulo,
}: Props) {

    const form = useForm({
        categoria_id: '',
        marca_id: '',
        unidad_medida_id: '',
        ubicacion_id: '',
        estado_id: '',
        tipo_articulo: '',
        codigo: '',
        codigo_patrimonial: '',
        serial: '',
        nombre: '',
        descripcion: '',
        cantidad: '',
        stock_minimo: '',
        fecha_adquisicion: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        form.post(route('articulos.store'), {
            onSuccess: () => {
                notify.success(
                    'Artículo creado correctamente.'
                );
            },

            onError: () => {
                notify.error(
                    'No se pudo crear el artículo.'
                );
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nuevo artículo" />

            <div className="p-6">
                <h1 className="text-xl font-semibold mb-6">
                    Nuevo artículo
                </h1>

                <Form
                    form={form}
                    submit={submit}
                    buttonText="Guardar"
                    categorias={categorias}
                    marcas={marcas}
                    unidadesMedida={unidadesMedida}
                    ubicaciones={ubicaciones}
                    estadosArticulo={estadosArticulo}
                />
            </div>
        </AppLayout>
    );
}