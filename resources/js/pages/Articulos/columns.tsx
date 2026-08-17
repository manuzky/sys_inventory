import { ColumnDef } from "@tanstack/react-table";
import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Can } from "@/components/can";
import { notify } from "@/lib/notify";
import { Eye, Pencil, Trash2, } from "lucide-react";
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

export type Articulo = {
    id: number;
    categoria_id: number;
    marca_id: number;
    unidad_medida_id: number;
    tipo_articulo: string;
    nombre: string;
    modelo: string | null;
    descripcion: string | null;
    control_individual: boolean;
    maneja_serial: boolean;
    stock: string | number;
    stock_minimo: string | number;
    categoria: {
        id: number;
        nombre: string;
    };
    marca: {
        id: number;
        nombre: string;
    };
    unidad_medida: {
        id: number;
        nombre: string;
    };
};

export const columns: ColumnDef<Articulo>[] = [

    // ID
    {
        accessorKey: "id",
        header: "ID",
    },

    // NOMBRE
    {
        accessorKey: "nombre",
        header: "Nombre",
    },

    // TIPO
    {
        accessorKey: "tipo_articulo",
        header: "Tipo",
    },

    // CATEGORÍA
    {
        accessorKey: "categoria",
        header: "Categoría",
        cell: ({ row }) => {
            return row.original.categoria?.nombre ?? "Sin categoría";
        },
    },

    // MARCA
    {
        accessorKey: "marca",
        header: "Marca",
        cell: ({ row }) => { return row.original.marca?.nombre ?? "Sin marca"; },
    },

    // MODELO
    {
        accessorKey: "modelo",
        header: "Modelo",
        cell: ({ row }) => { return row.original.modelo ?? "Sin modelo"; },
    },

    // UNIDAD DE MEDIDA
    {
        accessorKey: "unidad_medida",
        header: "Unidad",
        cell: ({ row }) => { return row.original.unidad_medida?.nombre ?? "Sin unidad"; },
    },

    // STOCK
    {
        accessorKey: "stock",
        header: () => (
            <div className="text-right">
                Stock
            </div>
        ),
        cell: ({ row }) => {
            const stock = Number(row.original.stock);
            return (
                <div className="text-right">
                    {stock}
                </div>
            );
        },
    },

    // STOCK MÍNIMO
    {
        accessorKey: "stock_minimo",
        header: () => (
            <div className="text-right">
                Stock mínimo
            </div>
        ),
        cell: ({ row }) => {
            const stock = Number(row.original.stock);
            const stockMinimo = Number(row.original.stock_minimo);
            const stockBajo = stock <= stockMinimo;

            return (
                <div className="flex justify-end">
                    <span
                        className={`
                            px-2 py-1 rounded text-xs
                            ${stockBajo ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}
                        `}
                    >
                        {stockMinimo}
                    </span>
                </div>
            );
        },
    },

    // CONTROL INDIVIDUAL
    {
        accessorKey: "control_individual",
        header: "Control individual",
        cell: ({ row }) => { return row.original.control_individual ? "Sí" : "No"; },
    },

    // SERIAL
    {
        accessorKey: "maneja_serial",
        header: "Serial",
        cell: ({ row }) => { return row.original.maneja_serial ? "Sí" : "No"; },
    },

    // ACCIONES
    {
        id: "acciones",

        header: () => (
            <div className="text-right">
                Acciones
            </div>
        ),

        cell: ({ row }) => {
            const articulo = row.original;

            return (
                <div className="flex justify-end gap-2">

                    {/* VER */}
                    <Can permission="articulos.view">
                        <Link
                            href={route( "articulos.show", articulo.id )}
                            title="Ver artículo"
                            className="
                                inline-flex h-9 w-9 items-center justify-center
                                rounded-md border bg-background
                                text-blue-600
                                hover:border-blue-300
                                hover:bg-blue-50
                                hover:text-blue-700
                                transition-all duration-200
                                hover:scale-105
                            "
                        >
                            <Eye className="h-4 w-4" />
                        </Link>
                    </Can>

                    {/* EDITAR */}
                    <Can permission="articulos.edit">
                        <Link
                            href={route( "articulos.edit", articulo.id)}
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
                    <Can permission="articulos.delete">
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
                                        ¿Eliminar artículo?
                                    </AlertDialogTitle>

                                    <AlertDialogDescription>
                                        Esta acción eliminará el artículo permanentemente.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancelar
                                    </AlertDialogCancel>

                                    <AlertDialogAction
                                        onClick={() => {
                                            router.delete(
                                                route( "articulos.destroy", articulo.id ),
                                                {
                                                    preserveScroll: true,
                                                    onSuccess: () => {notify.success("Artículo eliminado correctamente.");},
                                                    onError: () => {notify.error("No se pudo eliminar el artículo.");},
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