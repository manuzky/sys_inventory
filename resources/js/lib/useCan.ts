import { usePage } from '@inertiajs/react';

type Auth = {
    permissions?: string[];
};

export function useCan() {
    const { auth } = usePage().props as { auth?: Auth };

    const permissions: string[] = auth?.permissions ?? [];

    function can(permission: string) {
        return permissions.includes(permission);
    }

    return { can };
}