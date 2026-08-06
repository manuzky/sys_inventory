import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Building2, Mail, MapPin, Phone, FileText } from 'lucide-react';

interface Proveedor{
    id:number;
    nombre:string;
    rif:string;
    telefono:string|null;
    email:string|null;
    direccion:string|null;
    estado:boolean;
}

interface Props{
    proveedor:Proveedor;
}

const breadcrumbs:BreadcrumbItem[]=[
    {title:'Proveedores',href:'/proveedores'},
    {title:'Ver',href:'#'},
];

export default function Show({proveedor}:Props){
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={proveedor.nombre}/>

            <div className="p-6">
                <div className="max-w-md rounded-2xl border shadow-lg overflow-hidden bg-background">

                    <div className="bg-primary p-6 text-primary-foreground">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-xl bg-white/20 flex items-center justify-center">
                                <Building2 className="h-9 w-9"/>
                            </div>

                            <div>
                                <h1 className="text-xl font-bold">
                                    {proveedor.nombre}
                                </h1>

                                <p className="text-sm opacity-80">
                                    Proveedor registrado
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 space-y-4">

                        <div className="rounded-lg border p-3">
                            <p className="text-xs text-muted-foreground">
                                RIF
                            </p>
                            <p className="font-semibold text-lg">
                                {proveedor.rif}
                            </p>
                        </div>

                        <div className="space-y-3">

                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                                    <Phone className="h-4 w-4"/>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Teléfono
                                    </p>
                                    <p className="font-medium">
                                        {proveedor.telefono ?? "No registrado"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                                    <Mail className="h-4 w-4"/>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Correo
                                    </p>
                                    <p className="font-medium">
                                        {proveedor.email ?? "No registrado"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                                    <MapPin className="h-4 w-4"/>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Dirección
                                    </p>
                                    <p className="font-medium">
                                        {proveedor.direccion ?? "No registrada"}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="border-t p-4 flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                            Estado del proveedor
                        </span>

                        <span className={`
                            px-3 py-1 rounded-full text-xs font-semibold
                            ${proveedor.estado
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"}
                        `}>
                            {proveedor.estado ? "Activo" : "Inactivo"}
                        </span>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}