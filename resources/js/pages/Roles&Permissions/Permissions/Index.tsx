import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { type BreadcrumbItem } from '@/types';

const groupLabels: Record<string, string> = {
    personnel: 'Personal',
    users: 'Usuarios',
    roles: 'Roles',
    permissions: 'Permisos',
    positions: 'Cargos',
};

interface Permission {
    id: number;
    name: string;
    display_name: string;
}

interface Props {
    permissions: Record<string, Permission[]>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Permisos',
        href: '/permissions',
    },
];

export default function Index({ permissions }: Props) {

    const formatGroupName = (group: string) => {
        return groupLabels[group]
            ?? group.charAt(0).toUpperCase() + group.slice(1);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permisos" />

            <div className="p-6 space-y-4">

                {/* HEADER */}
                <div className="flex justify-between items-center">

                    <div className="flex items-center gap-2">
                        <Link href={route('roles.index')}>
                            <Button variant="outline" size="sm">
                                Roles
                            </Button>
                        </Link>

                        <Button variant="default" size="sm">
                            Permisos
                        </Button>
                    </div>

                    <Link href={route('permissions.create')}>
                        <Button>
                            Nuevo permiso
                        </Button>
                    </Link>
                </div>

                {/* ACCORDION DE GRUPOS */}
                <Accordion type="single" collapsible className="w-full space-y-3">

                    {Object.entries(permissions).map(([group, items]) => (
                        <AccordionItem key={group} value={group} className="border rounded-lg px-4">
                            <AccordionTrigger className="text-base font-semibold flex justify-between">
                                <span>{formatGroupName(group)}</span>

                                <span className="text-xs text-muted-foreground">
                                    {items.length} permisos
                                </span>
                            </AccordionTrigger>

                            <AccordionContent className="pt-3">
                                <DataTable columns={columns} data={items} />
                            </AccordionContent>
                        </AccordionItem>
                    ))}

                </Accordion>

            </div>
        </AppLayout>
    );
}