import { ColumnDef } from '@tanstack/react-table';
import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Can } from '@/components/can';
import { notify } from '@/lib/notify';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export type Estado={
    id:number;
    nombre:string;
    descripcion:string|null;
};

export const columns:ColumnDef<Estado>[]=[
    {
        accessorKey:'id',
        header:'ID',
    },
    {
        accessorKey:'nombre',
        header:'Nombre',
    },
    {
        accessorKey:'descripcion',
        header:'Descripción',
        cell:({row})=>row.original.descripcion??'Sin descripción',
    },
    {
        id:'acciones',
        header:()=>(
            <div className="text-right">
                Acciones
            </div>
        ),
        cell:({row})=>{
            const estado=row.original;

            return(
                <div className="flex justify-end gap-2">

                    <Can permission="estados-articulo.edit">
                        <Link
                            href={route('estados-articulo.edit',estado.id)}
                            title="Editar"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background text-yellow-600 hover:border-yellow-300 hover:bg-yellow-50 hover:text-yellow-700 transition-all duration-200 hover:scale-105"
                        >
                            <Pencil className="h-4 w-4"/>
                        </Link>
                    </Can>

                    <Can permission="estados-articulo.delete">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button
                                    title="Eliminar"
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background text-red-600 hover:border-red-300 hover:bg-red-50 hover:text-red-700 transition-all duration-200 hover:scale-105"
                                >
                                    <Trash2 className="h-4 w-4"/>
                                </button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        ¿Eliminar estado?
                                    </AlertDialogTitle>

                                    <AlertDialogDescription>
                                        Esta acción eliminará el estado permanentemente.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancelar
                                    </AlertDialogCancel>

                                    <AlertDialogAction
                                        onClick={()=>{
                                            router.delete(route('estados-articulo.destroy',estado.id),{
                                                preserveScroll:true,
                                                onSuccess:()=>notify.success('Estado eliminado correctamente.'),
                                                onError:()=>notify.error('No se pudo eliminar el estado.'),
                                            });
                                        }}
                                    >
                                        Eliminar
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </Can>

                </div>
            );
        },
    },
];