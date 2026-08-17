import { FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { notify } from '@/lib/notify';
import { Link } from '@inertiajs/react';

interface Categoria {
    id: number;
    nombre: string;
}

interface Marca {
    id: number;
    nombre: string;
}

interface UnidadMedida {
    id: number;
    nombre: string;
}

interface Articulo {
    id: number;
    categoria_id: number;
    marca_id: number;
    unidad_medida_id: number;
    tipo_articulo: string;
    nombre: string;
    modelo: string | null;
    descripcion: string | null;
    control_individual: boolean;
    maneja_serial: boolean;
    stock: string | number;
    stock_minimo: string | number;
}

interface Props {
    categorias: Categoria[];
    marcas: Marca[];
    unidadesMedida: UnidadMedida[];
    articulo?: Articulo;
}

export default function ArticuloForm({
    categorias,
    marcas,
    unidadesMedida,
    articulo,
}: Props) {

    const isEditing = !!articulo;

    const { data, setData, post, put, processing, errors } = useForm({
        categoria_id: articulo?.categoria_id ? String(articulo.categoria_id) : '',
        marca_id: articulo?.marca_id ? String(articulo.marca_id) : '',
        unidad_medida_id: articulo?.unidad_medida_id ? String(articulo.unidad_medida_id) : '',
        tipo_articulo: articulo?.tipo_articulo ?? '',
        nombre: articulo?.nombre ?? '',
        modelo: articulo?.modelo ?? '',
        descripcion: articulo?.descripcion ?? '',
        control_individual: articulo?.control_individual ?? false,
        maneja_serial: articulo?.maneja_serial ?? false,
        stock_minimo: articulo?.stock_minimo !== undefined ? String(articulo.stock_minimo) : '0',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEditing) {
            put(
                route('articulos.update', articulo.id),
                {
                    onSuccess: () => { notify.success('Artículo actualizado correctamente.'); },
                    onError: () => { notify.error('No se pudo actualizar el artículo.'); },
                }
            );
            return;
        }

        post(
            route('articulos.store'),
            {
                onSuccess: () => { notify.success('Artículo creado correctamente.'); },
                onError: () => { notify.error('No se pudo crear el artículo.'); },
            }
        );
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            {/* INFORMACIÓN GENERAL */}
            <div className="rounded-lg border bg-card p-6">
                <div className="mb-6">
                    <h2 className="text-base font-semibold">
                        Información general
                    </h2>

                    <p className="text-sm text-muted-foreground mt-1">
                        Información básica del artículo.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* NOMBRE */}
                    <div className="space-y-2">
                        <Label htmlFor="nombre">
                            Nombre <span className="text-red-500">*</span>
                        </Label>

                        <Input
                            id="nombre"
                            value={data.nombre}
                            onChange={(e) => setData( 'nombre', e.target.value) }
                            placeholder="Ej. Laptop"
                        />

                        {errors.nombre && (
                            <p className="text-sm text-red-500">
                                {errors.nombre}
                            </p>
                        )}
                    </div>

                    {/* MARCA */}
                    <div className="space-y-2">
                        <Label>
                            Marca{' '}
                            <span className="text-red-500">*</span>
                        </Label>

                        <Select
                            value={data.marca_id}
                            onValueChange={(value) => setData('marca_id', value) }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona una marca" />
                            </SelectTrigger>

                            <SelectContent>
                                {marcas.map((marca) => (
                                    <SelectItem key={marca.id} value={String(marca.id)}>
                                        {marca.nombre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {errors.marca_id && (
                            <p className="text-sm text-red-500">
                                {errors.marca_id}
                            </p>
                        )}
                    </div>

                    {/* MODELO */}
                    <div className="space-y-2">
                        <Label htmlFor="modelo">
                            Modelo
                        </Label>

                        <Input
                            id="modelo"
                            value={data.modelo}
                            onChange={(e) => setData('modelo', e.target.value)}
                            placeholder="Ej. ThinkPad E14"
                        />

                        {errors.modelo && (
                            <p className="text-sm text-red-500">
                                {errors.modelo}
                            </p>
                        )}
                    </div>

                    {/* TIPO DE ARTÍCULO */}
                    <div className="space-y-2">
                        <Label htmlFor="tipo_articulo">
                            Tipo de artículo{' '}
                            <span className="text-red-500">*</span>
                        </Label>

                        <Input
                            id="tipo_articulo"
                            value={data.tipo_articulo}
                            onChange={(e) => setData('tipo_articulo', e.target.value)}
                            placeholder="Ej. Equipo, suministro, mobiliario..."
                        />

                        {errors.tipo_articulo && (
                            <p className="text-sm text-red-500">
                                {errors.tipo_articulo}
                            </p>
                        )}
                    </div>

                    {/* CATEGORÍA */}
                    <div className="space-y-2">
                        <Label>
                            Categoría{' '}
                            <span className="text-red-500">*</span>
                        </Label>

                        <Select
                            value={data.categoria_id}
                            onValueChange={(value) => setData( 'categoria_id', value ) }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>

                            <SelectContent>
                                {categorias.map((categoria) => (
                                    <SelectItem key={categoria.id} value={String(categoria.id)}>
                                        {categoria.nombre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {errors.categoria_id && (
                            <p className="text-sm text-red-500">
                                {errors.categoria_id}
                            </p>
                        )}
                    </div>

                    {/* UNIDAD DE MEDIDA */}
                    <div className="space-y-2">
                        <Label>
                            Unidad de medida{' '}
                            <span className="text-red-500">*</span>
                        </Label>

                        <Select
                            value={data.unidad_medida_id}
                            onValueChange={(value) => setData('unidad_medida_id', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona una unidad" />
                            </SelectTrigger>

                            <SelectContent>
                                {unidadesMedida.map(
                                    (unidad) => (
                                        <SelectItem
                                            key={unidad.id}
                                            value={String(unidad.id)}
                                        >
                                            {unidad.nombre}
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>

                        {errors.unidad_medida_id && (
                            <p className="text-sm text-red-500">
                                {errors.unidad_medida_id}
                            </p>
                        )}
                    </div>
                </div>

                {/* DESCRIPCIÓN */}
                <div className="space-y-2 mt-6">
                    <Label htmlFor="descripcion">
                        Descripción
                    </Label>

                    <Textarea
                        id="descripcion"
                        value={data.descripcion}
                        onChange={(e) => setData('descripcion', e.target.value)}
                        placeholder="Describe el artículo..."
                        rows={4}
                    />

                    {errors.descripcion && (
                        <p className="text-sm text-red-500">
                            {errors.descripcion}
                        </p>
                    )}
                </div>

            </div>



            {/* CONTROL DEL ARTÍCULO */}
            <div className="rounded-lg border bg-card p-6">
                <div className="mb-6">
                    <h2 className="text-base font-semibold">
                        Control del artículo
                    </h2>

                    <p className="text-sm text-muted-foreground mt-1">
                        Define cómo se controlarán las unidades y el stock de este artículo.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* CONTROL INDIVIDUAL */}
                    <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className="space-y-1">
                                <Label>
                                    Control individual
                                </Label>

                                <p className="text-sm text-muted-foreground">
                                    Controla cada unidad por separado.
                                </p>
                            </div>

                            <Switch
                                checked={data.control_individual}
                                onCheckedChange={(checked) => {setData('control_individual', checked);
                                    if (!checked) {setData('maneja_serial', false);}
                                }}
                            />
                        </div>

                        {errors.control_individual && (
                            <p className="text-sm text-red-500 mt-2">
                                {errors.control_individual}
                            </p>
                        )}
                    </div>


                    {/* MANEJA SERIAL */}
                    <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className="space-y-1">
                                <Label>
                                    Maneja serial
                                </Label>

                                <p className="text-sm text-muted-foreground">
                                    Registra un serial para cada unidad.
                                </p>
                            </div>

                            <Switch
                                checked={data.maneja_serial}
                                disabled={!data.control_individual}
                                onCheckedChange={(checked) => setData('maneja_serial', checked)}
                            />

                        </div>

                        {errors.maneja_serial && (
                            <p className="text-sm text-red-500 mt-2">
                                {errors.maneja_serial}
                            </p>
                        )}

                        {!data.control_individual && (
                            <p className="text-xs text-muted-foreground mt-2">
                                Requiere control individual.
                            </p>
                        )}
                    </div>


                    {/* STOCK MÍNIMO */}
                    <div className="rounded-lg border p-4">
                        <div className="space-y-2">
                            <Label htmlFor="stock_minimo">
                                Stock mínimo
                            </Label>

                            <Input
                                id="stock_minimo"
                                type="number"
                                min="0"
                                step="1"
                                onChange={(e) => setData('stock_minimo', e.target.value)}
                                placeholder="5"
                            />

                            <p className="text-xs text-muted-foreground">
                                Cantidad mínima de unidades que debe mantenerse en existencia.
                            </p>
                        </div>

                        {errors.stock_minimo && (
                            <p className="text-sm text-red-500 mt-2">
                                {errors.stock_minimo}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* BOTONES */}
            <div className="flex justify-end gap-3">
                <Link href={route('articulos.index')}>
                    <Button type="button" variant="outline">
                        Cancelar
                    </Button>
                </Link>

                <Button type="submit" disabled={processing}>
                    {processing
                        ? 'Guardando...'
                        : isEditing
                            ? 'Actualizar artículo'
                            : 'Guardar artículo'}
                </Button>

            </div>

        </form>
    );
}