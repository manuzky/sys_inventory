import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { useState } from 'react';
import Form from './Form';

interface Personnel {
    id: number;
    first_name: string;
    last_name: string;
    id_number: string;
    email: string;
    birth_date: string;
    phone: string | null;
    address: string | null;
    gender: string | null;
    position_id?: number | null;
}

interface Position {
    id: number;
    name: string;
    active: boolean;
}

interface Props {
    personnel: Personnel;
    positions: Position[]; 
    current_position_id?: number | null;
}

export default function Edit({ personnel, positions, current_position_id }: Props) {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Personal',
            href: '/personnel',
        },
        {
            title: 'Editar',
            href: `/personnel/${personnel.id}/edit`,
        },
    ];

    const [date, setDate] = useState<Date | undefined>(
        personnel.birth_date
            ? (() => {
                const [year, month, day] = personnel.birth_date.split('-').map(Number);

                return new Date(year, month - 1, day);
            })()
            : undefined
    );

    const { data, setData, put, processing, errors, } = useForm({
        first_name: personnel.first_name ?? '',
        last_name: personnel.last_name ?? '',
        id_number: personnel.id_number ?? '',
        email: personnel.email ?? '',
        birth_date: personnel.birth_date ?? '',
        phone: personnel.phone ?? '',
        address: personnel.address ?? '',
        gender: personnel.gender ?? '',

        position_id: current_position_id ?? '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();

        put(route('personnel.update', personnel.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Personal" />

            <div className="p-6 max-w-2xl space-y-6">

                <h1 className="text-xl font-semibold">
                    Editar Personal
                </h1>

                <Form
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    date={date}
                    setDate={setDate}
                    positions={positions}   // 👈 NUEVO
                    onSubmit={submit}
                    submitLabel="Actualizar"
                />

            </div>
        </AppLayout>
    );
}