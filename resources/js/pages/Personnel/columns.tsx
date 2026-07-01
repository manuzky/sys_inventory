import { ColumnDef } from '@tanstack/react-table';
import { Eye, Pencil, UserRoundX, UserRoundCheck } from 'lucide-react';
import { router } from '@inertiajs/react';
import { Can } from '@/components/can'
import { notify } from '@/lib/notify';

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
        header: () => (
            <div className="text-right">
                Estado
            </div>
        ),

        cell: ({ row }) => {
            const status = row.getValue('status') as string;

            const config: Record<
                string,
                {
                    label: string;
                    className: string;
                }
            > = {
                active: {
                    label: 'Activo',
                    className: 'bg-green-100 text-green-700',
                },
                inactive: {
                    label: 'Inactivo',
                    className: 'bg-red-100 text-red-700',
                },
                vacation: {
                    label: 'Vacaciones',
                    className: 'bg-yellow-100 text-yellow-700',
                },
                suspended: {
                    label: 'Suspendido',
                    className: 'bg-orange-100 text-orange-700',
                },
            };

            const current = config[status] ?? {
                label: status,
                className: 'bg-gray-100 text-gray-700',
            };

            return (
                <div className="flex justify-end">
                    <span
                        className={`px-2 py-1 rounded text-xs ${current.className}`}
                    >
                        {current.label}
                    </span>
                </div>
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

                <div className="flex justify-end items-center gap-2">

                    <a
                        href={`/personnel/${personnel.id}`}
                        title="Ver"
                        className="
                            inline-flex h-9 w-9 items-center justify-center
                            rounded-md border bg-background
                            text-blue-600
                            hover:border-blue-300
                            hover:bg-blue-50
                            hover:text-blue-700
                            transition-colors
                        "
                    >
                        <Eye className="h-4 w-4" />
                    </a>

                    <Can permission="personnel.edit">
                        <a
                            href={`/personnel/${personnel.id}/edit`}
                            title="Editar"
                            className="
                                inline-flex h-9 w-9 items-center justify-center
                                rounded-md border bg-background
                                text-yellow-600
                                hover:border-yellow-300
                                hover:bg-yellow-50
                                hover:text-yellow-700
                                transition-colors
                            "
                        >
                            <Pencil className="h-4 w-4" />
                        </a>
                    </Can>

                    <Can permission="personnel.toggle-status">
                        <button
                            title={
                                personnel.status === 'active'
                                    ? 'Desactivar personal'
                                    : 'Activar personal'
                            }
                            className={`
                                group inline-flex h-9 w-9 items-center justify-center
                                rounded-md border bg-background transition-colors
                                ${
                                    personnel.status === 'active'
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

                                        onSuccess: () => {
                                            notify.success(
                                                personnel.status === 'active'
                                                    ? 'Personal desactivado correctamente.'
                                                    : 'Personal activado correctamente.'
                                            );
                                        },

                                        onError: () => {
                                            notify.error(
                                                'No se pudo cambiar el estado del personal.'
                                            );
                                        },
                                    }
                                );
                            }}
                        >
                            {personnel.status === 'active' ? (
                                <>
                                    <UserRoundCheck className="h-4 w-4 group-hover:hidden" />
                                    <UserRoundX className="hidden h-4 w-4 group-hover:block" />
                                </>
                            ) : (
                                <>
                                    <UserRoundX className="h-4 w-4 group-hover:hidden" />
                                    <UserRoundCheck className="hidden h-4 w-4 group-hover:block" />
                                </>
                            )}
                        </button>
                    </Can>
                </div>
            );
        },
    },
];