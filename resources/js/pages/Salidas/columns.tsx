import { ColumnDef } from '@tanstack/react-table';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Can } from '@/components/can';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';

interface Usuario {
    id: number;
    name: string;
}

interface Salida {
    id: number;
    usuario_id: number;
    fecha: string;
    motivo: string;
    observaciones: string | null;
    usuario: Usuario | null;
}

export const columns: ColumnDef<Salida>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },

    {
        accessorKey: 'fecha',
        header: 'Fecha',
        cell: ({ row }) => {
            const fecha = row.original.fecha;

            return new Date(
                `${fecha}T00:00:00`
            ).toLocaleDateString('es-VE');
        },
    },

    {
        accessorKey: 'motivo',
        header: 'Motivo',
    },

    {
        accessorKey: 'observaciones',
        header: 'Observaciones',
        cell: ({ row }) => {
            return row.original.observaciones ?? '—';
        },
    },

    {
        id: 'usuario',
        header: 'Registrado por',
        cell: ({ row }) => {
            return row.original.usuario?.name ?? '—';
        },
    },

    {
        id: 'acciones',
        header: 'Acciones',
        cell: ({ row }) => {
            const salida = row.original;

            return (
                <div className="flex gap-2">

                    <Can permission="salidas.view">
                        <Link
                            href={route(
                                'salidas.show',
                                salida.id
                            )}
                        >
                            <Button
                                variant="outline"
                                size="icon"
                                title="Ver"
                            >
                                <Eye className="h-4 w-4" />
                            </Button>
                        </Link>
                    </Can>

                    <Can permission="salidas.edit">
                        <Link href={route('salidas.edit', salida.id)} >
                            <Button variant="outline" size="icon" title="Editar">
                                <Pencil className="h-4 w-4" />
                            </Button>
                        </Link>
                    </Can>

                    <Can permission="salidas.delete">
                        <Button
                            variant="destructive"
                            size="icon"
                            title="Eliminar"
                            onClick={() => {
                                if (confirm('¿Está seguro de eliminar esta salida?'))
                                {
                                    router.delete( route('salidas.destroy', salida.id ));
                                }
                            }}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </Can>

                </div>
            );
        },
    },
];