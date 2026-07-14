import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Props {
    submitLabel?: string;
}

export function Form({
    data,
    setData,
    processing,
    errors,
    onSubmit,
    submitLabel = 'Guardar'
}: any) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">

            <div>
                <Input
                    placeholder="Nombre para mostrar (ej: Crear Usuarios)"
                    value={data.display_name}
                    onChange={(e) => setData('display_name', e.target.value)}
                />

                {errors.display_name && (
                    <p className="text-red-500 text-sm">
                        {errors.display_name}
                    </p>
                )}
            </div>

            <div>
                <Input
                    placeholder="Nombre técnico (ej: users.create)"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />

                {errors.name && (
                    <p className="text-red-500 text-sm">
                        {errors.name}
                    </p>
                )}
            </div>

            {/* BUTTON */}
            <div className="flex justify-end gap-3 pt-6 border-t">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.history.back()}
                >
                    Cancelar
                </Button>

                <Button
                    type="submit"
                    disabled={processing}
                >
                    {processing ? 'Guardando...' : submitLabel}
                </Button>
            </div>
        </form>
    );
}