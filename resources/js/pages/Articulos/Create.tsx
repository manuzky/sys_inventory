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

interface Referencia {
    id: number;
    codigo: string;
    descripcion: string | null;
}

interface Props {
    categorias: Categoria[];
    marcas: Marca[];
    unidadesMedida: UnidadMedida[];
    referencias: Referencia[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Artículos',
        href: '/articulos',
    },
    {
        title: 'Nuevo artículo',
        href: '/articulos/create',
    },
];

export default function Create({
    categorias,
    marcas,
    unidadesMedida,
    referencias,
}: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nuevo artículo" />

            <div className="p-6 space-y-6">
                {/* ENCABEZADO */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">
                            Nuevo artículo
                        </h1>

                        <p className="text-sm text-muted-foreground mt-1">
                            Registra un nuevo artículo en el inventario.
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
                    categorias={categorias}
                    marcas={marcas}
                    unidadesMedida={unidadesMedida}
                    referencias={referencias}
                />
            </div>
        </AppLayout>
    );
}