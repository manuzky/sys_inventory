import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface NavItem {
    title: string;
    url: string;
    icon?: any;
    permission?: string;
}

interface NavGroup {
    title: string;
    icon?: any;
    items: NavItem[];
}

interface Props {
    homeItems: NavItem[];
    inventoryItems: NavItem[];
    configGroups?: NavGroup[];
}

export function NavMain({
    homeItems,
    inventoryItems,
    configGroups,
}: Props) {
    const page = usePage();
    const currentUrl = page.url;

    const isActive = (item: NavItem) => {
        if (item.url === '/roles') {
            return (
                currentUrl.startsWith('/roles') ||
                currentUrl.startsWith('/permissions')
            );
        }

        return currentUrl.startsWith(item.url);
    };

    return (
        <>
            {/* INICIO */}
            <SidebarGroup className="px-2 py-0">
                <SidebarGroupLabel>Inicio</SidebarGroupLabel>

                <SidebarMenu>
                    {homeItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={isActive(item)}
                            >
                                <Link href={item.url}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>

            {/* INVENTARIO */}
            {inventoryItems.length > 0 && (
                <SidebarGroup className="px-2 py-2">
                    <SidebarGroupLabel>Inventario</SidebarGroupLabel>

                    <SidebarMenu>
                        {inventoryItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isActive(item)}
                                >
                                    <Link href={item.url}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            )}

            {/* CONFIGURACIÓN */}
            {configGroups && configGroups.length > 0 && (
                <SidebarGroup className="px-2 py-2">
                    <SidebarGroupLabel>Configuración</SidebarGroupLabel>

                    <SidebarMenu>
                        {configGroups.map((group) => {
                            const groupIsActive = group.items.some((item) =>
                                isActive(item)
                            );

                            return (
                                <Collapsible
                                    key={group.title}
                                    defaultOpen={groupIsActive}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton>
                                                {group.icon && <group.icon />}

                                                <span>{group.title}</span>

                                                <ChevronRight
                                                    className="
                                                        ml-auto
                                                        transition-transform
                                                        group-data-[state=open]/collapsible:rotate-90
                                                    "
                                                />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>

                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {group.items.map((item) => (
                                                    <SidebarMenuSubItem
                                                        key={item.title}
                                                    >
                                                        <SidebarMenuSubButton
                                                            asChild
                                                            isActive={isActive(
                                                                item
                                                            )}
                                                        >
                                                            <Link
                                                                href={item.url}
                                                            >
                                                                {item.icon && (
                                                                    <item.icon />
                                                                )}

                                                                <span>
                                                                    {item.title}
                                                                </span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            )}
        </>
    );
}