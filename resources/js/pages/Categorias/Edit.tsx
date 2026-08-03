import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { type BreadcrumbItem } from '@/types';
import { notify } from "@/lib/notify";

interface Categoria {
    id: number;
    nombre: string;
    descripcion: string | null;
    estado: boolean;
}

interface Props {
    categoria: Categoria;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categorías',
        href: '/categorias',
    },
    {
        title: 'Editar',
        href: '#',
    },
];


export default function Edit({ categoria }: Props) {

    const { data, setData, put, processing, errors } = useForm({
        nombre: categoria.nombre,
        descripcion: categoria.descripcion ?? '',
        estado: categoria.estado,
    });


    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        put(route('categorias.update', categoria.id), {
            onSuccess: () => { notify.success( "Categoría actualizada correctamente." ); },
            onError: () => { notify.error( "No se pudo actualizar la categoría." ); },
        });
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>

            <Head title="Editar categoría" />


            <div className="p-6">

                <h1 className="text-xl font-semibold mb-6">
                    Editar categoría
                </h1>


                <form 
                    onSubmit={submit}
                    className="space-y-4 max-w-xl"
                >

                    <div>
                        <label>
                            Nombre
                        </label>

                        <Input
                            value={data.nombre}
                            onChange={(e) =>
                                setData(
                                    'nombre',
                                    e.target.value
                                )
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
                                setData(
                                    'descripcion',
                                    e.target.value
                                )
                            }
                        />
                    </div>


                    <Button disabled={processing}>
                        Actualizar
                    </Button>

                </form>

            </div>

        </AppLayout>
    );
}