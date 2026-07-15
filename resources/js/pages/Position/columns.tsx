import { ColumnDef } from '@tanstack/react-table';
import { Link, router } from '@inertiajs/react';
import { Pencil, LockKeyhole, LockKeyholeOpen, Trash2 } from 'lucide-react';
import { notify } from '@/lib/notify';
import { Button } from '@/components/ui/button';
import { Can } from '@/components/can';
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

export interface Position {
    id: number;
    name: string;
    description: string | null;
    active: boolean;
}

function toggleActive(position: Position) {
    router.put(
        route('positions.update', position.id),
        {
            ...position,
            active: !position.active,
        },
        {
            preserveScroll: true,
            onSuccess: () => {
                notify.success(
                    `El cargo ha sido ${
                        position.active ? 'desactivado' : 'activado'
                    } correctamente.`
                );
            },
            onError: () => {
                notify.error('No se pudo cambiar el estado del cargo.');
            },
        },
    );
}

function destroy(id: number) {
    router.delete(
        route('positions.destroy', id),
        {
            preserveScroll: true,
            onSuccess: () => {
                notify.success(
                    'El cargo fue eliminado correctamente.'
                );
            },
            onError: () => {
                notify.error(
                    'No se pudo eliminar el cargo. Puede que tenga historial de asignaciones.'
                );
            },
        }
    );
}

export const columns: ColumnDef<Position>[] = [
        {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'name',
        header: 'Nombre',
    },
    {
        accessorKey: 'description',
        header: 'Descripción',
        cell: ({ row }) => row.original.description ?? '—',
    },
    {
        id: 'status',
        header: () => <div className="text-right">Estado</div>,
        cell: ({ row }) => {
            const active = row.original.active;

            return (
                <div className="flex justify-end">
                    <span
                        className={`px-2 py-1 rounded text-xs ${
                            active
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-600'
                        }`}
                    >
                        {active ? 'Activo' : 'Inactivo'}
                    </span>
                </div>
            );
        },
    },
    {
        id: 'actions',
        header: () => <div className="text-right">Acciones</div>,
        cell: ({ row }) => {
            const position = row.original;

            return (
                <div className="flex justify-end items-center gap-2">

                    <Can permission="positions.edit">
                        <Link
                            href={route('positions.edit', position.id)}
                            title="Editar"
                            className="
                                inline-flex h-9 w-9 items-center justify-center
                                rounded-md border bg-background
                                text-yellow-600
                                hover:border-yellow-300
                                hover:bg-yellow-50
                                hover:text-yellow-700
                                transition-all
                            "
                        >
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Can>

                    <Can permission="positions.delete">
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
                                        transition-all
                                    "
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        ¿Eliminar cargo?
                                    </AlertDialogTitle>

                                    <AlertDialogDescription>
                                        Este cargo solo puede eliminarse si nunca ha sido asignado
                                        a ningún trabajador dentro del sistema. Si el cargo tiene
                                        historial de asignaciones, debe mantenerse registrado y
                                        utilizar la opción de desactivación para conservar la
                                        trazabilidad de la información.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancelar
                                    </AlertDialogCancel>

                                    <AlertDialogAction
                                        onClick={() => destroy(position.id)}
                                    >
                                        Eliminar cargo
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </Can>

                    <Can permission="positions.toggle-status">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button
                                    title={position.active ? 'Desactivar' : 'Activar'}
                                    className={`
                                        group inline-flex h-9 w-9 items-center justify-center
                                        rounded-md border bg-background transition-colors
                                        ${
                                            position.active
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
                                    {position.active ? (
                                        <>
                                            <LockKeyholeOpen className="h-4 w-4 group-hover:hidden" />
                                            <LockKeyhole className="hidden h-4 w-4 group-hover:block" />
                                        </>
                                    ) : (
                                        <>
                                            <LockKeyhole className="h-4 w-4 group-hover:hidden" />
                                            <LockKeyholeOpen className="hidden h-4 w-4 group-hover:block" />
                                        </>
                                    )}
                                </button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        {position.active
                                            ? '¿Desactivar cargo?'
                                            : '¿Activar cargo?'}
                                    </AlertDialogTitle>

                                    <AlertDialogDescription>
                                        {position.active
                                            ? 'Al desactivar este cargo dejará de estar disponible para nuevas asignaciones dentro del sistema. Los registros históricos y trabajadores que hayan tenido este cargo asociado no serán eliminados, permitiendo mantener el control y seguimiento de la información.'
                                            : 'Al activar este cargo volverá a estar disponible para nuevas asignaciones dentro del sistema.'}
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancelar
                                    </AlertDialogCancel>

                                    <AlertDialogAction
                                        onClick={() => toggleActive(position)}
                                    >
                                        {position.active
                                            ? 'Desactivar cargo'
                                            : 'Activar cargo'}
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