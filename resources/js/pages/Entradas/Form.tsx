import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
    form: any;
    proveedores: { id: number; nombre: string }[];
    submit: (e: React.FormEvent) => void;
    buttonText: string;
}

export default function Form({ form, proveedores, submit, buttonText }: Props) {
    const { data, setData, processing, errors } = form;

    return (
        <form onSubmit={submit} className="space-y-4 max-w-2xl">
            <div>
                <label>Proveedor</label>
                <Select value={String(data.proveedores_id)} onValueChange={(value) => setData('proveedores_id', Number(value))}>
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccione un proveedor" />
                    </SelectTrigger>
                    <SelectContent>
                        {proveedores.map((proveedor) => (
                            <SelectItem key={proveedor.id} value={String(proveedor.id)}>
                                {proveedor.nombre}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.proveedores_id && <p className="text-red-500 text-sm">{errors.proveedores_id}</p>}
            </div>

            <div>
                <label>Fecha</label>
                <Input type="date" value={data.fecha} onChange={(e) => setData('fecha', e.target.value)} />
                {errors.fecha && <p className="text-red-500 text-sm">{errors.fecha}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label>Tipo de documento</label>
                    <Input value={data.tipo_documento} onChange={(e) => setData('tipo_documento', e.target.value)} placeholder="Factura, nota de entrega..." />
                    {errors.tipo_documento && <p className="text-red-500 text-sm">{errors.tipo_documento}</p>}
                </div>

                <div>
                    <label>Número de documento</label>
                    <Input value={data.numero_documento} onChange={(e) => setData('numero_documento', e.target.value)} />
                    {errors.numero_documento && <p className="text-red-500 text-sm">{errors.numero_documento}</p>}
                </div>
            </div>

            <div>
                <label>Observación</label>
                <Textarea value={data.observacion} onChange={(e) => setData('observacion', e.target.value)} placeholder="Observaciones de la entrada..." />
                {errors.observacion && <p className="text-red-500 text-sm">{errors.observacion}</p>}
            </div>

            <Button disabled={processing}>{buttonText}</Button>
        </form>
    );
}