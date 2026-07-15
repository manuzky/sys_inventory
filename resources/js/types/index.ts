import { LucideIcon } from 'lucide-react';

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    permission?: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

/* -------------------- PERSONNEL -------------------- */

export type Personnel = {
    id: number;
    first_name: string;
    last_name: string;
    id_number: string;
    email: string;
    birth_date: string;
    gender: string;
    phone: string;
    address: string;
    status: string;
};

/* -------------------- USER -------------------- */

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;

    avatar?: string | null;

    personnel?: {
        photo?: string | null;
    } | null;

    [key: string]: unknown;
}

/* -------------------- AUTH -------------------- */

export interface Auth {
    user: User | null;
}

/* -------------------- SHARED DATA -------------------- */

export interface SharedData {
    name: string;
    quote: { message: string; author: string };

    auth: Auth;

    permissions?: string[];
    roles?: string[];

    [key: string]: unknown;
}