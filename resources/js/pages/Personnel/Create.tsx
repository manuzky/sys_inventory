import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { useState } from "react";
import Form from './Form';
import { notify } from '@/lib/notify';

interface Position {
    id: number;
    name: string;
}

interface EmergencyRelationship {
    id: number;
    name: string;
}

interface Props {
    positions: Position[];
    emergencyRelationships: EmergencyRelationship[];
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

export default function Create({ positions, emergencyRelationships }: Props) {
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [hireDate, setHireDate] = useState<Date | undefined>(undefined);

    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        document_type: 'V',
        id_number: '',
        email_local: '',
        email_domain: '@gmail.com',
        email_custom_domain: '',
        birth_date: '',
        gender: '',
        marital_status: '',
        phone_code: '0412',
        phone: '',
        secondary_phone_code: '0412',
        secondary_phone: '',
        emergency_contacts: [
            {
                relationship_id: '',
                name: '',
                phone_code: '0412',
                phone: '',
                secondary_phone: '',
            }
        ],
        address: '',
        hire_date: '',
        position_id: '',
        photo: null as File | null,
        curriculum: null as File | null,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();

        post(route('personnel.store'), {
            forceFormData: true,
            onSuccess: () => { notify.success('Personal creado correctamente'); },
            onError: () => { notify.error('Revisa los datos del formulario'); },
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Personal" />

            <div className="p-6 w-full space-y-6">

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
                    emergencyRelationships={emergencyRelationships}
                    currentPhoto={null}
                    onSubmit={submit}
                    submitLabel="Guardar"
                />
            </div>
        </AppLayout>
    );
}