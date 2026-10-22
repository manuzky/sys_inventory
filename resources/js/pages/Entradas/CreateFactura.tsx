import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import FormFactura from '@/pages/Entradas/FormFactura';

interface Articulo {
    id: number;
    nombre: string;
    modelo: string | null;
    control_individual: boolean;
    maneja_serial: boolean;
    stock: string | number;
    referencia: {
        id: number;
        codigo: string;
    } | null;
    marca: {
        id: number;
        nombre: string;
    };
    categoria: {
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
    articulos: Articulo[];
    proveedores: Proveedor[];
    ubicaciones: Ubicacion[];
    estados: EstadoArticulo[];
    siguientesNumeros: Record<string, number>;
}

export default function CreateFactura({ articulos, proveedores, ubicaciones, estados, siguientesNumeros, }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Entradas',
            href: '/entradas',
        },
        {
            title: 'Entrada múltiple',
            href: '/entradas/create-factura',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Entrada múltiple" />

            <div className="p-6 space-y-6">
                <div>
                    <h1 className="text-xl font-semibold">
                        Entrada múltiple
                    </h1>

                    <p className="text-sm text-muted-foreground mt-1">
                        Registre varios artículos pertenecientes a una misma factura.
                    </p>
                </div>

                <FormFactura
                    articulos={articulos}
                    proveedores={proveedores}
                    ubicaciones={ubicaciones}
                    estados={estados}
                    siguientesNumeros={siguientesNumeros}
                />
            </div>
        </AppLayout>
    );
}