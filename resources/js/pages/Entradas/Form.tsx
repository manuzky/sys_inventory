import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';

interface Articulo {
    id: number;
    codigo: string;
    nombre: string;
    cantidad: number;
}

interface DetalleEntrada {
    articulo_id: number;
    cantidad: number;
    costo: number;
}

interface Props {
    form: any;
    proveedores: { id: number; nombre: string }[];
    articulos: Articulo[];
    submit: (e: React.FormEvent) => void;
    buttonText: string;
}

export default function Form({
    form,
    proveedores,
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
                costo: 0,
            },
        ]);
    };

    const eliminarDetalle = (index: number) => {
        if (data.detalles.length === 1) {
            return;
        }

        setData(
            'detalles',
            data.detalles.filter(
                (_: DetalleEntrada, i: number) => i !== index
            )
        );
    };

    const actualizarDetalle = (
        index: number,
        campo: keyof DetalleEntrada,
        valor: number
    ) => {
        const detalles = [...data.detalles];

        detalles[index] = {
            ...detalles[index],
            [campo]: valor,
        };

        setData('detalles', detalles);
    };

    const articulosSeleccionados = data.detalles.map(
        (detalle: DetalleEntrada) => detalle.articulo_id
    );

    return (
        <form onSubmit={submit} className="space-y-6">

            {/* Información de la entrada */}
            <div className="rounded-lg border bg-card p-5 space-y-5">
                <div>
                    <h2 className="text-base font-semibold">
                        Información de la entrada
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Datos generales del documento de entrada.
                    </p>
                </div>

                <div>
                    <label className="text-sm font-medium">
                        Proveedor
                    </label>

                    <Select
                        value={
                            data.proveedores_id
                                ? String(data.proveedores_id)
                                : ''
                        }
                        onValueChange={(value) =>
                            setData(
                                'proveedores_id',
                                Number(value)
                            )
                        }
                    >
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Seleccione un proveedor" />
                        </SelectTrigger>

                        <SelectContent>
                            {proveedores.map((proveedor) => (
                                <SelectItem
                                    key={proveedor.id}
                                    value={String(proveedor.id)}
                                >
                                    {proveedor.nombre}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {errors.proveedores_id && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.proveedores_id}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <div>
                        <label className="text-sm font-medium">
                            Fecha
                        </label>

                        <Input
                            className="mt-1"
                            type="date"
                            value={data.fecha}
                            onChange={(e) =>
                                setData('fecha', e.target.value)
                            }
                        />

                        {errors.fecha && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.fecha}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium">
                            Tipo de documento
                        </label>

                        <Input
                            className="mt-1"
                            value={data.tipo_documento}
                            onChange={(e) =>
                                setData(
                                    'tipo_documento',
                                    e.target.value
                                )
                            }
                            placeholder="Factura, nota de entrega..."
                        />

                        {errors.tipo_documento && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.tipo_documento}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium">
                            Número de documento
                        </label>

                        <Input
                            className="mt-1"
                            value={data.numero_documento}
                            onChange={(e) =>
                                setData(
                                    'numero_documento',
                                    e.target.value
                                )
                            }
                            placeholder="Ej. FAC-001"
                        />

                        {errors.numero_documento && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.numero_documento}
                            </p>
                        )}
                    </div>

                </div>

                <div>
                    <label className="text-sm font-medium">
                        Observación
                    </label>

                    <Textarea
                        className="mt-1"
                        value={data.observacion}
                        onChange={(e) =>
                            setData(
                                'observacion',
                                e.target.value
                            )
                        }
                        placeholder="Observaciones de la entrada..."
                    />

                    {errors.observacion && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.observacion}
                        </p>
                    )}
                </div>
            </div>

            {/* Detalles */}
            <div className="rounded-lg border bg-card p-5 space-y-5">

                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-base font-semibold">
                            Artículos
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Agregue los artículos que forman parte de esta entrada.
                        </p>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={agregarDetalle}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar artículo
                    </Button>
                </div>

                <div className="space-y-3">

                    {data.detalles.map(
                        (
                            detalle: DetalleEntrada,
                            index: number
                        ) => {

                            const errorArticulo =
                                errors[`detalles.${index}.articulo_id`];

                            const errorCantidad =
                                errors[`detalles.${index}.cantidad`];

                            const errorCosto =
                                errors[`detalles.${index}.costo`];

                            return (
                                <div
                                    key={index}
                                    className="grid grid-cols-1 md:grid-cols-[1fr_140px_140px_40px] gap-3 items-end rounded-md border p-3"
                                >

                                    {/* Artículo */}
                                    <div>
                                        <label className="text-sm font-medium">
                                            Artículo
                                        </label>

                                        <Select
                                            value={
                                                detalle.articulo_id
                                                    ? String(
                                                          detalle.articulo_id
                                                      )
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
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Seleccione un artículo" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {articulos.map(
                                                    (articulo) => {

                                                        const yaSeleccionado =
                                                            articulosSeleccionados.includes(
                                                                articulo.id
                                                            ) &&
                                                            detalle.articulo_id !==
                                                                articulo.id;

                                                        return (
                                                            <SelectItem
                                                                key={
                                                                    articulo.id
                                                                }
                                                                value={String(
                                                                    articulo.id
                                                                )}
                                                                disabled={
                                                                    yaSeleccionado
                                                                }
                                                            >
                                                                {articulo.codigo} — {articulo.nombre}
                                                            </SelectItem>
                                                        );
                                                    }
                                                )}
                                            </SelectContent>
                                        </Select>

                                        {errorArticulo && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errorArticulo}
                                            </p>
                                        )}
                                    </div>

                                    {/* Cantidad */}
                                    <div>
                                        <label className="text-sm font-medium">
                                            Cantidad
                                        </label>

                                        <Input
                                            className="mt-1"
                                            type="number"
                                            min="0.01"
                                            step="0.01"
                                            value={detalle.cantidad}
                                            onChange={(e) =>
                                                actualizarDetalle(
                                                    index,
                                                    'cantidad',
                                                    Number(
                                                        e.target.value
                                                    )
                                                )
                                            }
                                        />

                                        {errorCantidad && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errorCantidad}
                                            </p>
                                        )}
                                    </div>

                                    {/* Costo */}
                                    <div>
                                        <label className="text-sm font-medium">
                                            Costo
                                        </label>

                                        <Input
                                            className="mt-1"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={detalle.costo}
                                            onChange={(e) =>
                                                actualizarDetalle(
                                                    index,
                                                    'costo',
                                                    Number(
                                                        e.target.value
                                                    )
                                                )
                                            }
                                        />

                                        {errorCosto && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errorCosto}
                                            </p>
                                        )}
                                    </div>

                                    {/* Eliminar */}
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        disabled={
                                            data.detalles.length === 1
                                        }
                                        onClick={() =>
                                            eliminarDetalle(index)
                                        }
                                        title="Eliminar artículo"
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>

                                </div>
                            );
                        }
                    )}

                </div>

                {errors.detalles && (
                    <p className="text-red-500 text-sm">
                        {errors.detalles}
                    </p>
                )}

            </div>

            {/* Acciones */}
            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={processing}
                >
                    {buttonText}
                </Button>
            </div>

        </form>
    );
}