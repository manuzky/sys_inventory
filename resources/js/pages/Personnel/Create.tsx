import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { useState } from "react";
import Form from './Form';

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

export default function Create() {
    const [date, setDate] = useState<Date | undefined>(undefined);

    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        id_number: '',
        email: '',
        birth_date: '',
        phone: '',
        address: '',
        gender: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();

        post(route('personnel.store'));
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
                    onSubmit={submit}
                    submitLabel="Guardar"
                />
            </div>
        </AppLayout>
    );
}