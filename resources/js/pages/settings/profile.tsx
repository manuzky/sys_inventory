import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { PersonnelShowContent } from '@/pages/Personnel/Show';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Datos personales',
        href: '/settings/profile',
    },
];

type PageProps = {
    personnel: any;
    current_position: any;
    history: any[];
};

export default function Profile() {
    const { personnel, current_position, history } =
        usePage<PageProps & Record<string, unknown>>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Datos personales" />

            <SettingsLayout>
                <PersonnelShowContent
                    personnel={personnel}
                    current_position={current_position}
                    history={history}
                />
            </SettingsLayout>
        </AppLayout>
    );
}