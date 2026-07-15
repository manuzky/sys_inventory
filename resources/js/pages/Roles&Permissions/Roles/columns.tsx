import { ColumnDef } from '@tanstack/react-table';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Can } from '@/components/can';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { notify } from '@/lib/notify'; 
import { router } from '@inertiajs/react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button
                                    title="Eliminar"
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
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        ¿Eliminar rol?
                                    </AlertDialogTitle>

                                    <AlertDialogDescription>
                                        Este rol solo puede eliminarse si no está asignado a ningún
                                        usuario dentro del sistema. Si posee usuarios asociados,
                                        debe mantenerse para conservar la configuración de permisos
                                        y evitar afectar el acceso de otros usuarios.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancelar
                                    </AlertDialogCancel>

                                    <AlertDialogAction
                                        onClick={() => {
                                            router.delete(
                                                route('roles.destroy', role.id),
                                                {
                                                    preserveScroll: true,

                                                    onSuccess: () => {
                                                        notify.success(
                                                            'Rol eliminado correctamente.'
                                                        );
                                                    },

                                                    onError: (errors) => {
                                                        notify.error(
                                                            errors.error ??
                                                            'No se pudo eliminar el rol.'
                                                        );
                                                    },
                                                }
                                            );
                                        }}
                                    >
                                        Eliminar rol
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </Can>

                </div>
            );
        },
    },
];