import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ArticuloForm from './Form';

interface Categoria {
    id: number;
    nombre: string;
}

interface Marca {
    id: number;
    nombre: string;
}

interface UnidadMedida {
    id: number;
    nombre: string;
}

interface Articulo {
    id: number;
    categoria_id: number;
    marca_id: number;
    unidad_medida_id: number;
    tipo_articulo: string;
    nombre: string;
    modelo: string | null;
    descripcion: string | null;
    control_individual: boolean;
    maneja_serial: boolean;
    stock: string | number;
    stock_minimo: string | number;
}

interface Props {
    articulo: Articulo;
    categorias: Categoria[];
    marcas: Marca[];
    unidadesMedida: UnidadMedida[];
}

export default function Edit({articulo, categorias, marcas, unidadesMedida,}: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Artículos',
            href: '/articulos',
        },
        {
            title: 'Editar artículo',
            href: route('articulos.edit', articulo.id),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar ${articulo.nombre}`} />

            <div className="p-6 space-y-6">

                {/* ENCABEZADO */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">
                            Editar artículo
                        </h1>

                        <p className="text-sm text-muted-foreground mt-1">
                            Modifica la información del artículo.
                        </p>
                    </div>

                    <Link href={route('articulos.index')}>
                        <Button variant="outline" type="button">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Volver
                        </Button>
                    </Link>
                </div>

                {/* FORMULARIO */}
                <ArticuloForm
                    articulo={articulo}
                    categorias={categorias}
                    marcas={marcas}
                    unidadesMedida={unidadesMedida}
                />
            </div>
        </AppLayout>
    );
}