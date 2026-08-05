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
                    onChange={(e) =>
                        setData('nombre', e.target.value)
                    }
                />

                {errors.nombre && (
                    <p className="text-red-500 text-sm">
                        {errors.nombre}
                    </p>
                )}
            </div>

            <div>
                <label>Descripción</label>

                <Textarea
                    value={data.descripcion}
                    onChange={(e) =>
                        setData('descripcion', e.target.value)
                    }
                />

                {errors.descripcion && (
                    <p className="text-red-500 text-sm">
                        {errors.descripcion}
                    </p>
                )}
            </div>

            <Button disabled={processing}>
                {buttonText}
            </Button>

        </form>
    );
}