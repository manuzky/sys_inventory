import { ColumnDef } from '@tanstack/react-table';
import { Link } from '@inertiajs/react';
import { Can } from '@/components/can';
import { Eye, Plus } from 'lucide-react';

export type Articulo = {
    id: number;
    categoria_id: number;
    marca_id: number;
    referencia_id: number;
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
    referencia: {
        id: number;
        codigo: string;
    };
};

export const columns: ColumnDef<Articulo, unknown>[] = [

    // NOMBRE
    {
        accessorKey: 'nombre',
        header: 'Artículo',
    },

    // MARCA
    {
        accessorKey: 'marca',
        header: 'Marca',
        cell: ({ row }) => { return row.original.marca?.nombre ?? 'Sin marca'; },
    },

    // MODELO
    {
        accessorKey: 'modelo',
        header: 'Modelo',
        cell: ({ row }) => { return row.original.modelo ?? 'Sin modelo'; },
    },

    // REFERENCIA
    {
        accessorKey: 'referencia',
        header: 'Referencia',
        cell: ({ row }) => { return row.original.referencia?.codigo ?? 'Sin referencia'; },
    },

    // STOCK
    {
        accessorKey: 'stock',
        header: () => (
            <div className="text-right">
                Stock
            </div>
        ),
        cell: ({ row }) => {
            const stock = Number(row.original.stock);
            return ( <div className="text-right">{stock}</div>);
        },
    },

    // ACCIONES
    {
        id: 'acciones',
        header: () => (<div className="text-right">Acciones</div>),
        cell: ({ row }) => {
            const articulo = row.original;

            return (
                <div className="flex justify-end gap-2">

                    {/* NUEVA ENTRADA */}
                    <Can permission="entradas.create">
                        <Link
                            href={route( 'entradas.create', { articulo_id: articulo.id } )}
                            title="Registrar entrada"
                            className="
                                inline-flex h-9 w-9 items-center justify-center
                                rounded-md border bg-background
                                text-green-600
                                hover:border-green-300
                                hover:bg-green-50
                                hover:text-green-700
                                transition-all duration-200
                                hover:scale-105
                            "
                        >
                            <Plus className="h-4 w-4" />
                        </Link>
                    </Can>

                    {/* VER */}
                    <Can permission="entradas.view">
                        <Link
                            href={route('entradas.show', articulo.id)}
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

                </div>
            );
        },
    },
];