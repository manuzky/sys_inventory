import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { notify } from '@/lib/notify';
import Form from './Form';

interface Articulo {
    id: number;
    categoria_id: number;
    marca_id: number;
    unidad_medida_id: number;
    ubicacion_id: number;
    estado_id: number;
    tipo_articulo: string;
    codigo: string;
    codigo_patrimonial: string | null;
    serial: string | null;
    nombre: string;
    descripcion: string | null;
    cantidad: string | number;
    stock_minimo: string | number;
    fecha_adquisicion: string | null;
}

interface Props {
    articulo: Articulo;

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
        title: 'Editar',
        href: '#',
    },
];

export default function Edit({
    articulo,
    categorias,
    marcas,
    unidadesMedida,
    ubicaciones,
    estadosArticulo,
}: Props) {

    const form = useForm({
        categoria_id: String(articulo.categoria_id),
        marca_id: String(articulo.marca_id),
        unidad_medida_id: String(articulo.unidad_medida_id),
        ubicacion_id: String(articulo.ubicacion_id),
        estado_id: String(articulo.estado_id),
        tipo_articulo: articulo.tipo_articulo,
        codigo: articulo.codigo,
        codigo_patrimonial: articulo.codigo_patrimonial ?? '',
        serial: articulo.serial ?? '',
        nombre: articulo.nombre,
        descripcion: articulo.descripcion ?? '',
        cantidad: String(articulo.cantidad),
        stock_minimo: String(articulo.stock_minimo),
        fecha_adquisicion: articulo.fecha_adquisicion ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        form.put(
            route('articulos.update', articulo.id),
            {
                onSuccess: () => {
                    notify.success(
                        'Artículo actualizado correctamente.'
                    );
                },

                onError: () => {
                    notify.error(
                        'No se pudo actualizar el artículo.'
                    );
                },
            }
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar artículo" />

            <div className="p-6">
                <h1 className="text-xl font-semibold mb-6">
                    Editar artículo
                </h1>

                <Form
                    form={form}
                    submit={submit}
                    buttonText="Actualizar"
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