import { ColumnDef } from '@tanstack/react-table';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';

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
                    <Button asChild size="sm" variant="outline">
                        <Link href={route('permissions.edit', permission.id)}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>

                    <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                            if (
                                confirm(
                                    `¿Deseas eliminar el permiso "${permission.display_name}"?`
                                )
                            ) {
                                router.delete(
                                    route('permissions.destroy', permission.id)
                                );
                            }
                        }}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            );
        },
    },
];