import { ColumnDef } from "@tanstack/react-table";
import { Link } from "@inertiajs/react";
import { Can } from "@/components/can";
import { Pencil, Trash2, Eye, Tags, TagsIcon, Power, PowerOff } from "lucide-react";
import { router } from "@inertiajs/react";
import { notify } from "@/lib/notify";
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

export type Categoria = {
    id: number;
    nombre: string;
    descripcion: string | null;
    estado: boolean;
};

export const columns: ColumnDef<Categoria>[] = [
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
            return row.original.descripcion || "-";
        },
    },

    {
        accessorKey: "estado",
        header: () => (
            <div className="text-center">
                Estado
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex justify-center">
                <span
                    className={`px-2 py-1 rounded text-xs ${
                        row.original.estado
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {row.original.estado ? "Activo" : "Inactivo"}
                </span>
            </div>
        ),
    },

    {
        id: "acciones",
        header: () => (
            <div className="text-right">
                Acciones
            </div>
        ),
        cell: ({ row }) => {

            const categoria = row.original;

            return (
                <div className="flex justify-end gap-2">

                    <Can permission="categorias.toggle-status">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button
                                    title={
                                        categoria.estado
                                            ? "Desactivar categoría"
                                            : "Activar categoría"
                                    }
                                    className={`
                                        group inline-flex h-9 w-9 items-center justify-center
                                        rounded-md border bg-background
                                        transition-all duration-200 ease-in-out
                                        hover:scale-105
                                        ${
                                            categoria.estado
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
                                    {categoria.estado ? (
                                        <>
                                            <Power
                                                className="
                                                    h-4 w-4
                                                    group-hover:hidden
                                                "
                                            />

                                            <PowerOff
                                                className="
                                                    hidden h-4 w-4
                                                    group-hover:block
                                                "
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <PowerOff
                                                className="
                                                    h-4 w-4
                                                    group-hover:hidden
                                                "
                                            />

                                            <Power
                                                className="
                                                    hidden h-4 w-4
                                                    group-hover:block
                                                "
                                            />
                                        </>
                                    )}
                                </button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        {
                                            categoria.estado
                                                ? "¿Desactivar categoría?"
                                                : "¿Activar categoría?"
                                        }
                                    </AlertDialogTitle>

                                    <AlertDialogDescription>
                                        {
                                            categoria.estado
                                                ? "La categoría dejará de estar disponible para nuevos registros, pero conservará la información histórica."
                                                : "La categoría volverá a estar disponible para nuevos registros."
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
                                                    "categorias.toggle-status",
                                                    categoria.id
                                                ),
                                                {},
                                                {
                                                    preserveScroll: true,
                                                    onSuccess: () => {

                                                        notify.success(
                                                            categoria.estado
                                                                ? "Categoría desactivada correctamente."
                                                                : "Categoría activada correctamente."
                                                        );

                                                    },
                                                    onError: () => {

                                                        notify.error(
                                                            "No se pudo cambiar el estado de la categoría."
                                                        );
                                                    },
                                                }
                                            );
                                        }}
                                    >
                                        {
                                            categoria.estado
                                                ? "Desactivar"
                                                : "Activar"
                                        }
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </Can>

                    <Can permission="categorias.edit">
                        <Link
                            href={route("categorias.edit", categoria.id)}
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

                    <Can permission="categorias.delete">
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
                                        ¿Eliminar categoría?
                                    </AlertDialogTitle>

                                    <AlertDialogDescription>
                                        Esta acción eliminará la categoría permanentemente si no tiene artículos asociados.
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
                                                    "categorias.destroy",
                                                    categoria.id
                                                ),
                                                {
                                                    preserveScroll: true,

                                                    onSuccess: () => {
                                                        notify.success(
                                                            "Categoría eliminada correctamente."
                                                        );
                                                    },

                                                    onError: () => {
                                                        notify.error(
                                                            "No se pudo eliminar la categoría."
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