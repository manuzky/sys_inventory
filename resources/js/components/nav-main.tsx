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
import { Can } from './can';

interface NavItem {
    title: string;
    url: string;
    icon?: any;
}

interface NavGroup {
    title: string;
    items: NavItem[];
}

interface AdminGroup {
    title: string;
    icon?: any;
    items: NavItem[];
}

interface Props {
    platformItems: NavItem[];
    adminGroup?: AdminGroup;
}

export function NavMain({ platformItems, adminGroup }: Props) {
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

    const adminIsActive =
        adminGroup?.items.some((item) => isActive(item)) ?? false;

    return (
        <>
            {/* PLATFORM */}
            <SidebarGroup className="px-2 py-0">
                <SidebarGroupLabel>Platform</SidebarGroupLabel>

                <SidebarMenu>
                    {platformItems.map((item) => (
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

            {/* ADMINISTRADOR */}
             <Can permission={[ 'personnel.view', 'positions.view', 'users.view', 'roles.view', ]}>
                <SidebarGroup className="px-2 py-2">
                    <SidebarGroupLabel>Administrador</SidebarGroupLabel>

                    <SidebarMenu>
                        <Collapsible
                            defaultOpen={adminIsActive}
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton>
                                        {adminGroup?.icon && <adminGroup.icon />}
                                        <span>{adminGroup?.title}</span>

                                        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>

                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {adminGroup?.items.map((item) => (
                                            <SidebarMenuSubItem key={item.title}>
                                                <SidebarMenuSubButton
                                                    asChild
                                                    isActive={isActive(item)}
                                                >
                                                    <Link href={item.url}>
                                                        {item.icon && <item.icon />}
                                                        <span>{item.title}</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    </SidebarMenu>
                </SidebarGroup>
             </Can>
        </>
    );
}