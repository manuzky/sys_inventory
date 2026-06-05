import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

interface Personnel {
    id: number;
    first_name: string;
    last_name: string;
    id_number: string;
    email: string;
    birth_date: string;
    phone: string | null;
    address: string | null;
    gender: string;
    status: string;
}

interface Props {
    personnel: Personnel;
}

export default function Show({ personnel }: Props) {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Personal',
            href: '/personnel',
        },
        {
            title: personnel.first_name,
            href: `/personnel/${personnel.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ver Personal" />

            <div className="p-6 max-w-4xl">

                <h1 className="text-2xl font-bold mb-6">
                    Información del Personal
                </h1>

                <div className="border rounded-lg p-6 space-y-4">

                    <div>
                        <strong>Nombre:</strong>{' '}
                        {personnel.first_name}
                    </div>

                    <div>
                        <strong>Apellido:</strong>{' '}
                        {personnel.last_name}
                    </div>

                    <div>
                        <strong>Cédula:</strong>{' '}
                        {personnel.id_number}
                    </div>

                    <div>
                        <strong>Correo:</strong>{' '}
                        {personnel.email}
                    </div>

                    <div>
                        <strong>Fecha de nacimiento:</strong>{' '}
                        {personnel.birth_date}
                    </div>

                    <div>
                        <strong>Sexo:</strong>{' '}
                        {personnel.gender === 'male'
                            ? 'Masculino'
                            : 'Femenino'}
                    </div>

                    <div>
                        <strong>Teléfono:</strong>{' '}
                        {personnel.phone ?? 'No registrado'}
                    </div>

                    <div>
                        <strong>Dirección:</strong>{' '}
                        {personnel.address ?? 'No registrada'}
                    </div>

                    <div>
                        <strong>Estado:</strong>{' '}
                        {personnel.status}
                    </div>

                </div>

            </div>
        </AppLayout>
    );
}