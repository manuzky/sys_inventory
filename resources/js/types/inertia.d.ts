import { PageProps as InertiaPageProps } from '@inertiajs/core';

export interface AuthUser {
    id: number;
    name: string;
    email: string;
    permissions: string[];
    roles: string[];
}

export interface PageProps extends InertiaPageProps {
    auth: {
        user: AuthUser;
        permissions: string[];
        roles: string[];
    };
}