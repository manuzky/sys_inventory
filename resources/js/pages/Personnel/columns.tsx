import { ColumnDef } from '@tanstack/react-table';
import { Eye, Pencil, UserRoundX, UserRoundCheck } from 'lucide-react';
import { router } from '@inertiajs/react';
import { Can } from '@/components/can'

export type Personnel = {
    id: number;
    first_name: string;
    last_name: string;
    document_type: string;
    id_number: string;
    email: string;
    status: string;
};

function formatId(documentType: string, idNumber: string) {
    const formatted = Number(idNumber).toLocaleString('es-VE');
    return `${documentType}-${formatted}`;
}

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
        header: 'Cédula',
        cell: ({ row }) => {

            return formatId(
                row.original.document_type,
                row.original.id_number
            );

        },
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

        header: () => (
            <div className="text-right">
                Acciones
            </div>
        ),

        cell: ({ row }) => {

            const personnel = row.original;

            return (

                <div className="flex justify-end items-center gap-3">

                    <a
                        href={`/personnel/${personnel.id}`}
                        className="text-blue-600 hover:text-blue-800"
                        title="Ver"
                    >
                        <Eye className="h-5 w-5" />
                    </a>

                    <a
                        href={`/personnel/${personnel.id}/edit`}
                        className="text-yellow-600 hover:text-yellow-800"
                        title="Editar"
                    >
                        <Pencil className="h-5 w-5" />
                    </a>

                    <Can permission="personnel.toggle-status">
                        <button
                            title={
                                personnel.status === 'active'
                                    ? 'Desactivar personal'
                                    : 'Activar personal'
                            }
                            className={
                                personnel.status === 'active'
                                    ? 'text-red-600 hover:text-red-800'
                                    : 'text-green-600 hover:text-green-800'
                            }
                            onClick={() => {
                                if (
                                    !confirm(
                                        `¿Seguro que deseas ${
                                            personnel.status === 'active'
                                                ? 'desactivar'
                                                : 'activar'
                                        } este empleado?`
                                    )
                                ) {
                                    return;
                                }

                                router.patch(
                                    route('personnel.toggle-status', personnel.id),
                                    {},
                                    {
                                        preserveScroll: true,
                                    }
                                );
                            }}
                        >
                            {personnel.status === 'active' ? (
                                <UserRoundX className="h-5 w-5" />
                            ) : (
                                <UserRoundCheck className="h-5 w-5" />
                            )}
                        </button>
                    </Can>
                </div>
            );
        },
    },
];