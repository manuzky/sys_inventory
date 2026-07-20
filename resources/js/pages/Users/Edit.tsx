import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { notify } from '@/lib/notify';
import { FormEdit } from './Form';
import { Info } from "lucide-react"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

interface Personnel {
    id: number;
    first_name: string;
    last_name: string;
    email: string | null;
    document_type: string;
    id_number: string;
    positions_history?: {
        end_date: string | null;

        position?: {
            id: number;
            name: string;
        };
    }[];
}

interface Permission {
    id: number;
    name: string;
    display_name: string;
}

interface PermissionGroup {
    name: string;
    permissions: Permission[];
}

interface Role {
    id: number;
    name: string;
    permissions: Permission[];
}

interface User {
    id: number;
    username: string;
    personnel_id: number | null;
    active: boolean;

    personnel: {
        id: number;
        first_name: string;
        last_name: string;
        email: string | null;
        document_type: string;
        id_number: string;
    } | null;
}

interface Props {
    user: User;
    personnels: Personnel[];
    roles: Role[];
    userRoles: string[];
    permissionGroups: PermissionGroup[];
    userPermissions: string[];
}

export default function Edit({
    user,
    personnels,
    roles,
    userRoles,
    permissionGroups,
    userPermissions,
}: Props) {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Usuarios',
            href: '/users',
        },
        {
            title: 'Editar',
            href: `/users/${user.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        personnel_id: user.personnel_id
            ? String(user.personnel_id)
            : '',
        document_type: user.personnel?.document_type ?? 'V',
        document_number: user.personnel?.id_number ?? '',
        username: user.username ?? '',
        email: user.personnel?.email ?? '',
        active: user.active ?? true,
        role: userRoles[0] ?? '',
        permissions: userPermissions,
        change_password: false,
        password: '',
        password_confirmation: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();

        put(route('users.update', user.id), {
            preserveScroll: true,
            onSuccess: () => { notify.success('Usuario actualizado correctamente'); },
            onError: () => { notify.error('Revisa los campos marcados'); },
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Usuario" />

            <div className="p-6 max-w-7xl space-y-6">

                <div className="flex items-center gap-2 mb-4 pl-2">
                    <h1 className="text-xl font-semibold">
                        Editar Usuario
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

                        <HoverCardContent className="w-96">
                            <div className="space-y-3">
                                <h4 className="font-semibold">
                                    Antes de guardar los cambios
                                </h4>

                                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                                    <li>
                                        Los campos marcados con <span className="font-bold text-red-500">*</span> son obligatorios.
                                    </li>
                                    <li>
                                        El nombre de usuario debe seguir siendo <strong>único</strong> dentro del sistema.
                                    </li>
                                    <li>
                                        Debe mantener seleccionado al menos un <strong>rol</strong> para el usuario.
                                    </li>
                                </ul>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </div>

                <FormEdit
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    personnels={personnels}
                    roles={roles}
                    permissionGroups={permissionGroups}
                    onSubmit={submit}
                    submitLabel="Actualizar"
                />

            </div>
        </AppLayout>
    );
}