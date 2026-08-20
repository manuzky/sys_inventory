import { ColumnDef } from '@tanstack/react-table';
import { Link, router } from '@inertiajs/react';
import { Can } from '@/components/can';
import { notify } from '@/lib/notify';
import { Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
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
} from '@/components/ui/alert-dialog';

export type Referencia = {
    id: number;
    codigo: string;
    descripcion: string | null;
    estado: boolean;
};

export const columns: ColumnDef<Referencia>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'codigo',
        header: 'Código',
        cell: ({ row }) => {
            return (
                <span className="font-semibold tracking-wider">
                    {row.original.codigo}
                </span>
            );
        },
    },
    {
        accessorKey: 'descripcion',
        header: 'Descripción',
        cell: ({ row }) => {
            return row.original.descripcion ?? 'Sin descripción';
        },
    },
    {
        accessorKey: 'estado',
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
                        className={`px-2 py-1 rounded text-xs ${
                            estado
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                        }`}
                    >
                        {estado ? 'Activo' : 'Inactivo'}
                    </span>
                </div>
            );
        },
    },
    {
        id: 'acciones',
        header: () => (
            <div className="text-right">
                Acciones
            </div>
        ),
        cell: ({ row }) => {
            const referencia = row.original;

            return (
                <div className="flex justify-end gap-2">
                    {/* CAMBIAR ESTADO */}
                    <Can permission="referencias.edit">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button
                                    title={
                                        referencia.estado
                                            ? 'Desactivar referencia'
                                            : 'Activar referencia'
                                    }
                                    className={`group inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background transition-all duration-200 hover:scale-105 ${
                                        referencia.estado
                                            ? 'text-green-600 hover:text-red-600 hover:border-red-300 hover:bg-red-50'
                                            : 'text-red-600 hover:text-green-600 hover:border-green-300 hover:bg-green-50'
                                    }`}
                                >
                                    {referencia.estado ? (
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
                                        {referencia.estado
                                            ? '¿Desactivar referencia?'
                                            : '¿Activar referencia?'}
                                    </AlertDialogTitle>

                                    <AlertDialogDescription>
                                        {referencia.estado
                                            ? 'La referencia quedará inactiva y no podrá seleccionarse en nuevos artículos.'
                                            : 'La referencia volverá a estar disponible para nuevos artículos.'}
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
                                                    'referencias.toggle-status',
                                                    referencia.id
                                                ),
                                                {},
                                                {
                                                    preserveScroll: true,
                                                    onSuccess: () => {
                                                        notify.success(
                                                            referencia.estado
                                                                ? 'Referencia desactivada correctamente.'
                                                                : 'Referencia activada correctamente.'
                                                        );
                                                    },
                                                    onError: () => {
                                                        notify.error(
                                                            'No se pudo cambiar el estado de la referencia.'
                                                        );
                                                    },
                                                }
                                            );
                                        }}
                                    >
                                        {referencia.estado
                                            ? 'Desactivar'
                                            : 'Activar'}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </Can>

                    {/* EDITAR */}
                    <Can permission="referencias.edit">
                        <Link
                            href={route(
                                'referencias.edit',
                                referencia.id
                            )}
                            title="Editar"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background text-yellow-600 transition-all duration-200 hover:scale-105 hover:border-yellow-300 hover:bg-yellow-50 hover:text-yellow-700"
                        >
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Can>

                    {/* ELIMINAR */}
                    <Can permission="referencias.delete">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button
                                    title="Eliminar"
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background text-red-600 transition-all duration-200 hover:scale-105 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        ¿Eliminar referencia?
                                    </AlertDialogTitle>

                                    <AlertDialogDescription>
                                        Esta acción eliminará la referencia permanentemente.
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
                                                    'referencias.destroy',
                                                    referencia.id
                                                ),
                                                {
                                                    preserveScroll: true,
                                                    onSuccess: () => {
                                                        notify.success(
                                                            'Referencia eliminada correctamente.'
                                                        );
                                                    },
                                                    onError: () => {
                                                        notify.error(
                                                            'No se pudo eliminar la referencia.'
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