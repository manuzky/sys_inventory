import { ColumnDef } from "@tanstack/react-table";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";

export type User = {
    id: number;
    name: string;
    username: string;
    email: string | null;
    active: boolean;

    personnel: {
        first_name: string;
        last_name: string;
    } | null;
};

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "username",
        header: "Usuario",
    },

    {
        accessorKey: "name",
        header: "Nombre",
    },

    {
        accessorKey: "email",
        header: "Correo",
    },

    {
        id: "personnel",
        header: "Personal",
        cell: ({ row }) => {
            const personnel = row.original.personnel;

            if (!personnel) {
                return "Sin asignar";
            }

            return `${personnel.first_name} ${personnel.last_name}`;
        },
    },

    {
        accessorKey: "active",
        header: "Estado",
        cell: ({ row }) =>
            row.original.active
                ? "Activo"
                : "Inactivo",
    },

    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => (
            <div className="flex gap-2">

                <Link href={route('users.show', row.original.id)}>
                    <Button
                        variant="outline"
                        size="sm"
                    >
                        Ver
                    </Button>
                </Link>

                <Link href={route('users.edit', row.original.id)}>
                    <Button
                        variant="outline"
                        size="sm"
                    >
                        Editar
                    </Button>
                </Link>

            </div>
        ),
    },
];