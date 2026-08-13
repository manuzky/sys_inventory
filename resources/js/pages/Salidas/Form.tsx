import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';

interface Articulo {
    id: number;
    codigo: string;
    nombre: string;
    cantidad: number;
}

interface Props {
    form: any;
    articulos: Articulo[];
    submit: (e: React.FormEvent) => void;
    buttonText: string;
}

export default function Form({
    form,
    articulos,
    submit,
    buttonText,
}: Props) {
    const { data, setData, processing, errors } = form;

    const agregarDetalle = () => {
        setData('detalles', [
            ...data.detalles,
            {
                articulo_id: 0,
                cantidad: 1,
            },
        ]);
    };

    const eliminarDetalle = (index: number) => {
        setData(
            'detalles',
            data.detalles.filter((_: any, i: number) => i !== index)
        );
    };

    const actualizarDetalle = (
        index: number,
        campo: string,
        valor: any
    ) => {
        const detalles = [...data.detalles];
        detalles[index] = {
            ...detalles[index],
            [campo]: valor,
        };

        setData('detalles', detalles);
    };

    return (
        <form onSubmit={submit} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <label>Fecha</label>
                    <Input
                        type="date"
                        value={data.fecha}
                        onChange={(e) =>
                            setData('fecha', e.target.value)
                        }
                    />
                    {errors.fecha && (
                        <p className="text-sm text-red-500">
                            {errors.fecha}
                        </p>
                    )}
                </div>

                <div>
                    <label>Motivo</label>
                    <Input
                        value={data.motivo}
                        onChange={(e) =>
                            setData('motivo', e.target.value)
                        }
                    />
                    {errors.motivo && (
                        <p className="text-sm text-red-500">
                            {errors.motivo}
                        </p>
                    )}
                </div>

            </div>

            <div>
                <label>Observaciones</label>
                <Textarea
                    value={data.observaciones}
                    onChange={(e) =>
                        setData('observaciones', e.target.value)
                    }
                />
            </div>

            <div className="border rounded-lg p-4 space-y-4">

                <div className="flex justify-between items-center">
                    <h2 className="font-semibold">
                        Artículos
                    </h2>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={agregarDetalle}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Agregar
                    </Button>
                </div>

                {data.detalles.map(
                    (detalle: any, index: number) => {

                        const articulo = articulos.find(
                            (a) => a.id === detalle.articulo_id
                        );

                        return (
                            <div
                                key={index}
                                className="grid grid-cols-12 gap-3 items-end border rounded-md p-3"
                            >

                                <div className="col-span-6">

                                    <label>Artículo</label>

                                    <Select
                                        value={
                                            detalle.articulo_id
                                                ? String(detalle.articulo_id)
                                                : ''
                                        }
                                        onValueChange={(value) =>
                                            actualizarDetalle(
                                                index,
                                                'articulo_id',
                                                Number(value)
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione..." />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {articulos.map((articulo) => (
                                                <SelectItem
                                                    key={articulo.id}
                                                    value={String(articulo.id)}
                                                >
                                                    {articulo.codigo} - {articulo.nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>

                                    </Select>

                                </div>

                                <div className="col-span-2">

                                    <label>Stock</label>

                                    <Input
                                        value={articulo?.cantidad ?? 0}
                                        readOnly
                                    />

                                </div>

                                <div className="col-span-3">

                                    <label>Cantidad</label>

                                    <Input
                                        type="number"
                                        min="1"
                                        value={detalle.cantidad}
                                        onChange={(e) =>
                                            actualizarDetalle(
                                                index,
                                                'cantidad',
                                                Number(e.target.value)
                                            )
                                        }
                                    />

                                </div>

                                <div className="col-span-1">

                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        onClick={() =>
                                            eliminarDetalle(index)
                                        }
                                        disabled={
                                            data.detalles.length === 1
                                        }
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>

                                </div>

                            </div>
                        );
                    }
                )}

                {errors.detalles && (
                    <p className="text-red-500 text-sm">
                        {errors.detalles}
                    </p>
                )}
            </div>

            <Button disabled={processing}>
                {buttonText}
            </Button>
        </form>
    );
}