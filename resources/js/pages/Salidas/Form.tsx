import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Props {
    form: any;
    submit: (e: React.FormEvent) => void;
    buttonText: string;
}

export default function Form({
    form,
    submit,
    buttonText,
}: Props) {
    const {
        data,
        setData,
        processing,
        errors,
    } = form;

    return (
        <form
            onSubmit={submit}
            className="space-y-4 max-w-2xl"
        >
            {/* Fecha */}
            <div>
                <label className="text-sm font-medium">
                    Fecha
                </label>

                <Input
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

            {/* Motivo */}
            <div>
                <label className="text-sm font-medium">
                    Motivo
                </label>

                <Input
                    value={data.motivo}
                    onChange={(e) =>
                        setData('motivo', e.target.value)
                    }
                    placeholder="Ej. Entrega de equipo, traslado, baja..."
                />

                {errors.motivo && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.motivo}
                    </p>
                )}
            </div>

            {/* Observaciones */}
            <div>
                <label className="text-sm font-medium">
                    Observaciones
                </label>

                <Textarea
                    value={data.observaciones}
                    onChange={(e) =>
                        setData(
                            'observaciones',
                            e.target.value
                        )
                    }
                    placeholder="Observaciones de la salida..."
                />

                {errors.observaciones && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.observaciones}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                disabled={processing}
            >
                {buttonText}
            </Button>
        </form>
    );
}