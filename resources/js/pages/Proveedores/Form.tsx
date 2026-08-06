import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Props {
    form: any;
    submit: (e: React.FormEvent) => void;
    buttonText: string;
}

export default function Form({ form, submit, buttonText }: Props) {

    const { data, setData, processing, errors } = form;

    return (
        <form onSubmit={submit} className="space-y-4 max-w-xl">

            <div>
                <label>Nombre</label>
                <Input
                    value={data.nombre}
                    onChange={(e) => setData('nombre', e.target.value)}
                />
                {errors.nombre && (
                    <p className="text-red-500 text-sm">
                        {errors.nombre}
                    </p>
                )}
            </div>

            <div>
                <label>RIF</label>
                <Input
                    value={data.rif}
                    onChange={(e) => setData('rif', e.target.value)}
                />
                {errors.rif && (
                    <p className="text-red-500 text-sm">
                        {errors.rif}
                    </p>
                )}
            </div>

            <div>
                <label>Teléfono</label>
                <Input
                    value={data.telefono}
                    onChange={(e) => setData('telefono', e.target.value)}
                />
            </div>

            <div>
                <label>Correo</label>
                <Input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                />
                {errors.email && (
                    <p className="text-red-500 text-sm">
                        {errors.email}
                    </p>
                )}
            </div>

            <div>
                <label>Dirección</label>
                <Textarea
                    value={data.direccion}
                    onChange={(e) => setData('direccion', e.target.value)}
                />
            </div>

            <Button disabled={processing}>
                {buttonText}
            </Button>

        </form>
    );
}