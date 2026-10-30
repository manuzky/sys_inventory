import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import FormFactura from './FormFactura';

interface Props {
    entrada: any;
    articulos: any[];
    proveedores: any[];
    ubicaciones: any[];
    estados: any[];
    siguientesNumeros: Record<string, number>;
}

export default function Edit({ entrada, articulos, proveedores, ubicaciones, estados, siguientesNumeros, }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Entradas', href: '/entradas' },
        { title: `Factura #${entrada.id}`, href: `/entradas/${entrada.id}` },
        { title: 'Editar factura', href: `/entradas/${entrada.id}/edit` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar factura #${entrada.id}`} />

            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-xl font-semibold">
                        Editar factura #{entrada.id}
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Modifica los datos, artículos y unidades de esta factura.
                    </p>
                </div>

                <FormFactura
                    entrada={entrada}
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