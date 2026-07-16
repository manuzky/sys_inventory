import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone, MapPin, Briefcase, CalendarDays, User, IdCard, Cake, Venus, Mars, Heart, ShieldCheck, UserCircle, Users, History, Clock } from 'lucide-react';

interface EmergencyContact {
    id: number;
    name: string;
    phone: string;
    secondary_phone: string | null;
    relationship: {
        name: string;
    };
}

interface Personnel {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    document_type: string;
    id_number: string;
    email: string;
    birth_date: string;
    gender: string;
    marital_status: string;
    phone: string | null;
    secondary_phone: string | null;
    address: string | null;
    status: string;
    hire_date: string;
    photo: string | null;
    emergency_contacts: EmergencyContact[];
}

interface Position {
    id: number;
    name: string;
}

interface History {
    id: number;
    position: Position;
    start_date: string;
    end_date: string | null;
}

interface Props {
    personnel: Personnel;
    current_position: History | null;
    history: History[];
}

function formatDate(date?: string | null) {
    if (!date) return 'No registrado';

    return new Intl.DateTimeFormat('es-VE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).format(new Date(date));
}

function getAge(date?: string | null) {
    if (!date) return '-';

    const birth = new Date(date);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();

    if (
        today.getMonth() < birth.getMonth() ||
        (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
    ) {
        age--;
    }

    return `${age} años`;
}

function Info({ icon: Icon, label, value }: any) {
    return (
        <div className="flex gap-3">
            <Icon className="h-5 w-5 mt-1 text-primary shrink-0" />
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="font-medium">{value || 'No registrado'}</p>
            </div>
        </div>
    );
}

function Section({ icon: Icon, title, description, children }: any) {
    return (
        <Card className="bg-muted/40 shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    {title}
                </CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
}

export default function Show({ personnel, current_position, history }: Props) {

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Personal', href: '/personnel' },
        { title: personnel.full_name, href: `/personnel/${personnel.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={personnel.full_name} />

            <div className="max-w-7xl mx-auto p-6 space-y-8">

                <Card>
                    <CardContent className="p-8">
                        <div className="flex flex-col lg:flex-row gap-8">

                            <Avatar className="h-44 w-44 mx-auto lg:mx-0 border">
                                <AvatarImage src={personnel.photo ? `/storage/${personnel.photo}` : undefined} />
                                <AvatarFallback className="text-5xl font-bold">
                                    {personnel.first_name[0]}{personnel.last_name[0]}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">

                                <div className="flex flex-col lg:flex-row justify-between gap-4">

                                    <div>
                                        <h1 className="text-4xl font-bold">
                                            {personnel.full_name}
                                        </h1>

                                        <p className="mt-2 text-lg text-muted-foreground flex items-center gap-2">
                                            <Briefcase className="h-5 w-5" />
                                            {current_position?.position.name ?? 'Sin cargo asignado'}
                                        </p>
                                    </div>

                                    <Badge className="h-fit px-4 py-2">
                                        {personnel.status === 'active' ? 'Activo' : 'Inactivo'}
                                    </Badge>

                                </div>

                                <div className="grid md:grid-cols-4 gap-6 mt-8">
                                    <Info icon={IdCard} label="Documento" value={`${personnel.document_type}-${personnel.id_number}`} />
                                    <Info icon={Mail} label="Correo" value={personnel.email} />
                                    <Info icon={Phone} label="Teléfono" value={personnel.phone} />
                                    <Info icon={CalendarDays} label="Ingreso" value={formatDate(personnel.hire_date)} />
                                </div>

                            </div>

                        </div>
                    </CardContent>
                </Card>

                                <div className="grid lg:grid-cols-2 gap-8">

                    <Section
                        icon={User}
                        title="Información personal"
                        description="Datos personales registrados del empleado."
                    >
                        <div className="space-y-6">

                            <Info
                                icon={IdCard}
                                label="Documento"
                                value={`${personnel.document_type}-${personnel.id_number}`}
                            />

                            <Info
                                icon={Cake}
                                label="Fecha de nacimiento"
                                value={`${formatDate(personnel.birth_date)} (${getAge(personnel.birth_date)})`}
                            />

                            <Info
                                icon={personnel.gender === 'male' ? Mars : Venus}
                                label="Sexo"
                                value={personnel.gender === 'male' ? 'Masculino' : 'Femenino'}
                            />

                            <Info
                                icon={Heart}
                                label="Estado civil"
                                value={{
                                    single: 'Soltero(a)',
                                    married: 'Casado(a)',
                                    divorced: 'Divorciado(a)',
                                    widowed: 'Viudo(a)',
                                }[personnel.marital_status]}
                            />

                        </div>
                    </Section>


                    <Section
                        icon={Briefcase}
                        title="Información laboral"
                        description="Datos relacionados al puesto y estado del trabajador."
                    >
                        <div className="space-y-6">

                            <Info
                                icon={Briefcase}
                                label="Cargo actual"
                                value={current_position?.position.name}
                            />

                            <Info
                                icon={CalendarDays}
                                label="Fecha de ingreso"
                                value={formatDate(personnel.hire_date)}
                            />

                            <Info
                                icon={ShieldCheck}
                                label="Estado"
                                value={personnel.status === 'active' ? 'Activo' : 'Inactivo'}
                            />

                            <Info
                                icon={UserCircle}
                                label="Antigüedad"
                                value={getAge(personnel.hire_date)}
                            />

                        </div>
                    </Section>

                </div>


                <Section
                    icon={Phone}
                    title="Información de contacto"
                    description="Datos disponibles para comunicación."
                >

                    <div className="grid md:grid-cols-2 gap-6">

                        <Info
                            icon={Mail}
                            label="Correo electrónico"
                            value={personnel.email}
                        />

                        <Info
                            icon={Phone}
                            label="Teléfono principal"
                            value={personnel.phone}
                        />

                        <Info
                            icon={Phone}
                            label="Teléfono secundario"
                            value={personnel.secondary_phone}
                        />

                        <Info
                            icon={MapPin}
                            label="Dirección"
                            value={personnel.address}
                        />

                    </div>

                </Section>


                <Section
                    icon={Users}
                    title="Contactos de emergencia"
                    description="Personas a contactar en caso de emergencia."
                >

                    {personnel.emergency_contacts?.length > 0 ? (

                        <div className="grid md:grid-cols-2 gap-6">

                            {personnel.emergency_contacts.map((contact) => (

                                <Card key={contact.id} className="bg-background">

                                    <CardContent className="p-5 space-y-4">

                                        <div>

                                            <h3 className="font-semibold text-lg">
                                                {contact.name}
                                            </h3>

                                            <p className="text-sm text-muted-foreground">
                                                {contact.relationship?.name ?? 'Sin relación'}
                                            </p>

                                        </div>

                                        <Info
                                            icon={Phone}
                                            label="Teléfono"
                                            value={contact.phone}
                                        />

                                        <Info
                                            icon={Phone}
                                            label="Teléfono secundario"
                                            value={contact.secondary_phone}
                                        />

                                    </CardContent>

                                </Card>

                            ))}

                        </div>

                    ) : (

                        <p className="text-sm text-muted-foreground">
                            No hay contactos de emergencia registrados.
                        </p>

                    )}

                </Section>

                <Section
                    icon={History}
                    title="Historial de cargos"
                    description="Registro histórico de posiciones ocupadas."
                >

                    {history.length > 0 ? (

                        <div className="relative space-y-8 ml-3">

                            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

                            {history.map((item) => (

                                <div
                                    key={item.id}
                                    className="relative pl-8"
                                >

                                    <div className="absolute left-0 top-1 h-4 w-4 rounded-full border bg-background" />

                                    <Card className="bg-background">

                                        <CardContent className="p-5">

                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                                                <div>

                                                    <h3 className="font-semibold text-lg">
                                                        {item.position.name}
                                                    </h3>

                                                    <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                                        <Clock className="h-4 w-4" />

                                                        {formatDate(item.start_date)}
                                                        {' → '}
                                                        {item.end_date
                                                            ? formatDate(item.end_date)
                                                            : 'Actual'}
                                                    </p>

                                                </div>

                                                {!item.end_date && (

                                                    <Badge>
                                                        Actual
                                                    </Badge>

                                                )}

                                            </div>

                                        </CardContent>

                                    </Card>

                                </div>

                            ))}

                        </div>

                    ) : (

                        <p className="text-sm text-muted-foreground">
                            No existe historial de cargos registrado.
                        </p>

                    )}

                </Section>


            </div>

        </AppLayout>

    );

}