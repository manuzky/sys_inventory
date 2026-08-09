import { ColumnDef } from '@tanstack/react-table';
import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2, Power, PowerOff } from 'lucide-react';
import { Can } from '@/components/can';
import { notify } from '@/lib/notify';
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

export type Entrada = {
    id: number;
    proveedores_id: number;
    fecha: string;
    tipo_documento: string;
    numero_documento: string;
    observacion: string | null;
    estado: boolean;
    proveedor: {
        id: number;
        nombre: string;
    } | null;
};

export const columns: ColumnDef<Entrada>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'fecha',
        header: 'Fecha',
    },
    {
        id: 'proveedor',
        header: 'Proveedor',
        cell: ({ row }) => row.original.proveedor?.nombre ?? 'Sin proveedor',
    },
    {
        accessorKey: 'tipo_documento',
        header: 'Documento',
    },
    {
        accessorKey: 'numero_documento',
        header: 'N.º Documento',
    },
    {
        accessorKey: 'estado',
        header: () => <div className="text-right">Estado</div>,
        cell: ({ row }) => (
            <div className="flex justify-end">
                <span className={`px-2 py-1 rounded text-xs ${
                    row.original.estado
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                }`}>
                    {row.original.estado ? 'Válida' : 'Anulada'}
                </span>
            </div>
        ),
    },
    {
        id: 'acciones',
        header: () => <div className="text-right">Acciones</div>,
        cell: ({ row }) => {
            const entrada = row.original;

            return (
                <div className="flex justify-end gap-2">
                    <Can permission="entradas.view">
                        <Link
                            href={route('entradas.show', entrada.id)}
                            title="Ver"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background text-blue-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 hover:scale-105"
                        >
                            <Eye className="h-4 w-4" />
                        </Link>
                    </Can>

                    <Can permission="entradas.toggle-status">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button
                                    title={entrada.estado ? 'Anular entrada' : 'Restaurar entrada'}
                                    className={`group inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background transition-all duration-200 hover:scale-105 ${
                                        entrada.estado
                                            ? 'text-green-600 hover:text-red-600 hover:border-red-300 hover:bg-red-50'
                                            : 'text-red-600 hover:text-green-600 hover:border-green-300 hover:bg-green-50'
                                    }`}
                                >
                                    {entrada.estado ? (
                                        <>
                                            <Power className="h-4 w-4 group-hover:hidden" />
                                            <PowerOff className="hidden h-4 w-4 group-hover:block" />
                                        </>
                                    ) : (
                                        <>
                                            <PowerOff className="h-4 w-4 group-hover:hidden" />
                                            <Power className="hidden h-4 w-4 group-hover:block" />
                                        </>
                                    )}
                                </button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        {entrada.estado ? '¿Anular entrada?' : '¿Restaurar entrada?'}
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        {entrada.estado
                                            ? 'La entrada quedará anulada y dejará de considerarse válida.'
                                            : 'La entrada volverá a estar marcada como válida.'
                                        }
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => {
                                            router.patch(
                                                route('entradas.toggle-status', entrada.id),
                                                {},
                                                {
                                                    preserveScroll: true,
                                                    onSuccess: () => notify.success(
                                                        entrada.estado
                                                            ? 'Entrada anulada correctamente.'
                                                            : 'Entrada restaurada correctamente.'
                                                    ),
                                                    onError: () => notify.error(
                                                        'No se pudo cambiar el estado de la entrada.'
                                                    ),
                                                }
                                            );
                                        }}
                                    >
                                        {entrada.estado ? 'Anular' : 'Restaurar'}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </Can>

                    <Can permission="entradas.edit">
                        <Link
                            href={route('entradas.edit', entrada.id)}
                            title="Editar"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background text-yellow-600 hover:border-yellow-300 hover:bg-yellow-50 hover:text-yellow-700 transition-all duration-200 hover:scale-105"
                        >
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Can>

                    <Can permission="entradas.delete">
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
                                    <AlertDialogTitle>¿Eliminar entrada?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Esta acción eliminará la entrada permanentemente.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => {
                                            router.delete(
                                                route('entradas.destroy', entrada.id),
                                                {
                                                    preserveScroll: true,
                                                    onSuccess: () => notify.success('Entrada eliminada correctamente.'),
                                                    onError: () => notify.error('No se pudo eliminar la entrada.'),
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