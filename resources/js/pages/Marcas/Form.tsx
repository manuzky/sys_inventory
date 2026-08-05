import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface FormProps {
    form: any;
    submit: (e: React.FormEvent) => void;
    buttonText: string;
}

export default function Form({
    form,
    submit,
    buttonText,
}: FormProps) {

    const {
        data,
        setData,
        processing,
        errors,
    } = form;

    return (
        <form onSubmit={submit} className="space-y-4 max-w-xl" >
            <div>
                <label className="mb-2 block text-sm font-medium">
                    Nombre
                </label>

                <Input
                    value={data.nombre}
                    onChange={(e) =>
                        setData(
                            'nombre',
                            e.target.value
                        )
                    }
                />
                {errors.nombre && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.nombre}
                    </p>
                )}
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">
                    Descripción
                </label>

                <Textarea
                    value={data.descripcion}
                    onChange={(e) =>
                        setData(
                            'descripcion',
                            e.target.value
                        )
                    }
                />
                {errors.descripcion && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.descripcion}
                    </p>
                )}
            </div>

            <div className="pt-2">
                <Button
                    disabled={processing}
                >
                    {buttonText}
                </Button>
            </div>
        </form>
    );
}