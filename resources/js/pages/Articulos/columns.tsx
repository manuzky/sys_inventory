import { ColumnDef } from "@tanstack/react-table";
import { Link, router } from "@inertiajs/react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Can } from "@/components/can";
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

export type Articulo = {
    id: number;
    categoria_id: number;
    marca_id: number;
    unidad_medida_id: number;
    ubicacion_id: number;
    estado_id: number;
    tipo_articulo: string;
    codigo: string;
    codigo_patrimonial: string | null;
    serial: string | null;
    nombre: string;
    descripcion: string | null;
    cantidad: string | number;
    stock_minimo: string | number;
    fecha_adquisicion: string | null;
    categoria?: { nombre: string };
    marca?: { nombre: string };
    unidad_medida?: { nombre: string; abreviatura: string };
    ubicacion?: { nombre: string };
    estado?: { nombre: string };
};

export const columns: ColumnDef<Articulo>[] = [
    {
        accessorKey: "codigo",
        header: "Código",
    },
    {
        accessorKey: "nombre",
        header: "Nombre",
    },
    {
        id: "categoria",
        header: "Categoría",
        cell: ({ row }) => row.original.categoria?.nombre ?? "Sin categoría",
    },
    {
        id: "marca",
        header: "Marca",
        cell: ({ row }) => row.original.marca?.nombre ?? "Sin marca",
    },
    {
        id: "ubicacion",
        header: "Ubicación",
        cell: ({ row }) => row.original.ubicacion?.nombre ?? "Sin ubicación",
    },
    {
        id: "cantidad",
        header: "Cantidad",
        cell: ({ row }) => row.original.cantidad,
    },
    {
        id: "estado",
        header: "Estado",
        cell: ({ row }) => (
            <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                {row.original.estado?.nombre ?? "Sin estado"}
            </span>
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
            const articulo = row.original;

            return (
                <div className="flex justify-end gap-2">
                    <Can permission="articulos.view">
                        <Link
                            href={route("articulos.show", articulo.id)}
                            title="Ver"
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

                    <Can permission="articulos.edit">
                        <Link
                            href={route("articulos.edit", articulo.id)}
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
                                                route("articulos.destroy", articulo.id),
                                                {
                                                    preserveScroll: true,
                                                    onSuccess: () => notify.success(
                                                        "Artículo eliminado correctamente."
                                                    ),
                                                    onError: () => notify.error(
                                                        "No se pudo eliminar el artículo."
                                                    ),
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