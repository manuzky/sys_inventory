import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

interface Personnel {
    id: number;
    first_name: string;
    last_name: string;

    document_type: string;
    id_number: string;

    email: string;

    birth_date: string;
    marital_status: string;

    phone: string | null;
    secondary_phone: string | null;

    address: string | null;

    gender: string;

    status: string;

    hire_date: string;

    photo: string | null;
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

function Info({ label, value }: { label: string; value: any }) {
    return (
        <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">
                {label}
            </span>
            <span className="font-medium">
                {value ?? 'No registrado'}
            </span>
        </div>
    );
}

function Badge({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center px-2 py-1 text-xs rounded bg-gray-100 border">
            {children}
        </span>
    );
}

export default function Show({
    personnel,
    current_position,
    history,
}: Props) {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Personal',
            href: '/personnel',
        },
        {
            title: `${personnel.first_name} ${personnel.last_name}`,
            href: `/personnel/${personnel.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ver Personal" />

            <div className="p-6 max-w-5xl space-y-6">

                {/* ================= HEADER ================= */}
                <div className="flex items-center justify-between">

                    <h1 className="text-2xl font-bold">
                        Ficha del Personal
                    </h1>

                    <Badge>
                        {personnel.status === 'active'
                            ? 'Activo'
                            : 'Inactivo'}
                    </Badge>

                </div>

                {/* ================= CARD PRINCIPAL ================= */}
                <div className="border rounded-lg p-6">

                    <div className="grid md:grid-cols-[180px_1fr] gap-6">

                        {/* FOTO */}
                        <div className="flex justify-center">

                            {personnel.photo ? (
                                <img
                                    src={`/storage/${personnel.photo}`}
                                    alt={`${personnel.first_name} ${personnel.last_name}`}
                                    className="h-40 w-40 rounded-full object-cover border"
                                />
                            ) : (
                                <div className="h-40 w-40 rounded-full border flex items-center justify-center text-sm text-muted-foreground">
                                    Sin foto
                                </div>
                            )}

                        </div>

                        {/* DATOS */}
                        <div className="grid md:grid-cols-2 gap-4">

                            {/* PERSONALES */}
                            <Info label="Nombre" value={personnel.first_name} />
                            <Info label="Apellido" value={personnel.last_name} />

                            <Info
                                label="Documento"
                                value={`${personnel.document_type}-${personnel.id_number}`}
                            />

                            <Info label="Correo" value={personnel.email} />

                            <Info
                                label="Fecha de nacimiento"
                                value={personnel.birth_date}
                            />

                            <Info
                                label="Sexo"
                                value={
                                    personnel.gender === 'male'
                                        ? 'Masculino'
                                        : 'Femenino'
                                }
                            />

                            <Info
                                label="Estado civil"
                                value={personnel.marital_status}
                            />

                            {/* CONTACTO */}
                            <Info label="Teléfono" value={personnel.phone} />
                            <Info
                                label="Segundo teléfono"
                                value={personnel.secondary_phone}
                            />

                            <Info label="Dirección" value={personnel.address} />

                            {/* LABORAL */}
                            <Info label="Fecha de ingreso" value={personnel.hire_date} />

                            <Info
                                label="Cargo actual"
                                value={current_position?.position?.name}
                            />

                        </div>

                    </div>
                </div>

                {/* ================= HISTORIAL ================= */}
                <div>

                    <h2 className="text-lg font-semibold mb-3">
                        Historial de cargos
                    </h2>

                    <div className="space-y-3">

                        {history.length === 0 && (
                            <div className="text-sm text-muted-foreground">
                                Sin historial registrado
                            </div>
                        )}

                        {history.map((item) => (
                            <div
                                key={item.id}
                                className="border rounded p-4"
                            >

                                <div className="font-medium">
                                    {item.position.name}
                                </div>

                                <div className="text-sm text-muted-foreground">
                                    {item.start_date} →{' '}
                                    {item.end_date ?? 'Actual'}
                                </div>

                            </div>
                        ))}

                    </div>

                </div>

            </div>
        </AppLayout>
    );
}