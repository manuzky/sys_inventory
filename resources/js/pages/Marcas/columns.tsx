import { ColumnDef } from "@tanstack/react-table";
import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Can } from "@/components/can";
import { notify } from "@/lib/notify";
import { Pencil, Trash2, Power, PowerOff } from "lucide-react";
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

export type Marca = {
    id: number;
    nombre: string;
    descripcion: string | null;
    estado: boolean;
};

export const columns: ColumnDef<Marca>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "nombre",
        header: "Nombre",
    },
    {
        accessorKey: "descripcion",
        header: "Descripción",
        cell: ({ row }) => {
            return row.original.descripcion ?? "Sin descripción";
        },
    },
    {
        accessorKey: "estado",
        header: () => (
            <div className="text-right">
                Estado
            </div>
        ),
        cell: ({ row }) => {
            const estado = row.original.estado;
            return (
                <div className="flex justify-end">
                    <span
                        className={`
                            px-2 py-1 rounded text-xs
                            ${
                                estado
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }
                        `}
                    >
                        {
                            estado
                                ? "Activo"
                                : "Inactivo"
                        }
                    </span>
                </div>
            );
        },
    },
    {
        id: "acciones",
        header: () => (
            <div className="text-right">
                Acciones
            </div>
        ),
        cell: ({ row }) => {
            const marca = row.original;
            return (
                <div className="flex justify-end gap-2">

                    {/* CAMBIAR ESTADO */}
                    <Can permission="marcas.toggle-status">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button
                                    title={
                                        marca.estado
                                            ? "Desactivar marca"
                                            : "Activar marca"
                                    }
                                    className={`
                                        group inline-flex h-9 w-9 items-center justify-center
                                        rounded-md border bg-background
                                        transition-all duration-200
                                        hover:scale-105
                                        ${
                                            marca.estado
                                                ?
                                                `
                                                text-green-600
                                                hover:text-red-600
                                                hover:border-red-300
                                                hover:bg-red-50
                                                `
                                                :
                                                `
                                                text-red-600
                                                hover:text-green-600
                                                hover:border-green-300
                                                hover:bg-green-50
                                                `
                                        }
                                    `}
                                >

                                    {
                                        marca.estado
                                            ?
                                            <>
                                                <Power className="h-4 w-4 group-hover:hidden" />
                                                <PowerOff className=" hidden h-4 w-4 group-hover:block" />
                                            </>
                                            :
                                            <>
                                                <PowerOff className="h-4 w-4 group-hover:hidden" />
                                                <Power className="hidden h-4 w-4 group-hover:block" />
                                            </>
                                    }
                                </button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        {
                                            marca.estado
                                                ? "¿Desactivar marca?"
                                                : "¿Activar marca?"
                                        }
                                    </AlertDialogTitle>

                                    <AlertDialogDescription>
                                        {
                                            marca.estado ? "La marca quedará inactiva y no podrá seleccionarse en nuevos registros." : "La marca volverá a estar disponible para nuevos registros."
                                        }
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancelar
                                    </AlertDialogCancel>

                                    <AlertDialogAction
                                        onClick={() => {
                                            router.patch(
                                                route(
                                                    "marcas.toggle-status",
                                                    marca.id
                                                ),
                                                {},
                                                {
                                                    preserveScroll: true,
                                                    onSuccess: () => {
                                                        notify.success(
                                                            marca.estado
                                                                ? "Marca desactivada correctamente."
                                                                : "Marca activada correctamente."
                                                        );
                                                    },

                                                    onError: () => {
                                                        notify.error(
                                                            "No se pudo cambiar el estado de la marca."
                                                        );
                                                    },
                                                }
                                            );
                                        }}
                                    >

                                        {
                                            marca.estado ? "Desactivar" : "Activar"
                                        }
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>

                        </AlertDialog>
                    </Can>
                    
                    {/* EDITAR */}
                    <Can permission="marcas.edit">
                        <Link
                            href={route(
                                "marcas.edit",
                                marca.id
                            )}
                            title="Editar"
                            className="
                                inline-flex h-9 w-9 items-center justify-center
                                rounded-md border bg-background
                                text-yellow-600
                                hover:border-yellow-300
                                hover:bg-yellow-50
                                hover:text-yellow-700
                                transition-all duration-200
                                hover:scale-105
                            "
                        >
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Can>

                    {/* ELIMINAR */}
                    <Can permission="marcas.delete">
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
                                        transition-all duration-200
                                        hover:scale-105
                                    "
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        ¿Eliminar marca?
                                    </AlertDialogTitle>

                                    <AlertDialogDescription>
                                        Esta acción eliminará la marca permanentemente.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancelar
                                    </AlertDialogCancel>

                                    <AlertDialogAction
                                        onClick={() => {
                                            router.delete(
                                                route(
                                                    "marcas.destroy",
                                                    marca.id
                                                ),
                                                {
                                                    preserveScroll: true,
                                                    onSuccess: () => {
                                                        notify.success(
                                                            "Marca eliminada correctamente."
                                                        );
                                                    },

                                                    onError: () => {
                                                        notify.error(
                                                            "No se pudo eliminar la marca."
                                                        );
                                                    },
                                                }
                                            );
                                        }}
                                    >
                                        Eliminar
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