import { Link, usePage } from '@inertiajs/react';

interface LinkItem {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    links: LinkItem[];
}
export function Pagination({ links }: Props) {
    const { url } = usePage();

    return (
        <div className="flex gap-1 mt-4 justify-start">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url ?? ''}
                    preserveState
                    preserveScroll
                    className={`px-3 py-1 border rounded ${
                        link.active ? 'bg-black text-white' : ''
                    } ${!link.url ? 'opacity-50 pointer-events-none' : ''}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}