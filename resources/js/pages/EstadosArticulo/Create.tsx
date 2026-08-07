import AppLayout from '@/layouts/app-layout';
import { Head,useForm } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { notify } from '@/lib/notify';
import Form from './Form';

const breadcrumbs:BreadcrumbItem[]=[
    {title:'Estados de Artículo',href:'/estados-articulo'},
    {title:'Crear',href:'/estados-articulo/create'},
];

export default function Create(){
    const form=useForm({
        nombre:'',
        descripcion:'',
    });

    const submit=(e:React.FormEvent)=>{
        e.preventDefault();

        form.post(route('estados-articulo.store'),{
            onSuccess:()=>notify.success('Estado creado correctamente.'),
            onError:()=>notify.error('No se pudo crear el estado.'),
        });
    };

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nuevo estado"/>

            <div className="p-6">
                <h1 className="text-xl font-semibold mb-6">
                    Nuevo estado de artículo
                </h1>

                <Form
                    form={form}
                    submit={submit}
                    buttonText="Guardar"
                />
            </div>
        </AppLayout>
    );
}