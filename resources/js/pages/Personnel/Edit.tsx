import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { useState } from 'react';
import Form from './Form';
import { notify } from '@/lib/notify';

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
    gender: string | null;
    hire_date: string;
    position_id?: number | null;
    photo?: string | null;
    curriculum?: string | null;
}

interface Position {
    id: number;
    name: string;
    active: boolean;
}

interface Props {
    personnel: Personnel;
    positions: Position[];
    current_position_id?: number | null;
}

export default function Edit({
    personnel,
    positions,
    current_position_id,
}: Props) {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Personal',
            href: '/personnel',
        },
        {
            title: 'Editar',
            href: `/personnel/${personnel.id}/edit`,
        },
    ];

    const parseLocalDate = (dateString: string) => {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    };
    
    const [date, setDate] = useState<Date | undefined>(
        personnel.birth_date
            ? parseLocalDate(personnel.birth_date)
            : undefined
    );

    const [hireDate, setHireDate] = useState<Date | undefined>(
        personnel.hire_date
            ? parseLocalDate(personnel.hire_date)
            : undefined
    );
    
    const emailParts = personnel.email?.split('@') ?? ['', ''];

    const emailDomain =
        emailParts[1] &&
        ['gmail.com', 'hotmail.com', 'outlook.com'].includes(emailParts[1])
            ? `@${emailParts[1]}`
            : 'other';

    const emailCustomDomain =
        emailDomain === 'other' ? `@${emailParts[1]}` : '';
    const phoneCode = personnel.phone?.substring(0, 4) ?? '0412';
    const phoneNumber = personnel.phone?.substring(4) ?? '';

    const secondaryPhoneCode =
        personnel.secondary_phone?.substring(0, 4) ?? '0412';

    const secondaryPhoneNumber =
        personnel.secondary_phone?.substring(4) ?? '';

    const { data, setData, post, processing, errors } = useForm({
        first_name: personnel.first_name ?? '',
        last_name: personnel.last_name ?? '',
        document_type: personnel.document_type ?? 'V',
        id_number: personnel.id_number ?? '',
        email_local: emailParts[0] ?? '',
        email_domain: emailDomain,
        email_custom_domain: emailCustomDomain,
        birth_date: personnel.birth_date ?? '',
        marital_status: personnel.marital_status ?? '',
        phone_code: phoneCode,
        phone: phoneNumber,
        secondary_phone_code: secondaryPhoneCode,
        secondary_phone: secondaryPhoneNumber,
        address: personnel.address ?? '',
        gender: personnel.gender ?? '',
        hire_date: personnel.hire_date ?? '',
        position_id: current_position_id ?? '',
        photo: null as File | null,
        curriculum: null as File | null,
        photo_remove: false,
        curriculum_remove: false,
        _method: 'put',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();

        post(route('personnel.update', personnel.id), {
            forceFormData: true,
            onSuccess: () => { notify.success('Personal editado correctamente'); },
            onError: () => { notify.error('Revisa los datos del formulario'); },
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Personal" />

            <div className="p-6 w-full space-y-6">

                <Form
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    date={date}
                    setDate={setDate}
                    hireDate={hireDate}
                    setHireDate={setHireDate}
                    positions={positions}
                    currentPhoto={personnel.photo}
                    currentCurriculum={personnel.curriculum}
                    onSubmit={submit}
                    submitLabel="Actualizar"
                />
            </div>
        </AppLayout>
    );
}