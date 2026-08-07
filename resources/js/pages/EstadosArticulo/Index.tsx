import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { Can } from '@/components/can';
import { DataTable } from '@/components/data-table';
import { Pagination } from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { columns } from './columns';

interface Estado{
    id:number;
    nombre:string;
    descripcion:string|null;
}

interface Props{
    estados:{
        data:Estado[];
        links:{
            url:string|null;
            label:string;
            active:boolean;
        }[];
    };
    filters:{
        search?:string;
    };
}

const breadcrumbs:BreadcrumbItem[]=[
    {title:'Estados de Artículo',href:'/estados-articulo'},
];

export default function Index({estados,filters}:Props){
    const [search,setSearch]=useState(filters.search??'');

    const handleSearch=()=>{
        router.get(route('estados-articulo.index'),{search},{
            preserveState:true,
            replace:true,
        });
    };

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Estados de Artículo"/>

            <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Estados de Artículo</h1>

                    <Can permission="estados-articulo.create">
                        <Link href={route('estados-articulo.create')}>
                            <Button>Nuevo estado</Button>
                        </Link>
                    </Can>
                </div>

                <div className="flex max-w-sm">
                    <Input
                        placeholder="Buscar estado..."
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        onKeyDown={(e)=>e.key==='Enter'&&handleSearch()}
                        className="rounded-r-none"
                    />
                    <Button size="icon" onClick={handleSearch} className="rounded-l-none">
                        <Search className="h-4 w-4"/>
                    </Button>
                </div>

                <DataTable columns={columns} data={estados.data}/>
                <Pagination links={estados.links}/>
            </div>
        </AppLayout>
    );
}