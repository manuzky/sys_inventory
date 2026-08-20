import { FormEventHandler } from 'react';
import { useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { notify } from '@/lib/notify';

interface Referencia {
    id: number;
    codigo: string;
    descripcion: string | null;
    estado: boolean;
}

interface Props {
    referencia?: Referencia;
}

export default function ReferenciaForm({ referencia }: Props) {
    const isEditing = !!referencia;

    const { data, setData, post, put, processing, errors } = useForm({
        codigo: referencia?.codigo ?? '',
        descripcion: referencia?.descripcion ?? '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEditing) {
            put(
                route('referencias.update', referencia.id),
                {
                    onSuccess: () => {
                        notify.success(
                            'Referencia actualizada correctamente.'
                        );
                    },
                    onError: () => {
                        notify.error(
                            'No se pudo actualizar la referencia.'
                        );
                    },
                }
            );
            return;
        }

        post(
            route('referencias.store'),
            {
                onSuccess: () => {
                    notify.success(
                        'Referencia creada correctamente.'
                    );
                },
                onError: () => {
                    notify.error(
                        'No se pudo crear la referencia.'
                    );
                },
            }
        );
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            {/* INFORMACIÓN DE LA REFERENCIA */}
            <div className="rounded-lg border bg-card p-6">
                <div className="mb-6">
                    <h2 className="text-base font-semibold">
                        Información de la referencia
                    </h2>

                    <p className="text-sm text-muted-foreground mt-1">
                        Define el código que utilizará el sistema para identificar las unidades.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* CÓDIGO */}
                    <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="codigo">
                            Código <span className="text-red-500">*</span>
                        </Label>

                        <Input
                            id="codigo"
                            value={data.codigo}
                            maxLength={3}
                            onChange={(e) =>
                                setData(
                                    'codigo',
                                    e.target.value
                                        .replace(/[^a-zA-Z]/g, '')
                                        .toUpperCase()
                                )
                            }
                            placeholder="LAP"
                            className="uppercase text-center font-semibold tracking-wider"
                        />

                        <p className="text-xs text-muted-foreground">
                            Exactamente 3 letras.
                        </p>

                        {errors.codigo && (
                            <p className="text-sm text-red-500">
                                {errors.codigo}
                            </p>
                        )}
                    </div>

                    {/* DESCRIPCIÓN */}
                    <div className="md:col-span-10 space-y-2">
                        <Label htmlFor="descripcion">
                            Descripción
                        </Label>

                        <Textarea
                            id="descripcion"
                            value={data.descripcion}
                            onChange={(e) =>
                                setData(
                                    'descripcion',
                                    e.target.value
                                )
                            }
                            placeholder="Ej. Identificador utilizado para equipos portátiles tipo laptop."
                            rows={3}
                        />

                        <p className="text-xs text-muted-foreground">
                            Indica qué tipo de artículo representa esta referencia.
                        </p>

                        {errors.descripcion && (
                            <p className="text-sm text-red-500">
                                {errors.descripcion}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* BOTONES */}
            <div className="flex justify-end gap-3">
                <Link href={route('referencias.index')}>
                    <Button
                        type="button"
                        variant="outline"
                    >
                        Cancelar
                    </Button>
                </Link>

                <Button
                    type="submit"
                    disabled={processing}
                >
                    {processing
                        ? 'Guardando...'
                        : isEditing
                            ? 'Actualizar referencia'
                            : 'Guardar referencia'}
                </Button>
            </div>
        </form>
    );
}