import { useCan } from '@/lib/useCan';

type Props = {
    permission: string | string[];
    children: React.ReactNode;
};

export function Can({ permission, children }: Props) {
    const { can } = useCan();

    const hasPermission = Array.isArray(permission)
        ? permission.some((p) => can(p))
        : can(permission);

    if (!hasPermission) return null;

    return <>{children}</>;
}