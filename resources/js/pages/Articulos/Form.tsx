
import { FormEventHandler, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { notify } from '@/lib/notify';
import { Link } from '@inertiajs/react';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Categoria {
    id: number;
    nombre: string;
}

interface Marca {
    id: number;
    nombre: string;
}

interface Referencia {
    id: number;
    codigo: string;
    descripcion: string | null;
}

interface Articulo {
    id: number;
    categoria_id: number;
    marca_id: number;
    referencia_id: number;
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
    referencias: Referencia[];
    articulo?: Articulo;
}

export default function ArticuloForm({categorias, marcas, referencias, articulo }: Props) {

    const isEditing = !!articulo;
    const referenciaInicial = articulo?.referencia_id ? referencias.find((r) => r.id === articulo.referencia_id) : null;
    const visiblesIniciales = referenciaInicial ? [referenciaInicial, ...referencias.filter((r) => r.id !== referenciaInicial.id).slice(0, 8),] : referencias.slice(0, 9);

    const [visibleReferences, setVisibleReferences] = useState<Referencia[]>(visiblesIniciales);
    const [referenceSearch, setReferenceSearch] = useState('');
    const [referenceOpen, setReferenceOpen] = useState(false);

    const { data, setData, post, put, processing, errors } = useForm({
        categoria_id: articulo?.categoria_id ? String(articulo.categoria_id) : '',
        marca_id: articulo?.marca_id ? String(articulo.marca_id) : '',
        referencia_id: articulo?.referencia_id ? String(articulo.referencia_id) : '',
        nombre: articulo?.nombre ?? '',
        modelo: articulo?.modelo ?? '',
        descripcion: articulo?.descripcion ?? '',
        control_individual: articulo?.control_individual ?? false,
        maneja_serial: articulo?.maneja_serial ?? false,
        stock_minimo: articulo?.stock_minimo !== undefined ? String(articulo.stock_minimo) : '5',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEditing) {
            put(route('articulos.update', articulo.id), {
                onSuccess: () => { notify.success('Artículo actualizado correctamente.'); },
                onError: () => { notify.error('No se pudo actualizar el artículo.'); },
            });
            return;
        }

        post(route('articulos.store'), {
            onSuccess: () => { notify.success('Artículo creado correctamente.'); },
            onError: () => { notify.error('No se pudo crear el artículo.'); },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            {/* INFORMACIÓN DEL ARTÍCULO */}
            <div className="grid grid-cols-1 lg:grid-cols-8 gap-6">

                {/* INFORMACIÓN GENERAL */}
                <div className="lg:col-span-5 rounded-xl border bg-card p-6 shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-base font-semibold">Información general</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Información básica del artículo.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

                        {/* NOMBRE */}
                        <div className="space-y-2">
                            <Label htmlFor="nombre">
                                Nombre <span className="text-red-500">*</span>
                            </Label>

                            <Input
                                id="nombre"
                                value={data.nombre}
                                onChange={(e) => setData('nombre', e.target.value)}
                                placeholder="Ej. Laptop"
                            />

                            {errors.nombre && (<p className="text-sm text-red-500">{errors.nombre}</p>)}
                        </div>

                        {/* MARCA */}
                        <div className="space-y-2">
                            <Label>
                                Marca <span className="text-red-500">*</span>
                            </Label>

                            <Select value={data.marca_id} onValueChange={(value) => setData('marca_id', value)}>
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

                            {errors.marca_id && (<p className="text-sm text-red-500">{errors.marca_id}</p>)}
                        </div>

                        {/* MODELO */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-1">
                                <Label htmlFor="modelo">
                                    Modelo <span className="text-red-500">*</span>
                                </Label>

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button type="button" className="text-muted-foreground hover:text-foreground text-red-500">
                                                <Info className="h-4 w-4" />
                                            </button>
                                        </TooltipTrigger>

                                        <TooltipContent>
                                            <p>
                                                Si el artículo no posee un modelo en específico, coloque un guion (-).
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>

                            <Input
                                id="modelo"
                                value={data.modelo}
                                onChange={(e) => setData('modelo', e.target.value)}
                                placeholder="Ej. ThinkPad E14"
                            />

                            {errors.modelo && (<p className="text-sm text-red-500">{errors.modelo}</p>)}
                        </div>

                        {/* DESCRIPCIÓN */}
                        <div className="sm:col-span-3 space-y-2">
                            <Label htmlFor="descripcion">Descripción</Label>

                            <Textarea
                                id="descripcion"
                                value={data.descripcion}
                                onChange={(e) => setData('descripcion', e.target.value)}
                                placeholder="Describe el artículo..."
                                rows={5}
                            />

                            {errors.descripcion && (<p className="text-sm text-red-500">{errors.descripcion}</p>)}
                        </div>
                    </div>
                </div>

                {/* CONTROL DEL ARTÍCULO */}
                <div className="lg:col-span-3 rounded-xl border bg-card p-6 shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-base font-semibold">Control del artículo</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Define cómo se controlará este artículo.
                        </p>
                    </div>

                    <div className="space-y-5">

                        {/* CATEGORÍA + STOCK */}
                        <div className="grid grid-cols-[1fr_90px] gap-4">

                            {/* CATEGORÍA */}
                            <div className="space-y-2">
                                <Label>
                                    Categoría <span className="text-red-500">*</span>
                                </Label>

                                <Select value={data.categoria_id} onValueChange={(value) => setData('categoria_id', value)}>
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

                                {errors.categoria_id && (<p className="text-sm text-red-500">{errors.categoria_id}</p>)}
                            </div>

                            {/* STOCK MÍNIMO */}
                            <div className="space-y-2">
                                <Label htmlFor="stock_minimo" className="whitespace-nowrap">
                                    Stock mín.
                                </Label>

                                <Input
                                    id="stock_minimo"
                                    type="number"
                                    min="1"
                                    step="1"
                                    value={data.stock_minimo}
                                    onChange={(e) => setData('stock_minimo', e.target.value)}
                                    placeholder="5"
                                />

                                {errors.stock_minimo && (<p className="text-sm text-red-500">{errors.stock_minimo}</p>)}
                                {data.stock_minimo !== '' && Number(data.stock_minimo) <= 0 && (<p className="text-sm text-red-500">Debe ser mayor a 0.</p>)}
                            </div>
                        </div>

                        {/* CONTROL INDIVIDUAL */}
                        <div className={`rounded-xl border p-4 transition-colors ${data.control_individual ? 'border-primary/40 bg-primary/5' : 'bg-muted/20'}`}>
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <Label className="font-medium">
                                        Control individual
                                    </Label>

                                    <p className="text-sm text-muted-foreground mt-1">
                                        Controla cada unidad por separado.
                                    </p>
                                </div>

                                <Switch
                                    checked={data.control_individual}
                                    onCheckedChange={(checked) => {
                                        setData('control_individual', checked);

                                        if (!checked) {
                                            setData('referencia_id', '');
                                            setData('maneja_serial', false);
                                        }
                                    }}
                                />
                            </div>

                            {errors.control_individual && (<p className="text-sm text-red-500 mt-2">{errors.control_individual}</p>)}


                            <div className={`grid transition-all duration-300 ${data.control_individual ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    <div className="border-t pt-4">

                                        {/* REFERENCIA */}
                                        <div className="space-y-2">
                                            <Label>
                                                Referencia <span className="text-red-500">*</span>
                                            </Label>

                                            <div className="flex flex-wrap gap-2">
                                                {visibleReferences.map((referencia) => (
                                                    <TooltipProvider key={referencia.id}>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setData('referencia_id', String(referencia.id))}
                                                                    className={`h-10 w-14 rounded-md border font-mono font-semibold transition-all ${
                                                                        data.referencia_id === String(referencia.id)
                                                                            ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                                                                            : 'bg-background hover:border-primary/50 hover:bg-muted'
                                                                    }`}
                                                                >
                                                                    {referencia.codigo}
                                                                </button>
                                                            </TooltipTrigger>

                                                            <TooltipContent>
                                                                <p>{referencia.descripcion ?? referencia.codigo}</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                ))}

                                                {referencias.length > 9 && (
                                                    <Popover
                                                        open={referenceOpen}
                                                        onOpenChange={(open) => {
                                                            setReferenceOpen(open);

                                                            if (!open) {
                                                                setReferenceSearch('');
                                                            }
                                                        }}
                                                    >
                                                        <PopoverTrigger asChild>
                                                            <button type="button" className="h-10 rounded-md border bg-background px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                                                                + {referencias.length - 9} más
                                                            </button>
                                                        </PopoverTrigger>

                                                        <PopoverContent className="w-80 p-3" align="start">
                                                            <div className="space-y-3">
                                                                <Input
                                                                    placeholder="Buscar referencia..."
                                                                    value={referenceSearch}
                                                                    onChange={(e) => setReferenceSearch(e.target.value)}
                                                                    autoFocus
                                                                />

                                                                <div className="max-h-52 overflow-y-auto pr-1">
                                                                    <div className="grid grid-cols-4 gap-2">
                                                                        {referencias
                                                                            .filter((referencia) => !visibleReferences.some((visible) => visible.id === referencia.id))
                                                                            .filter((referencia) => referencia.codigo.toLowerCase().includes(referenceSearch.toLowerCase()))
                                                                            .map((referencia) => (
                                                                                <TooltipProvider key={referencia.id}>
                                                                                    <Tooltip>
                                                                                        <TooltipTrigger asChild>
                                                                                            <button
                                                                                                type="button"
                                                                                                onClick={() => {
                                                                                                    const primera = visibleReferences[0];
                                                                                                    setVisibleReferences([referencia, ...visibleReferences.slice(1),]);
                                                                                                    setData('referencia_id', String(referencia.id));
                                                                                                    setReferenceSearch('');
                                                                                                    setReferenceOpen(false);
                                                                                                }}
                                                                                                className={`h-10 rounded-md border font-mono text-sm font-semibold transition-all ${
                                                                                                    data.referencia_id === String(referencia.id)
                                                                                                        ? 'border-primary bg-primary text-primary-foreground'
                                                                                                        : 'bg-background hover:border-primary/50 hover:bg-muted'
                                                                                                }`}
                                                                                            >
                                                                                                {referencia.codigo}
                                                                                            </button>
                                                                                        </TooltipTrigger>

                                                                                        <TooltipContent>
                                                                                            <p>
                                                                                                {referencia.descripcion ?? referencia.codigo}
                                                                                            </p>
                                                                                        </TooltipContent>
                                                                                    </Tooltip>
                                                                                </TooltipProvider>
                                                                            ))}
                                                                    </div>

                                                                    {referencias
                                                                        .filter((referencia) => !visibleReferences.some((visible) => visible.id === referencia.id))
                                                                        .filter((referencia) => referencia.codigo.toLowerCase().includes(referenceSearch.toLowerCase())).length === 0 && (<p className="py-6 text-center text-sm text-muted-foreground">No se encontraron referencias.</p>)
                                                                    }
                                                                </div>
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                )}
                                            </div>

                                            {errors.referencia_id && (<p className="text-sm text-red-500">{errors.referencia_id}</p>)}
                                        </div>

                                        {errors.referencia_id && (<p className="text-sm text-red-500 mt-2">{errors.referencia_id}</p>)}

                                        {/* MANEJA SERIAL */}
                                        <div className="flex items-center justify-between gap-4 mt-4 rounded-xl border bg-muted/20 p-4">
                                            <div>
                                                <Label className="font-medium">
                                                    Maneja serial
                                                </Label>

                                                <p className="text-sm text-muted-foreground mt-1">
                                                    Registra un serial para cada unidad.
                                                </p>
                                            </div>

                                            <Switch checked={data.maneja_serial} onCheckedChange={(checked) => setData('maneja_serial', checked)}/>
                                        </div>

                                        {errors.maneja_serial && (<p className="text-sm text-red-500 mt-2">{errors.maneja_serial}</p>)}
                                    </div>
                                </div>
                            </div>
                        </div>
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
                    {processing ? 'Guardando...' : isEditing ? 'Actualizar artículo' : 'Guardar artículo'}
                </Button>
            </div>

        </form>
    );
}