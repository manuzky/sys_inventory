import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ReferenciaForm from './Form';

interface Referencia {
    id: number;
    codigo: string;
    descripcion: string | null;
    estado: boolean;
}

interface Props {
    referencia: Referencia;
}

export default function Edit({ referencia }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Referencias',
            href: '/referencias',
        },
        {
            title: 'Editar referencia',
            href: `/referencias/${referencia.id}/edit`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar ${referencia.codigo}`} />

            <div className="p-6 space-y-6">
                {/* ENCABEZADO */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">
                            Editar referencia
                        </h1>

                        <p className="text-sm text-muted-foreground mt-1">
                            Modifica la información de la referencia {referencia.codigo}.
                        </p>
                    </div>

                    <Link href={route('referencias.index')}>
                        <Button
                            variant="outline"
                            type="button"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Volver
                        </Button>
                    </Link>
                </div>

                <ReferenciaForm referencia={referencia} />
            </div>
        </AppLayout>
    );
}