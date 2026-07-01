import { ColumnDef } from '@tanstack/react-table';
import { Link, router } from '@inertiajs/react';
import { Pencil, LockKeyhole, LockKeyholeOpen, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Can } from '@/components/can';

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
        },
    );
}

function destroy(id: number) {
    if (!confirm('¿Seguro que deseas eliminar este cargo?')) return;

    router.delete(route('positions.destroy', id));
}

export const columns: ColumnDef<Position>[] = [
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

                    <button
                        title={position.active ? 'Desactivar' : 'Activar'}
                        onClick={() => toggleActive(position)}
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

                    <Can permission="positions.delete">
                        <button
                            title="Eliminar"
                            onClick={() => destroy(position.id)}
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
                    </Can>

                </div>
            );
        },
    },
];