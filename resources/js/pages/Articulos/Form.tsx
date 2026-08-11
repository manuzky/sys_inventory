import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface FormProps {
    form: any;
    submit: (e: React.FormEvent) => void;
    buttonText: string;

    categorias: {
        id: number;
        nombre: string;
    }[];

    marcas: {
        id: number;
        nombre: string;
    }[];

    unidadesMedida: {
        id: number;
        nombre: string;
        abreviatura: string;
    }[];

    ubicaciones: {
        id: number;
        nombre: string;
    }[];

    estadosArticulo: {
        id: number;
        nombre: string;
    }[];
}

export default function Form({
    form,
    submit,
    buttonText,
    categorias,
    marcas,
    unidadesMedida,
    ubicaciones,
    estadosArticulo,
}: FormProps) {
    return (
        <form onSubmit={submit} className="space-y-6">

            {/* INFORMACIÓN GENERAL */}
            <div className="rounded-lg border bg-background p-5">
                <h2 className="text-base font-semibold mb-4">
                    Información general
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="space-y-2">
                        <Label htmlFor="nombre">
                            Nombre
                        </Label>

                        <Input
                            id="nombre"
                            value={form.data.nombre}
                            onChange={(e) =>
                                form.setData('nombre', e.target.value)
                            }
                            placeholder="Nombre del artículo"
                        />

                        {form.errors.nombre && (
                            <p className="text-sm text-red-600">
                                {form.errors.nombre}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tipo_articulo">
                            Tipo de artículo
                        </Label>

                        <Input
                            id="tipo_articulo"
                            value={form.data.tipo_articulo}
                            onChange={(e) =>
                                form.setData('tipo_articulo', e.target.value)
                            }
                            placeholder="Ej. Equipo, suministro, activo..."
                        />

                        {form.errors.tipo_articulo && (
                            <p className="text-sm text-red-600">
                                {form.errors.tipo_articulo}
                            </p>
                        )}
                    </div>

                </div>
            </div>

            {/* IDENTIFICACIÓN */}
            <div className="rounded-lg border bg-background p-5">
                <h2 className="text-base font-semibold mb-4">
                    Identificación
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <div className="space-y-2">
                        <Label htmlFor="codigo">
                            Código
                        </Label>

                        <Input
                            id="codigo"
                            value={form.data.codigo}
                            onChange={(e) =>
                                form.setData('codigo', e.target.value)
                            }
                            placeholder="Código del artículo"
                        />

                        {form.errors.codigo && (
                            <p className="text-sm text-red-600">
                                {form.errors.codigo}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="codigo_patrimonial">
                            Código patrimonial
                        </Label>

                        <Input
                            id="codigo_patrimonial"
                            value={form.data.codigo_patrimonial}
                            onChange={(e) =>
                                form.setData(
                                    'codigo_patrimonial',
                                    e.target.value
                                )
                            }
                            placeholder="Código patrimonial"
                        />

                        {form.errors.codigo_patrimonial && (
                            <p className="text-sm text-red-600">
                                {form.errors.codigo_patrimonial}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="serial">
                            Serial
                        </Label>

                        <Input
                            id="serial"
                            value={form.data.serial}
                            onChange={(e) =>
                                form.setData('serial', e.target.value)
                            }
                            placeholder="Número de serial"
                        />

                        {form.errors.serial && (
                            <p className="text-sm text-red-600">
                                {form.errors.serial}
                            </p>
                        )}
                    </div>

                </div>
            </div>

            {/* CLASIFICACIÓN */}
            <div className="rounded-lg border bg-background p-5">
                <h2 className="text-base font-semibold mb-4">
                    Clasificación
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="space-y-2">
                        <Label htmlFor="categoria_id">
                            Categoría
                        </Label>

                        <select
                            id="categoria_id"
                            value={form.data.categoria_id}
                            onChange={(e) =>
                                form.setData(
                                    'categoria_id',
                                    e.target.value
                                )
                            }
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                        >
                            <option value="">
                                Seleccione una categoría
                            </option>

                            {categorias.map((categoria) => (
                                <option
                                    key={categoria.id}
                                    value={categoria.id}
                                >
                                    {categoria.nombre}
                                </option>
                            ))}
                        </select>

                        {form.errors.categoria_id && (
                            <p className="text-sm text-red-600">
                                {form.errors.categoria_id}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="marca_id">
                            Marca
                        </Label>

                        <select
                            id="marca_id"
                            value={form.data.marca_id}
                            onChange={(e) =>
                                form.setData(
                                    'marca_id',
                                    e.target.value
                                )
                            }
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                        >
                            <option value="">
                                Seleccione una marca
                            </option>

                            {marcas.map((marca) => (
                                <option
                                    key={marca.id}
                                    value={marca.id}
                                >
                                    {marca.nombre}
                                </option>
                            ))}
                        </select>

                        {form.errors.marca_id && (
                            <p className="text-sm text-red-600">
                                {form.errors.marca_id}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="unidad_medida_id">
                            Unidad de medida
                        </Label>

                        <select
                            id="unidad_medida_id"
                            value={form.data.unidad_medida_id}
                            onChange={(e) =>
                                form.setData(
                                    'unidad_medida_id',
                                    e.target.value
                                )
                            }
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                        >
                            <option value="">
                                Seleccione una unidad
                            </option>

                            {unidadesMedida.map((unidad) => (
                                <option
                                    key={unidad.id}
                                    value={unidad.id}
                                >
                                    {unidad.nombre} ({unidad.abreviatura})
                                </option>
                            ))}
                        </select>

                        {form.errors.unidad_medida_id && (
                            <p className="text-sm text-red-600">
                                {form.errors.unidad_medida_id}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="ubicacion_id">
                            Ubicación
                        </Label>

                        <select
                            id="ubicacion_id"
                            value={form.data.ubicacion_id}
                            onChange={(e) =>
                                form.setData(
                                    'ubicacion_id',
                                    e.target.value
                                )
                            }
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                        >
                            <option value="">
                                Seleccione una ubicación
                            </option>

                            {ubicaciones.map((ubicacion) => (
                                <option
                                    key={ubicacion.id}
                                    value={ubicacion.id}
                                >
                                    {ubicacion.nombre}
                                </option>
                            ))}
                        </select>

                        {form.errors.ubicacion_id && (
                            <p className="text-sm text-red-600">
                                {form.errors.ubicacion_id}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="estado_id">
                            Estado del artículo
                        </Label>

                        <select
                            id="estado_id"
                            value={form.data.estado_id}
                            onChange={(e) =>
                                form.setData(
                                    'estado_id',
                                    e.target.value
                                )
                            }
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                        >
                            <option value="">
                                Seleccione un estado
                            </option>

                            {estadosArticulo.map((estado) => (
                                <option
                                    key={estado.id}
                                    value={estado.id}
                                >
                                    {estado.nombre}
                                </option>
                            ))}
                        </select>

                        {form.errors.estado_id && (
                            <p className="text-sm text-red-600">
                                {form.errors.estado_id}
                            </p>
                        )}
                    </div>

                </div>
            </div>

            {/* INVENTARIO */}
            <div className="rounded-lg border bg-background p-5">
                <h2 className="text-base font-semibold mb-4">
                    Inventario
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <div className="space-y-2">
                        <Label htmlFor="cantidad">
                            Cantidad
                        </Label>

                        <Input
                            id="cantidad"
                            type="number"
                            min="0"
                            step="0.01"
                            value={form.data.cantidad}
                            onChange={(e) =>
                                form.setData(
                                    'cantidad',
                                    e.target.value
                                )
                            }
                        />

                        {form.errors.cantidad && (
                            <p className="text-sm text-red-600">
                                {form.errors.cantidad}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="stock_minimo">
                            Stock mínimo
                        </Label>

                        <Input
                            id="stock_minimo"
                            type="number"
                            min="0"
                            step="0.01"
                            value={form.data.stock_minimo}
                            onChange={(e) =>
                                form.setData(
                                    'stock_minimo',
                                    e.target.value
                                )
                            }
                        />

                        {form.errors.stock_minimo && (
                            <p className="text-sm text-red-600">
                                {form.errors.stock_minimo}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="fecha_adquisicion">
                            Fecha de adquisición
                        </Label>

                        <Input
                            id="fecha_adquisicion"
                            type="date"
                            value={form.data.fecha_adquisicion}
                            onChange={(e) =>
                                form.setData(
                                    'fecha_adquisicion',
                                    e.target.value
                                )
                            }
                        />

                        {form.errors.fecha_adquisicion && (
                            <p className="text-sm text-red-600">
                                {form.errors.fecha_adquisicion}
                            </p>
                        )}
                    </div>

                </div>
            </div>

            {/* DESCRIPCIÓN */}
            <div className="rounded-lg border bg-background p-5">
                <h2 className="text-base font-semibold mb-4">
                    Descripción
                </h2>

                <div className="space-y-2">
                    <Label htmlFor="descripcion">
                        Descripción
                    </Label>

                    <Textarea
                        id="descripcion"
                        value={form.data.descripcion}
                        onChange={(e) =>
                            form.setData(
                                'descripcion',
                                e.target.value
                            )
                        }
                        placeholder="Descripción del artículo..."
                        rows={4}
                    />

                    {form.errors.descripcion && (
                        <p className="text-sm text-red-600">
                            {form.errors.descripcion}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={form.processing}
                >
                    {form.processing
                        ? 'Guardando...'
                        : buttonText}
                </Button>
            </div>

        </form>
    );
}