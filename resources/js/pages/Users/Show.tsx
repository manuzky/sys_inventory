import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Can } from '@/components/can';
import {
    CalendarDays,
    ExternalLink,
    IdCard,
    Mail,
    Phone,
    ShieldCheck,
    UserCircle,
    UserCog,
    Briefcase,
} from 'lucide-react';

interface Personnel {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string | null;
    document_type: string;
    id_number: string;
    phone: string | null;
    status: string;
    photo: string | null;
    position: string | null;
}

interface User {
    id: number;
    username: string;
    email: string | null;
    active: boolean;
    created_at: string;
    roles: string[];
    personnel: Personnel | null;
}

interface Props {
    user: User;
}

function Info({
    icon: Icon,
    label,
    value,
}: {
    icon: any;
    label: string;
    value: string | null;
}) {

    return (
        <div className="space-y-1">

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="h-4 w-4" />
                {label}
            </div>

            <p className="font-medium">
                {value ?? 'No registrado'}
            </p>

        </div>
    );
}

export default function Show({ user }: Props) {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Usuarios',
            href: '/users',
        },
        {
            title: user.username,
            href: `/users/${user.id}`,
        },
    ];

    const personnel = user.personnel;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Usuario ${user.username}`} />

            <div className="p-6 max-w-6xl space-y-6">

                <Card>

                    <CardContent className="p-8">

                        <div className="flex flex-col lg:flex-row gap-8">

                            <Avatar className="h-44 w-44 mx-auto lg:mx-0 border">

                                <AvatarImage
                                    className="object-cover"
                                    src={
                                        personnel?.photo
                                            ? `/storage/${personnel.photo}`
                                            : undefined
                                    }
                                />

                                <AvatarFallback className="text-5xl font-bold">
                                    {personnel
                                        ? `${personnel.first_name[0]}${personnel.last_name[0]}`
                                        : user.username.substring(0, 2).toUpperCase()
                                    }
                                </AvatarFallback>

                            </Avatar>


                            <div className="flex-1">

                                <div className="flex flex-col lg:flex-row justify-between gap-4">

                                    <div>

                                        <h1 className="text-4xl font-bold">
                                            {personnel?.full_name ?? user.username}
                                        </h1>

                                        <p className="mt-2 text-lg text-muted-foreground flex items-center gap-2">
                                            <UserCircle className="h-5 w-5" />
                                            Usuario del sistema: {user.username}
                                        </p>

                                    </div>


                                    <Badge
                                        className="h-fit px-4 py-2"
                                    >
                                        {user.active ? 'Usuario Activo' : 'Usuario Inactivo'}
                                    </Badge>

                                </div>
                                
                                <Can permission="personnel.view">
                                    {personnel && (
                                        <div className="mt-8">

                                            <Link
                                                href={route('personnel.show', personnel.id)}
                                                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                                            >
                                                Ver ficha completa del personal
                                                <ExternalLink className="h-4 w-4" />
                                            </Link>

                                        </div>
                                    )}
                                </Can>

                                <div className="grid md:grid-cols-4 gap-6 mt-8">

                                    <Info
                                        icon={Mail}
                                        label="Correo usuario"
                                        value={user.email}
                                    />

                                    <Info
                                        icon={CalendarDays}
                                        label="Creado"
                                        value={user.created_at}
                                    />

                                    <Info
                                        icon={ShieldCheck}
                                        label="Estado cuenta"
                                        value={user.active ? 'Activo' : 'Inactivo'}
                                    />

                                    <Info
                                        icon={UserCog}
                                        label="Roles"
                                        value={
                                            user.roles.length
                                                ? user.roles.join(', ')
                                                : 'Sin roles'
                                        }
                                    />

                                </div>

                            </div>

                        </div>

                    </CardContent>

                </Card>

            </div>

        </AppLayout>
    );
}