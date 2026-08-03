import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { type BreadcrumbItem } from '@/types';
import { notify } from "@/lib/notify";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categorías',
        href: '/categorias',
    },
    {
        title: 'Crear',
        href: '/categorias/create',
    },
];

export default function Create() {

    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        descripcion: '',
        estado: true,
    });


    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('categorias.store'), {
            onSuccess: () => { notify.success( "Categoría creada correctamente." ); },
            onError: () => { notify.error( "No se pudo crear la categoría." ); },
        });
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>

            <Head title="Nueva categoría" />

            <div className="p-6">

                <h1 className="text-xl font-semibold mb-6">
                    Nueva categoría
                </h1>


                <form onSubmit={submit} className="space-y-4 max-w-xl">


                    <div>
                        <label>
                            Nombre
                        </label>

                        <Input
                            value={data.nombre}
                            onChange={(e) =>
                                setData('nombre', e.target.value)
                            }
                        />

                        {errors.nombre && (
                            <p className="text-red-500 text-sm">
                                {errors.nombre}
                            </p>
                        )}
                    </div>


                    <div>
                        <label>
                            Descripción
                        </label>

                        <Textarea
                            value={data.descripcion}
                            onChange={(e) =>
                                setData('descripcion', e.target.value)
                            }
                        />
                    </div>


                    <Button disabled={processing}>
                        Guardar
                    </Button>


                </form>

            </div>

        </AppLayout>
    );
}