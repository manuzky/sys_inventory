import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { notify } from '@/lib/notify';
import { Textarea } from '@/components/ui/textarea';

type UnidadForm = {
    [key: string]: string | number | null;
    identificador: string;
    serial: string;
    ubicacion_id: string;
    estado_id: string;
    fecha_adquisicion: string;
};

interface Articulo {
    id: number;
    nombre: string;
    modelo: string | null;
    control_individual: boolean;
    maneja_serial: boolean;
    stock: string | number;
    referencia: { id: number; codigo: string; } | null;
    marca: { id: number; nombre: string; };
}

interface Proveedor { id: number; nombre: string; }
interface Ubicacion { id: number; nombre: string; } 
interface EstadoArticulo { id: number; nombre: string; }

interface Props {
    articulo: Articulo;
    proveedores: Proveedor[];
    ubicaciones: Ubicacion[];
    estados: EstadoArticulo[];
    siguienteNumero: number;
}

export default function Form({ articulo, proveedores, ubicaciones, estados, siguienteNumero, }: Props) {

    const ubicacionDefault = ubicaciones.find( (ubicacion) => ubicacion.nombre.toLowerCase() === 'almacén' );
    
    const estadoDefault = estados.find( (estado) => estado.nombre.toLowerCase() === 'disponible' );

    const crearUnidad = (numero: number): UnidadForm => ({
        identificador: `${articulo.referencia?.codigo}-${String(
            siguienteNumero + numero - 1
        ).padStart(4, '0')}`,
        serial: '',
        ubicacion_id: ubicacionDefault?.id.toString() ?? '',
        estado_id: estadoDefault?.id.toString() ?? '',
        fecha_adquisicion: new Date().toISOString().split('T')[0],
    });

    const { data, setData, post, processing, errors } = useForm({
        articulo_id: articulo.id,
        proveedor_id: '',
        cantidad: '',
        numero_documento: '',
        fecha: new Date().toISOString().split('T')[0],
        observaciones: '',
        unidades: [] as UnidadForm[],
    });

    const unidadError = (index: number) => errors[`unidades.${index}.serial` as keyof typeof errors];

    const cambiarCantidad = (valor: string) => {
        if (valor !== '' && Number(valor) < 1) {valor = '1';}
        setData('cantidad', valor);
        if (!articulo.control_individual) {setData('unidades', []); return;}
        const cantidad = Math.floor(Number(valor));
        if (!cantidad || cantidad < 1) {setData('unidades', []); return;}

        setData('unidades', Array.from({ length: cantidad }, (_, index) => crearUnidad(index + 1)));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('entradas.store'), {
            onSuccess: () => { notify.success('Entrada registrada correctamente.'); },
            onError: () => { notify.error('No se pudo registrar la entrada. Revisa los campos.');},
        });
    };

    return (
        <form onSubmit={submit} className="space-y-6">

            {/* CUADRO PRINCIPAL */}
            <div className="rounded-lg border bg-background p-6 shadow-sm space-y-6">
                <div>
                    <h2 className="text-lg font-semibold">
                        Datos de la entrada
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Información general de la entrada de inventario.
                    </p>
                </div>

                {/* LÍNEA 1 */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                    <div className="space-y-2">
                        <Label>Nombre</Label>
                        <Input value={articulo.nombre} disabled />
                    </div>

                    <div className="space-y-2">
                        <Label>Marca</Label>
                        <Input value={articulo.marca?.nombre ?? 'Sin marca'} disabled />
                    </div>

                    <div className="space-y-2">
                        <Label>Modelo</Label>
                        <Input value={articulo.modelo ?? 'Sin modelo'} disabled />
                    </div>

                    <div className="space-y-2">
                        <Label>Stock actual</Label>
                        <Input value={Number(articulo.stock)} disabled />
                    </div>

                    <div className="space-y-2">
                        <Label>Referencia</Label>
                        <Input value={articulo.referencia?.codigo ?? 'Sin referencia'} disabled />
                    </div>
                </div>

                {/* LÍNEA 2 */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

                    <div className="space-y-2">
                        <Label htmlFor="proveedor_id">
                            Proveedor
                        </Label>

                        <select
                            id="proveedor_id"
                            value={data.proveedor_id}
                            onChange={(e) => setData('proveedor_id', e.target.value)}
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                        >
                            <option value="">
                                Seleccione un proveedor
                            </option>

                            {proveedores.map((proveedor) => (<option key={proveedor.id} value={proveedor.id}> {proveedor.nombre} </option>))}
                        </select>

                        {errors.proveedor_id && (<p className="text-sm text-red-600"> {errors.proveedor_id} </p>)}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cantidad">
                            Cantidad
                        </Label>

                        <Input
                            id="cantidad"
                            type="number"
                            min="1"
                            step="1"
                            value={data.cantidad}
                            onChange={(e) => {
                                const valor = e.target.value;
                                if (valor === '' || /^\d+$/.test(valor)) {
                                    cambiarCantidad(valor);
                                }
                            }}
                            placeholder="Ingrese la cantidad"
                        />

                        {errors.cantidad && (<p className="text-sm text-red-600">{errors.cantidad}</p>)}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="numero_documento">
                            Número de factura
                        </Label>

                        <Input
                            id="numero_documento"
                            value={data.numero_documento}
                            onChange={(e) => setData('numero_documento', e.target.value)}
                            placeholder="Ej. FAC-12345"
                        />

                        {errors.numero_documento && (<p className="text-sm text-red-600"> {errors.numero_documento} </p>)}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="fecha">
                            Fecha de factura
                        </Label>

                        <Input
                            id="fecha"
                            type="date"
                            value={data.fecha}
                            onChange={(e) => setData('fecha', e.target.value)}
                        />

                        {errors.fecha && (<p className="text-sm text-red-600"> {errors.fecha} </p>)}
                    </div>
                </div>

                {/* LÍNEA 3 */}
                <div className="space-y-2">
                    <Label htmlFor="observaciones">
                        Observaciones
                    </Label>

                    <Textarea
                        id="observaciones"
                        value={data.observaciones}
                        onChange={(e) => setData('observaciones', e.target.value)}
                        placeholder="Observaciones de la entrada..."
                        rows={4}
                    />

                    {errors.observaciones && (<p className="text-sm text-red-600"> {errors.observaciones} </p>)}
                </div>
            </div>

            {/* CUADRO DE UNIDADES */}
            {articulo.control_individual && data.unidades.length > 0 && (
                <div className="rounded-lg border bg-background p-6 shadow-sm space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold">
                            Unidades físicas
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Revise y modifique los datos de cada unidad antes de registrar la entrada.
                        </p>

                        {errors.unidades && (<p className="text-sm text-red-600"> {errors.unidades} </p>)}
                    </div>

                    <div className="overflow-x-auto rounded-lg border">
                        <table className="w-full text-sm">
                            <thead className="bg-muted/50">
                                <tr className="border-b">
                                    <th className="px-4 py-3 text-left font-medium">N°</th>
                                    <th className="px-4 py-3 text-left font-medium">Identificador</th>
                                    {articulo.maneja_serial && (<th className="px-4 py-3 text-left font-medium">Serial</th>)}
                                    <th className="px-4 py-3 text-left font-medium">Estado</th>
                                    <th className="px-4 py-3 text-left font-medium">Ubicación</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.unidades.map((unidad, index) => (
                                    <tr key={index} className="border-b last:border-b-0 hover:bg-muted/30">
                                        <td className="px-4 py-3 font-medium">
                                            {index + 1}
                                        </td>

                                        {/* IDENTIFICADOR */}
                                        <td className="px-4 py-3">
                                            <Input value={unidad.identificador} disabled className="min-w-[140px] bg-muted"/>
                                        </td>

                                        {/* SERIAL */}
                                        {articulo.maneja_serial && (
                                            <td className="px-4 py-3">
                                                <Input
                                                    value={unidad.serial}
                                                    onChange={(e) => {
                                                        const unidades = [...data.unidades];
                                                        unidades[index] = { ...unidades[index], serial: e.target.value };
                                                        setData('unidades', unidades);
                                                    }}
                                                    placeholder="Serial"
                                                    className="min-w-[160px]"
                                                />

                                                {unidadError(index) && (<p className="text-sm text-red-600 mt-1"> {unidadError(index)} </p>)}
                                            </td>
                                        )}

                                        {/* ESTADO */}
                                        <td className="px-4 py-3">
                                            <select
                                                value={unidad.estado_id}
                                                onChange={(e) => {
                                                    const unidades = [...data.unidades, ];
                                                    unidades[index] = {...unidades[index], estado_id: e.target.value,};
                                                    setData('unidades', unidades);
                                                }}
                                                className="min-w-[150px] rounded-md border bg-background px-3 py-2 text-sm"
                                            >
                                                {estados.map((estado) => (
                                                    <option key={estado.id} value={estado.id}>
                                                        {estado.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>

                                        {/* UBICACIÓN */}
                                        <td className="px-4 py-3">
                                            <select
                                                value={unidad.ubicacion_id}
                                                onChange={(e) => {
                                                    const unidades = [...data.unidades,];
                                                    unidades[index] = {...unidades[index], ubicacion_id: e.target.value,};
                                                    setData('unidades', unidades);
                                                }}
                                                className="min-w-[150px] rounded-md border bg-background px-3 py-2 text-sm"
                                            >
                                                {ubicaciones.map((ubicacion) => (
                                                    <option key={ubicacion.id} value={ubicacion.id}>
                                                        {ubicacion.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ACCIONES */}
            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                    Cancelar
                </Button>

                <Button type="submit" disabled={processing}>
                    Registrar entrada
                </Button>
            </div>
        </form>
    );
}