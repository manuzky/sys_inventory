import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Can } from '@/components/can';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';

interface Position {
    id: number;
    name: string;
    description: string | null;
    active: boolean;
}

interface Props {
    positions: Position[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cargos',
        href: '/positions',
    },
];

export default function Index({ positions }: Props) {

    function toggleActive(position: Position) {
        router.put(route('positions.update', position.id), {
            ...position,
            active: !position.active,
        }, {
            preserveScroll: true,
        });
    }

    function destroy(id: number) {
        if (!confirm('¿Seguro que deseas eliminar este cargo?')) return;

        router.delete(route('positions.destroy', id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cargos" />

            <div className="p-6 space-y-4">

                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">
                        Cargos
                    </h1>

                    <Can permission="positions.create">
                        <Link href={route('positions.create')}>
                            <Button>
                                Nuevo cargo
                            </Button>
                        </Link>
                    </Can>
                </div>

                <div className="border rounded-lg">
                    <Table>

                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Descripción</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right">
                                    Acciones
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {positions.map((position) => (
                                <TableRow key={position.id}>

                                    <TableCell className="font-medium">
                                        {position.name}
                                    </TableCell>

                                    <TableCell>
                                        {position.description ?? '—'}
                                    </TableCell>

                                    <TableCell>
                                        <span className={`
                                            px-2 py-1 rounded text-xs
                                            ${position.active
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-600'
                                            }
                                        `}>
                                            {position.active ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </TableCell>

                                    <TableCell className="text-right space-x-2">

                                        <Button
                                            variant="outline"
                                            onClick={() => toggleActive(position)}
                                        >
                                            {position.active ? 'Desactivar' : 'Activar'}
                                        </Button>

                                        <Can permission='positions.edit'>
                                            <Link href={route('positions.edit', position.id)}>
                                                <Button variant="outline">
                                                    Editar
                                                </Button>
                                            </Link>
                                        </Can>

                                        <Can permission='positions.delete'>
                                            <Button
                                                variant="destructive"
                                                onClick={() => destroy(position.id)}
                                            >
                                                Eliminar
                                            </Button>
                                        </Can>

                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </div>

            </div>
        </AppLayout>
    );
}