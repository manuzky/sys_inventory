import { ColumnDef } from "@tanstack/react-table";
import { Link, router } from "@inertiajs/react";
import { Can } from "@/components/can";
import { notify } from "@/lib/notify";
import { Pencil, Trash2, Power, PowerOff, ToggleRight, ToggleLeft } from "lucide-react";
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

export type Ubicacion = {
    id: number;
    nombre: string;
    descripcion: string | null;
    estado: boolean;
};

export const columns: ColumnDef<Ubicacion>[] = [
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
        cell: ({ row }) => row.original.descripcion ?? "Sin descripción",
    },
    {
        accessorKey: "estado",
        header: () => <div className="text-right">Estado</div>,
        cell: ({ row }) => (
            <div className="flex justify-end">
                <span className={`px-2 py-1 rounded text-xs ${row.original.estado ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {row.original.estado ? "Activo" : "Inactivo"}
                </span>
            </div>
        ),
    },
    {
        id: "acciones",
        header: () => <div className="text-right">Acciones</div>,
        cell: ({ row }) => {
            const ubicacion = row.original;

            return (
                <div className="flex justify-end gap-2">

                    <Can permission="ubicaciones.toggle-status">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button
                                    title={ubicacion.estado ? "Desactivar ubicación" : "Activar ubicación"}
                                    className={`group inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background transition-all duration-200 hover:scale-105 ${
                                        ubicacion.estado
                                            ? "text-green-600 hover:text-red-600 hover:border-red-300 hover:bg-red-50"
                                            : "text-red-600 hover:text-green-600 hover:border-green-300 hover:bg-green-50"
                                    }`}
                                >
                                    {ubicacion.estado ? (
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
                                        {ubicacion.estado ? "¿Desactivar ubicación?" : "¿Activar ubicación?"}
                                    </AlertDialogTitle>

                                    <AlertDialogDescription>
                                        {ubicacion.estado
                                            ? "La ubicación quedará inactiva y no podrá seleccionarse en nuevos registros."
                                            : "La ubicación volverá a estar disponible para nuevos registros."}
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>

                                    <AlertDialogAction
                                        onClick={() => {
                                            router.patch(route("ubicaciones.toggle-status", ubicacion.id), {}, {
                                                preserveScroll: true,
                                                onSuccess: () => notify.success(ubicacion.estado ? "Ubicación desactivada correctamente." : "Ubicación activada correctamente."),
                                                onError: () => notify.error("No se pudo cambiar el estado."),
                                            });
                                        }}
                                    >
                                        {ubicacion.estado ? "Desactivar" : "Activar"}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </Can>

                    <Can permission="ubicaciones.edit">
                        <Link
                            href={route("ubicaciones.edit", ubicacion.id)}
                            title="Editar"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background text-yellow-600 hover:border-yellow-300 hover:bg-yellow-50 hover:text-yellow-700 transition-all duration-200 hover:scale-105"
                        >
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Can>

                    <Can permission="ubicaciones.delete">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button
                                    title="Eliminar"
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background text-red-600 hover:border-red-300 hover:bg-red-50 hover:text-red-700 transition-all duration-200 hover:scale-105"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>¿Eliminar ubicación?</AlertDialogTitle>

                                    <AlertDialogDescription>
                                        Esta acción eliminará la ubicación permanentemente.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>

                                    <AlertDialogAction
                                        onClick={() => {
                                            router.delete(route("ubicaciones.destroy", ubicacion.id), {
                                                preserveScroll: true,
                                                onSuccess: () => notify.success("Ubicación eliminada correctamente."),
                                                onError: () => notify.error("No se pudo eliminar la ubicación."),
                                            });
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