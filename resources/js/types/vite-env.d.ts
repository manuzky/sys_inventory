/// <reference types="vite/client" />
import { PageProps } from './inertia';

declare module '@inertiajs/core' {
    interface PageProps extends PageProps {}
}