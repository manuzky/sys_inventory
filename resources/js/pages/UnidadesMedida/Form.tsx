import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
                <label>Abreviatura</label>

                <Input
                    value={data.abreviatura}
                    onChange={(e) => setData('abreviatura', e.target.value)}
                />

                {errors.abreviatura && (
                    <p className="text-red-500 text-sm">
                        {errors.abreviatura}
                    </p>
                )}
            </div>

            <Button disabled={processing}>
                {buttonText}
            </Button>

        </form>
    );
}