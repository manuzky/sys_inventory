import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Form({
    data,
    setData,
    processing,
    errors,
    onSubmit,
}: any) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">

            <div>
                <Input
                    placeholder="Nombre del permiso (ej: users.create)"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />

                {errors.name && (
                    <p className="text-red-500 text-sm">
                        {errors.name}
                    </p>
                )}
            </div>

            <Button type="submit" disabled={processing}>
                Guardar
            </Button>
        </form>
    );
}