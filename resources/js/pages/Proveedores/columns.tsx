import { ColumnDef } from "@tanstack/react-table";
import { Link, router } from "@inertiajs/react";
import { Eye, Pencil, Trash2, Power, PowerOff, ToggleLeft, ToggleRight } from "lucide-react";
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

export type Proveedor = {
    id: number;
    nombre: string;
    rif: string;
    telefono: string | null;
    email: string | null;
    direccion: string | null;
    estado: boolean;
};

export const columns: ColumnDef<Proveedor>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "nombre",
        header: "Nombre",
    },
    {
        accessorKey: "rif",
        header: "RIF",
    },
    {
        accessorKey: "telefono",
        header: "Teléfono",
        cell: ({ row }) => row.original.telefono ?? "Sin teléfono",
    },
    {
        accessorKey: "email",
        header: "Correo",
        cell: ({ row }) => row.original.email ?? "Sin correo",
    },
    {
        accessorKey: "estado",
        header: () => (
            <div className="text-right">
                Estado
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex justify-end">
                <span className={`px-2 py-1 rounded text-xs ${
                    row.original.estado
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                }`}>
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

            const proveedor = row.original;

            return (
                <div className="flex justify-end gap-2">
                    <Can permission="proveedores.toggle-status">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button
                                    title={proveedor.estado ? "Desactivar proveedor" : "Activar proveedor"}
                                    className={`
                                        group inline-flex h-9 w-9 items-center justify-center
                                        rounded-md border bg-background
                                        transition-all duration-200 hover:scale-105
                                        ${
                                            proveedor.estado
                                                ? "text-green-600 hover:text-red-600 hover:border-red-300 hover:bg-red-50"
                                                : "text-red-600 hover:text-green-600 hover:border-green-300 hover:bg-green-50"
                                        }
                                    `}
                                >
                                    {proveedor.estado ? (
                                        <>
                                            <ToggleRight className="h-4 w-4 group-hover:hidden" />
                                            <ToggleLeft className="hidden h-4 w-4 group-hover:block" />
                                        </>
                                    ) : (
                                        <>
                                            <ToggleLeft className="h-4 w-4 group-hover:hidden" />
                                            <ToggleRight className="hidden h-4 w-4 group-hover:block" />
                                        </>
                                    )}
                                </button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        {proveedor.estado ? "¿Desactivar proveedor?" : "¿Activar proveedor?"}
                                    </AlertDialogTitle>

                                    <AlertDialogDescription>
                                        {proveedor.estado
                                            ? "El proveedor quedará inactivo y no podrá utilizarse en nuevos registros."
                                            : "El proveedor volverá a estar disponible."
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
                                                route("proveedores.toggle-status", proveedor.id),
                                                {},
                                                {
                                                    preserveScroll: true,
                                                    onSuccess: () => notify.success(
                                                        proveedor.estado
                                                            ? "Proveedor desactivado correctamente."
                                                            : "Proveedor activado correctamente."
                                                    ),
                                                    onError: () => notify.error(
                                                        "No se pudo cambiar el estado."
                                                    ),
                                                }
                                            );
                                        }}
                                    >
                                        {proveedor.estado ? "Desactivar" : "Activar"}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </Can>

                    <Can permission="proveedores.view">
                        <Link
                            href={route("proveedores.show", proveedor.id)}
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
                    
                    <Can permission="proveedores.edit">
                        <Link
                            href={route("proveedores.edit", proveedor.id)}
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

                    <Can permission="proveedores.delete">
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
                                        ¿Eliminar proveedor?
                                    </AlertDialogTitle>

                                    <AlertDialogDescription>
                                        Esta acción eliminará el proveedor permanentemente.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancelar
                                    </AlertDialogCancel>

                                    <AlertDialogAction
                                        onClick={() => {
                                            router.delete(
                                                route("proveedores.destroy", proveedor.id),
                                                {
                                                    preserveScroll: true,
                                                    onSuccess: () => notify.success(
                                                        "Proveedor eliminado correctamente."
                                                    ),
                                                    onError: () => notify.error(
                                                        "No se pudo eliminar el proveedor."
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