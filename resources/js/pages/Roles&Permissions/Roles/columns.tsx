import { ColumnDef } from '@tanstack/react-table';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Can } from '@/components/can';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { notify } from '@/lib/notify'; 
import { router } from '@inertiajs/react';

export interface Role {
    id: number;
    name: string;
    permissions_count: number;
    users_count: number;
}

export const columns: ColumnDef<Role>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'name',
        header: 'Rol',
    },
    {
        accessorKey: 'permissions_count',
        header: 'Permisos',
    },
    {
        accessorKey: 'users_count',
        header: 'Usuarios asignados',
    },
    {
        id: 'actions',
        header: () => (
            <div className="text-right">
                Acciones
            </div>
        ),
        cell: ({ row }) => {
            const role = row.original;

            return (
                <div className="flex justify-end items-center gap-2">

                    <Link
                        href={route('roles.show', role.id)}
                        title="Ver"
                        className="
                            inline-flex h-9 w-9 items-center justify-center
                            rounded-md border bg-background
                            text-blue-600
                            hover:border-blue-300
                            hover:bg-blue-50
                            hover:text-blue-700
                            transition-colors
                        "
                    >
                        <Eye className="h-4 w-4" />
                    </Link>

                    <Can permission="roles.edit">
                        <Link
                            href={route('roles.edit', role.id)}
                            title="Editar"
                            className="
                                inline-flex h-9 w-9 items-center justify-center
                                rounded-md border bg-background
                                text-yellow-600
                                hover:border-yellow-300
                                hover:bg-yellow-50
                                hover:text-yellow-700
                                transition-colors
                            "
                        >
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Can>

                    <Can permission="roles.delete">
                        <button
                            title="Eliminar"
                            onClick={() => {
                                if (!confirm(`¿Seguro que deseas eliminar el rol "${role.name}"?`)) {
                                    return;
                                }

                                router.delete(route('roles.destroy', role.id), {
                                    preserveScroll: true,
                                    onSuccess: () => {
                                        notify.success('Rol eliminado correctamente.');
                                    },
                                    onError: (errors) => {
                                        notify.error(
                                            errors.error ??
                                            'No se pudo eliminar el rol.'
                                        );
                                    },
                                });
                            }}
                            className="
                                inline-flex h-9 w-9 items-center justify-center
                                rounded-md border bg-background
                                text-red-600
                                hover:border-red-300
                                hover:bg-red-50
                                hover:text-red-700
                                transition-colors
                            "
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </Can>

                </div>
            );
        },
    },
];