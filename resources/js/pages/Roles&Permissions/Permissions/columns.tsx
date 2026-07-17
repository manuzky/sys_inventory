import { ColumnDef } from '@tanstack/react-table';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';
import { Can } from '@/components/can';
import { notify } from '@/lib/notify';

export interface Permission {
    id: number;
    display_name: string;
    name: string;
}

export const columns: ColumnDef<Permission>[] = [
    {
        accessorKey: 'display_name',
        header: 'Nombre Visible',
    },
    {
        accessorKey: 'name',
        header: 'Nombre Técnico',
    },
    {
        id: 'actions',
        header: 'Acciones',
        cell: ({ row }) => {
            const permission = row.original;

            return (
                <div className="flex items-center gap-2">
                    <Can permission='permissions.edit'>
                        <Button asChild size="sm" variant="outline">
                            <Link href={route('permissions.edit', permission.id)}>
                                <Pencil className="h-4 w-4" />
                            </Link>
                        </Button>
                    </Can>

                    <Can permission='permissions.delete'>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                                if (
                                    confirm(
                                        `¿Deseas eliminar el permiso "${permission.display_name}"?`
                                    )
                                ) {
                                    router.delete(route('permissions.destroy', permission.id), {
                                        onSuccess: () => {
                                            notify.success('Permiso eliminado correctamente.');
                                        },
                                        onError: () => {
                                            notify.error('No se pudo eliminar el permiso.');
                                        },
                                    });
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