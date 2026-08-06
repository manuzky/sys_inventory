import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { notify } from '@/lib/notify';
import Form from './Form';

interface Proveedor {
    id:number;
    nombre:string;
    rif:string;
    telefono:string|null;
    email:string|null;
    direccion:string|null;
    estado:boolean;
}

interface Props {
    proveedor:Proveedor;
}

const breadcrumbs:BreadcrumbItem[]=[
    {
        title:'Proveedores',
        href:'/proveedores',
    },
    {
        title:'Editar',
        href:'#',
    },
];

export default function Edit({proveedor}:Props){

    const form=useForm({
        nombre:proveedor.nombre,
        rif:proveedor.rif,
        telefono:proveedor.telefono ?? '',
        email:proveedor.email ?? '',
        direccion:proveedor.direccion ?? '',
        estado:proveedor.estado,
    });

    const submit=(e:React.FormEvent)=>{
        e.preventDefault();

        form.put(route('proveedores.update',proveedor.id),{
            onSuccess:()=>notify.success('Proveedor actualizado correctamente.'),
            onError:()=>notify.error('No se pudo actualizar el proveedor.'),
        });
    };

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar proveedor"/>

            <div className="p-6">
                <h1 className="text-xl font-semibold mb-6">
                    Editar proveedor
                </h1>

                <Form
                    form={form}
                    submit={submit}
                    buttonText="Actualizar"
                />
            </div>
        </AppLayout>
    );
}