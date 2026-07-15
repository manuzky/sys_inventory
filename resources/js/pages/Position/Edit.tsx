import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { notify } from '@/lib/notify';
import Form from './Form';
import { Info } from "lucide-react"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

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
        put(route('positions.update', position.id), {
            onSuccess: () => { notify.success('Cargo actualizado correctamente'); },
            onError: () => { notify.error('Ocurrió un error al actualizar el cargo'); },
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar cargo" />

            <div className="p-6 max-w-xl">
                <div className="flex items-center gap-2 mb-4 pl-2">
                    <h1 className="text-xl font-semibold">
                        Editar cargo
                    </h1>

                    <HoverCard openDelay={200}>
                        <HoverCardTrigger asChild>
                            <button
                                type="button"
                                className="text-red-500 hover:text-red-600 transition-colors"
                            >
                                <Info className="h-5 w-5" />
                            </button>
                        </HoverCardTrigger>

                        <HoverCardContent className="w-72">
                            <p className="text-sm text-muted-foreground">
                                Los campos marcados con{" "}
                                <span className="font-bold text-red-500">*</span>{" "}
                                son obligatorios.
                            </p>
                        </HoverCardContent>
                    </HoverCard>
                </div>

                <Form
                    data={data}
                    setData={setData}
                    submit={submit}
                    processing={processing}
                    errors={errors}
                    submitLabel="Actualizar"
                />
            </div>
        </AppLayout>
    );
}