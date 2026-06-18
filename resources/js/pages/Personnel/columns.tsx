import { ColumnDef } from '@tanstack/react-table';
import { router } from '@inertiajs/react';
import { Can } from '@/components/can'

export type Personnel = {
    id: number;
    first_name: string;
    last_name: string;
    id_number: string;
    email: string;
    status: string;
};

export const columns: ColumnDef<Personnel>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorFn: (row) => `${row.first_name} ${row.last_name}`,
        header: 'Nombre Completo',
    },
    {
        accessorKey: 'id_number',
        header: 'Cédula',
    },
    {
        accessorKey: 'email',
        header: 'Correo',
    },
    {
        accessorKey: 'status',
        header: 'Estado',
        cell: ({ row }) => {
            const status = row.getValue('status') as string;

            const styles: Record<string, string> = {
                active: 'text-green-600',
                inactive: 'text-red-600',
                vacation: 'text-yellow-600',
                suspended: 'text-orange-600',
            };

            return (
                <span className={styles[status] ?? 'text-gray-500'}>
                    {status}
                </span>
            );
        },
    },

    {
        id: 'actions',
        header: 'Acciones',
        cell: ({ row }) => {
            const personnel = row.original;

            return (
                <div className="flex gap-2">
                    <a
                        href={`/personnel/${personnel.id}`}
                        className="text-blue-600 hover:underline"
                    >
                        Ver
                    </a>

                    <a
                        href={`/personnel/${personnel.id}/edit`}
                        className="text-yellow-600 hover:underline"
                    >
                        Editar
                    </a>

                    <Can permission='personnel.toggle-status'>
                        <button
                            onClick={() => {
                                if (!confirm('¿Seguro que quieres cambiar el estado?')) return;

                                router.patch(
                                    route('personnel.toggle-status', personnel.id),
                                    {},
                                    {
                                        preserveScroll: true,
                                    }
                                );
                            }}
                            className="text-red-600 hover:underline"
                        >
                            Cambiar estado
                        </button>
                    </Can>
                </div>
            );
        },
    }
];