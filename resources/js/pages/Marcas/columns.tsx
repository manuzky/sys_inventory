import { ColumnDef } from "@tanstack/react-table";

export type Marca = {
    id: number;
    nombre: string;
    descripcion: string | null;
    estado: boolean;
};

export const columns: ColumnDef<Marca>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },

    {
        accessorKey: "nombre",
        header: "Nombre",
    },

    {
        accessorKey: "descripcion",
        header: "Descripción",
        cell: ({ row }) => {
            return row.original.descripcion ?? "Sin descripción";
        },
    },

    {
        accessorKey: "estado",
        header: () => (
            <div className="text-right">
                Estado
            </div>
        ),

        cell: ({ row }) => {
            const estado = row.original.estado;

            return (
                <div className="flex justify-end">
                    <span
                        className={`
                            px-2 py-1 rounded text-xs
                            ${
                                estado
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }
                        `}
                    >
                        {
                            estado
                                ? "Activo"
                                : "Inactivo"
                        }
                    </span>
                </div>
            );
        },
    },
];