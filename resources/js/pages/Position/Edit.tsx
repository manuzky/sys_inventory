import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

import Form from './Form';

interface Position {
    id: number;
    name: string;
    description: string | null;
    active: boolean;
}

interface Props {
    position: Position;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Cargos', href: '/positions' },
    { title: 'Editar', href: '#' },
];

export default function Edit({ position }: Props) {

    const { data, setData, put, processing, errors } = useForm({
        name: position.name ?? '',
        description: position.description ?? '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        put(route('positions.update', position.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar cargo" />

            <div className="p-6 max-w-xl">
                <h1 className="text-xl font-semibold mb-4">
                    Editar cargo
                </h1>

                <Form
                    data={data}
                    setData={setData}
                    submit={submit}
                    processing={processing}
                    errors={errors}
                />
            </div>
        </AppLayout>
    );
}