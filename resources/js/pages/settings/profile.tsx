import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

export default function Profile() {
    const { auth } = usePage<SharedData>().props;

    const personnel = auth.user?.personnel;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Personal Information"
                        description="Información asociada a su perfil de personal"
                    />

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Nombre</Label>
                            <Input  value={personnel?.first_name ?? ''} disabled />
                        </div>

                        <div className="grid gap-2">
                            <Label>Apellido</Label>
                            <Input value={personnel?.last_name ?? ''} disabled />
                        </div>

                        <div className="grid gap-2">
                            <Label>Cédula</Label>
                            <Input value={personnel?.id_number ?? ''} disabled />
                        </div>

                        <div className="grid gap-2">
                            <Label>Correo</Label>
                            <Input value={personnel?.email ?? ''} disabled />
                        </div>

                        <div className="grid gap-2">
                            <Label>Fecha de nacimiento</Label>
                            <Input value={personnel?.birth_date ?? ''} disabled />
                        </div>

                        <div className="grid gap-2">
                            <Label>Sexo</Label>
                            <Input value={personnel?.gender ?? ''} disabled />
                        </div>

                        <div className="grid gap-2">
                            <Label>Teléfono</Label>
                            <Input value={personnel?.phone ?? ''} disabled />
                        </div>

                        <div className="grid gap-2">
                            <Label>Dirección</Label>
                            <Input value={personnel?.address ?? ''} disabled />
                        </div>
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}