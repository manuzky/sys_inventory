import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ReferenciaForm from './Form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Referencias',
        href: '/referencias',
    },
    {
        title: 'Nueva referencia',
        href: '/referencias/create',
    },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nueva referencia" />

            <div className="p-6 space-y-6">
                {/* ENCABEZADO */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">
                            Nueva referencia
                        </h1>

                        <p className="text-sm text-muted-foreground mt-1">
                            Registra una nueva referencia para identificar artículos.
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

                <ReferenciaForm />
            </div>
        </AppLayout>
    );
}