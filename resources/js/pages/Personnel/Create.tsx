import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { useState } from "react";
import Form from './Form';

interface Position {
    id: number;
    name: string;
}

interface Props {
    positions: Position[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Personal',
        href: '/personnel',
    },
    {
        title: 'Crear',
        href: '/personnel/create',
    },
];

export default function Create({ positions }: Props) {
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [hireDate, setHireDate] = useState<Date | undefined>(undefined);

    const { data, setData, post, processing, errors } = useForm({
        // Datos personales
        first_name: '',
        last_name: '',

        // Documento
        document_type: 'V',
        id_number: '',

        // Correo
        email_local: '',
        email_domain: '@gmail.com',
        email_custom_domain: '',

        // Fecha nacimiento
        birth_date: '',

        // Sexo
        gender: '',

        // Estado civil
        marital_status: '',

        // Teléfono principal
        phone_code: '0412',
        phone: '',

        // Teléfono secundario
        secondary_phone_code: '0412',
        secondary_phone: '',

        // Dirección
        address: '',

        // Laboral
        hire_date: '',
        position_id: '',

        // Archivos
        photo: null as File | null,
        curriculum: null as File | null,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();

        post(route('personnel.store'), {
            forceFormData: true,
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Personal" />

            <div className="p-6 max-w-2xl space-y-6">
                <h1 className="text-xl font-semibold">
                    Crear Personal
                </h1>

                <Form
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}

                    date={date}
                    setDate={setDate}

                    hireDate={hireDate}
                    setHireDate={setHireDate}

                    positions={positions}

                    currentPhoto={null}

                    onSubmit={submit}

                    submitLabel="Guardar"
                />
            </div>
        </AppLayout>
    );
}