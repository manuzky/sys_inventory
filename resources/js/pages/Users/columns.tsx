import { ColumnDef } from "@tanstack/react-table";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Can } from "@/components/can";
import { Eye, Pencil, UserRoundCheck, UserRoundX } from "lucide-react";
import { notify } from "@/lib/notify";
import { router } from '@inertiajs/react';

export type User = {
    id: number;
    name: string;
    username: string;
    email: string | null;
    active: boolean;

    personnel: {
        first_name: string;
        last_name: string;
    } | null;
};

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: "username",
        header: "Usuario",
    },
    {
        id: "personnel",
        header: "Personal Asociado",
        cell: ({ row }) => {
            const personnel = row.original.personnel;

            if (!personnel) {
                return "Sin asignar";
            }

            return `${personnel.first_name} ${personnel.last_name}`;
        },
    },

    {
        accessorKey: "email",
        header: "Correo",
    },

    {
        accessorKey: "active",
        header: () => (
            <div className="text-right">
                Estado
            </div>
        ),
        cell: ({ row }) => {
            const active = row.original.active;

            return (
                <div className="flex justify-end">
                    <span
                        className={`px-2 py-1 rounded text-xs ${
                            active
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        {active ? "Habilitado" : "Deshabilitado"}
                    </span>
                </div>
            );
        },
    },

    {
        id: "actions",
        header: () => (
            <div className="text-right">
                Acciones
            </div>
        ),
        cell: ({ row }) => {
            const user = row.original;

            return (
                <div className="flex justify-end items-center gap-2">

                    <Link
                        href={route('users.show', user.id)}
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

                    <Can permission="users.edit">
                        <Link
                            href={route('users.edit', user.id)}
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

                    <Can permission="users.toggle-status">
                        <button
                            title={user.active ? "Deshabilitar usuario" : "Habilitar usuario"}
                            onClick={() => {
                                if (
                                    !confirm(
                                        `¿Seguro que deseas ${
                                            user.active ? "deshabilitar" : "habilitar"
                                        } este usuario?`
                                    )
                                ) {
                                    return;
                                }

                                router.patch(
                                    route("users.toggle-status", user.id),
                                    {},
                                    {
                                        preserveScroll: true,
                                        onSuccess: () => {
                                            notify.success(
                                                user.active
                                                    ? "Usuario deshabilitado correctamente."
                                                    : "Usuario habilitado correctamente."
                                            );
                                        },
                                        onError: () => {
                                            notify.error("No se pudo cambiar el estado del usuario.");
                                        },
                                    }
                                );
                            }}
                            className={`
                                group inline-flex h-9 w-9 items-center justify-center
                                rounded-md border bg-background transition-colors
                                ${
                                    user.active
                                        ? `
                                            text-green-600
                                            hover:text-red-600
                                            hover:border-red-300
                                            hover:bg-red-50
                                        `
                                        : `
                                            text-red-600
                                            hover:text-green-600
                                            hover:border-green-300
                                            hover:bg-green-50
                                        `
                                }
                            `}
                        >
                            {user.active ? (
                                <>
                                    <UserRoundCheck className="h-4 w-4 group-hover:hidden" />
                                    <UserRoundX className="hidden h-4 w-4 group-hover:block" />
                                </>
                            ) : (
                                <>
                                    <UserRoundX className="h-4 w-4 group-hover:hidden" />
                                    <UserRoundCheck className="hidden h-4 w-4 group-hover:block" />
                                </>
                            )}
                        </button>
                    </Can>

                </div>
            );
        },
    },
];