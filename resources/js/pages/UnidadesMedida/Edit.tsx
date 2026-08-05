import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { notify } from '@/lib/notify';
import Form from './Form';

interface Unidad {
    id:number;
    nombre:string;
    abreviatura:string;
    estado:boolean;
}

interface Props {
    unidad:Unidad;
}

const breadcrumbs:BreadcrumbItem[]=[
    {
        title:'Unidades de Medida',
        href:'/unidades-medida',
    },
    {
        title:'Editar',
        href:'#',
    },
];

export default function Edit({unidad}:Props){

    const form=useForm({
        nombre:unidad.nombre,
        abreviatura:unidad.abreviatura,
        estado:unidad.estado,
    });

    const submit=(e:React.FormEvent)=>{
        e.preventDefault();

        form.put(route('unidades-medida.update',unidad.id),{
            onSuccess:()=>{
                notify.success('Unidad actualizada correctamente.');
            },
            onError:()=>{
                notify.error('No se pudo actualizar la unidad.');
            },
        });
    };

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar unidad de medida"/>

            <div className="p-6">
                <h1 className="text-xl font-semibold mb-6">
                    Editar unidad de medida
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