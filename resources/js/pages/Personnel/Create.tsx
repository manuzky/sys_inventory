import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Calendar } from "@/components/ui/calendar";
import { es } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useState } from "react";
import { DatePicker } from "@/components/ui/date-picker";

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

                <form onSubmit={submit} className="space-y-4">

                    {/* Nombre */}
                    <Input
                        placeholder="Nombre"
                        value={data.first_name}
                        onChange={(e) => setData('first_name', e.target.value)}
                    />
                    {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}

                    {/* Apellido */}
                    <Input
                        placeholder="Apellido"
                        value={data.last_name}
                        onChange={(e) => setData('last_name', e.target.value)}
                    />

                    {/* Cédula */}
                    <Input
                        placeholder="Cédula"
                        value={data.id_number}
                        onChange={(e) => setData('id_number', e.target.value)}
                    />

                    {/* Email */}
                    <Input
                        placeholder="Correo"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    {/* Fecha con Calendar REAL */}
                    <DatePicker
                        value={date}
                        onChange={(value) => {
                            setDate(value);

                            setData(
                                "birth_date",
                                value ? value.toISOString().split("T")[0] : ""
                            );
                        }}
                    />

                    {/* Teléfono */}
                    <Input
                        placeholder="Teléfono"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                    />

                    {/* Dirección */}
                    <Input
                        placeholder="Dirección"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                    />

                    {/* Gender Select */}
                    <Select
                        onValueChange={(value) => setData('gender', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Sexo" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="male">Masculino</SelectItem>
                            <SelectItem value="female">Femenino</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Submit */}
                    <Button type="submit" disabled={processing}>
                        Guardar
                    </Button>

                </form>
            </div>
        </AppLayout>
    );
}