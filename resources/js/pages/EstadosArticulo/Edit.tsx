import AppLayout from '@/layouts/app-layout';
import { Head,useForm } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { notify } from '@/lib/notify';
import Form from './Form';

interface Estado{
    id:number;
    nombre:string;
    descripcion:string|null;
}

interface Props{
    estado:Estado;
}

const breadcrumbs:BreadcrumbItem[]=[
    {title:'Estados de Artículo',href:'/estados-articulo'},
    {title:'Editar',href:'#'},
];

export default function Edit({estado}:Props){
    const form=useForm({
        nombre:estado.nombre,
        descripcion:estado.descripcion??'',
    });

    const submit=(e:React.FormEvent)=>{
        e.preventDefault();

        form.put(route('estados-articulo.update',estado.id),{
            onSuccess:()=>notify.success('Estado actualizado correctamente.'),
            onError:()=>notify.error('No se pudo actualizar el estado.'),
        });
    };

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar estado de artículo"/>

            <div className="p-6">
                <h1 className="text-xl font-semibold mb-6">
                    Editar estado de artículo
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