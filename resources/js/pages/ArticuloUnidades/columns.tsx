import { ColumnDef } from '@tanstack/react-table';
import { Link } from '@inertiajs/react';
import { Eye } from 'lucide-react';

export type Unidad = {
    id: number;
    articulo_id: number;
    identificador: string;
    serial: string | null;
    ubicacion_id: number;
    estado_id: number;
    fecha_adquisicion: string;
    articulo: {
        id: number;
        nombre: string;
        modelo: string | null;
        referencia: {
            id: number;
            codigo: string;
        };
        marca: {
            id: number;
            nombre: string;
        };
    };
    ubicacion: {
        id: number;
        nombre: string;
    };
    estado: {
        id: number;
        nombre: string;
    };
};

export const columns: ColumnDef<Unidad>[] = [
    {
        accessorKey: 'identificador',
        header: 'Identificador',
    },

    {
        accessorKey: 'serial',
        header: 'Serial',
        cell: ({ row }) => {
            return row.original.serial ?? 'Sin serial';
        },
    },

    {
        accessorKey: 'articulo',
        header: 'Artículo',
        cell: ({ row }) => {
            return row.original.articulo?.nombre ?? 'Sin artículo';
        },
    },

    {
        accessorKey: 'referencia',
        header: 'Referencia',
        cell: ({ row }) => {
            return row.original.articulo?.referencia?.codigo ?? 'Sin referencia';
        },
    },

    {
        accessorKey: 'estado',
        header: 'Estado',
        cell: ({ row }) => {
            return row.original.estado?.nombre ?? 'Sin estado';
        },
    },

    {
        accessorKey: 'ubicacion',
        header: 'Ubicación',
        cell: ({ row }) => {
            return row.original.ubicacion?.nombre ?? 'Sin ubicación';
        },
    },

    {
        accessorKey: 'fecha_adquisicion',
        header: 'Fecha de adquisición',
    },

    {
        id: 'acciones',
        header: () => (
            <div className="text-right">
                Acciones
            </div>
        ),
        cell: ({ row }) => {
            const unidad = row.original;

            return (
                <div className="flex justify-end gap-2">
                    <Link
                        href={route(
                            'articulo-unidades.show',
                            unidad.id
                        )}
                        title="Ver unidad"
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
                </div>
            );
        },
    },
];