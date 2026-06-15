import { useCan } from '@/lib/useCan';

type Props = {
    permission: string;
    children: React.ReactNode;
};

export function Can({ permission, children }: Props) {
    const { can } = useCan();

    if (!can(permission)) return null;

    return <>{children}</>;
}