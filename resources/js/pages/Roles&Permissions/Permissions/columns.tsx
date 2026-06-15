import { ColumnDef } from '@tanstack/react-table';

export interface Permission {
    id: number;
    name: string;
}

export const columns: ColumnDef<Permission>[] = [
    {
        accessorKey: 'name',
        header: 'Permiso',
    },
];