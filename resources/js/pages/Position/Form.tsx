import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Props {
    data: {
        name: string;
        description: string;
    };

    setData: (field: string, value: any) => void;
    submit: (e: React.FormEvent) => void;
    processing: boolean;
    errors: any;
}

export default function Form({ data, setData, submit, processing, errors }: Props) {
    return (
        <form onSubmit={submit} className="space-y-4">

            {/* NAME */}
            <div>
                <Input
                    placeholder="Nombre del cargo"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
                {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                )}
            </div>

            {/* DESCRIPTION */}
            <div>
                <Textarea
                    placeholder="Descripción (opcional)"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                />
                {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                )}
            </div>

            {/* BUTTON */}
            <Button type="submit" disabled={processing}>
                Guardar
            </Button>

        </form>
    );
}