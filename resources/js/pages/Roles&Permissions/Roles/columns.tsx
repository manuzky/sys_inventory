import { ColumnDef } from '@tanstack/react-table';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Can } from '@/components/can';

export interface Role {
    id: number;
    name: string;
    permissions_count: number;
    users_count: number;
}

export const columns: ColumnDef<Role>[] = [
    {
        accessorKey: 'name',
        header: 'Rol',
    },
    {
        accessorKey: 'permissions_count',
        header: 'Permisos',
    },
    {
        accessorKey: 'users_count',
        header: 'Usuarios',
    },
    {
        id: 'actions',
        header: 'Acciones',
        cell: ({ row }) => {

            const role = row.original;

            return (
                <div className="flex gap-2">

                    <Link
                        href={route('roles.show', role.id)}
                    >
                        <Button
                            variant="outline"
                            size="sm"
                        >
                            Ver
                        </Button>
                    </Link>

                    <Can permission='roles.edit'>
                        <Link
                            href={route('roles.edit', role.id)}
                        >
                            <Button
                                variant="outline"
                                size="sm"
                            >
                                Editar
                            </Button>
                        </Link>
                    </Can>

                </div>
            );
        },
    },
];