import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import Form from './Form';

interface Articulo {
    id: number;
    referencia_id: number;
    tipo_articulo: string;
    nombre: string;
    modelo: string | null;
    control_individual: boolean;
    maneja_serial: boolean;
    stock: string | number;
    referencia: {
        id: number;
        codigo: string;
    };
    marca: {
        id: number;
        nombre: string;
    };
}

interface Proveedor {
    id: number;
    nombre: string;
}

interface Ubicacion {
    id: number;
    nombre: string;
}

interface EstadoArticulo {
    id: number;
    nombre: string;
}

interface Props {
    articulo: Articulo;
    proveedores: Proveedor[];
    ubicaciones: Ubicacion[];
    estados: EstadoArticulo[];
}

export default function Create({
    articulo,
    proveedores,
    ubicaciones,
    estados,
}: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Entradas',
            href: '/entradas',
        },
        {
            title: 'Nueva entrada',
            href: `/entradas/create?articulo_id=${articulo.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nueva entrada" />

            <div className="p-6 space-y-6">
                <div>
                    <h1 className="text-xl font-semibold">
                        Nueva entrada
                    </h1>

                    <p className="text-sm text-muted-foreground mt-1">
                        Registre una nueva entrada para el artículo seleccionado.
                    </p>
                </div>

                <Form
                    articulo={articulo}
                    proveedores={proveedores}
                    ubicaciones={ubicaciones}
                    estados={estados}
                />
            </div>
        </AppLayout>
    );
}