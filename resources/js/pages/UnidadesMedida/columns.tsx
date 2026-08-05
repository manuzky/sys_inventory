import { ColumnDef } from "@tanstack/react-table";
import { Link, router } from "@inertiajs/react";
import { Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { Can } from "@/components/can";
import { notify } from "@/lib/notify";
import { Button } from "@/components/ui/button";
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

export type Unidad = {
    id: number;
    nombre: string;
    abreviatura: string;
    estado: boolean;
};

export const columns: ColumnDef<Unidad>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "nombre",
        header: "Nombre",
    },
    {
        accessorKey: "abreviatura",
        header: "Abreviatura",
    },
    {
        accessorKey: "estado",
        header: "Estado",
        cell: ({ row }) => {
            const estado = row.original.estado;

            return (
                <span className={`px-2 py-1 rounded text-xs ${
                    estado
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                }`}>
                    {estado ? "Activo" : "Inactivo"}
                </span>
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

            const unidad = row.original;

            return (
                <div className="flex justify-end gap-2">

                    {/* CAMBIAR ESTADO */}
                    <Can permission="unidades-medida.toggle-status">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button
                                    title={
                                        unidad.estado
                                            ? "Desactivar unidad"
                                            : "Activar unidad"
                                    }
                                    className={`
                                        group inline-flex h-9 w-9 items-center justify-center
                                        rounded-md border bg-background
                                        transition-all duration-200
                                        hover:scale-105
                                        ${
                                            unidad.estado
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
                                        unidad.estado
                                            ?
                                            <>
                                                <ToggleRight className="h-4 w-4 group-hover:hidden" />
                                                <ToggleLeft className="hidden h-4 w-4 group-hover:block" />
                                            </>
                                            :
                                            <>
                                                <ToggleLeft className="h-4 w-4 group-hover:hidden" />
                                                <ToggleRight className="hidden h-4 w-4 group-hover:block" />
                                            </>
                                    }
                                </button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>

                                    <AlertDialogTitle>
                                        {
                                            unidad.estado
                                                ? "¿Desactivar unidad de medida?"
                                                : "¿Activar unidad de medida?"
                                        }
                                    </AlertDialogTitle>

                                    <AlertDialogDescription>
                                        {
                                            unidad.estado
                                                ? "La unidad quedará inactiva y no podrá utilizarse en nuevos registros."
                                                : "La unidad volverá a estar disponible para nuevos registros."
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
                                                    "unidades-medida.toggle-status",
                                                    unidad.id
                                                ),
                                                {},
                                                {
                                                    preserveScroll:true,

                                                    onSuccess:()=> {
                                                        notify.success(
                                                            unidad.estado
                                                                ? "Unidad desactivada correctamente."
                                                                : "Unidad activada correctamente."
                                                        );
                                                    },

                                                    onError:()=> {
                                                        notify.error(
                                                            "No se pudo cambiar el estado de la unidad."
                                                        );
                                                    },
                                                }
                                            );
                                        }}
                                    >
                                        {
                                            unidad.estado
                                                ? "Desactivar"
                                                : "Activar"
                                        }
                                    </AlertDialogAction>

                                </AlertDialogFooter>

                            </AlertDialogContent>

                        </AlertDialog>
                    </Can>


                    {/* EDITAR */}
                    <Can permission="unidades-medida.edit">
                        <Link
                            href={route(
                                "unidades-medida.edit",
                                unidad.id
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
                    <Can permission="unidades-medida.delete">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button
                                    title="Eliminar"
                                    className="
                                        inline-flex h-9 w-9 items-center
                                        justify-center
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
                                        ¿Eliminar unidad de medida?
                                    </AlertDialogTitle>

                                    <AlertDialogDescription>
                                        Esta acción eliminará la unidad permanentemente.
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
                                                    "unidades-medida.destroy",
                                                    unidad.id
                                                ),
                                                {
                                                    preserveScroll:true,

                                                    onSuccess:()=> {
                                                        notify.success(
                                                            "Unidad eliminada correctamente."
                                                        );
                                                    },

                                                    onError:()=> {
                                                        notify.error(
                                                            "No se pudo eliminar la unidad."
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