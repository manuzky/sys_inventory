import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { notify } from '@/lib/notify';

interface Permission {
    id: number;
    name: string;
    display_name: string;
}

interface Role {
    id: number;
    name: string;
    permissions: Permission[];
}

interface Props {
    permissions: Permission[];
    role?: Role;
    submitLabel?: string;
}

export default function Form({
    submitLabel = 'Guardar',
    permissions,
    role,
}: Props) {

    const { data, setData, post, put, processing, errors } = useForm({
        name: role?.name ?? '',
        permissions: role?.permissions?.map(p => p.name) ?? [],
    });

    const togglePermission = (permission: string) => {

        if (data.permissions.includes(permission)) {

            setData(
                'permissions',
                data.permissions.filter(p => p !== permission)
            );

        } else {

            setData(
                'permissions',
                [...data.permissions, permission]
            );

        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (role) {
            put(route('roles.update', role.id), {
                onSuccess: () => {
                    notify.success('Rol actualizado correctamente.');
                },
                onError: () => {
                    notify.error('No se pudo actualizar el rol.');
                },
            });
        } else {
            post(route('roles.store'), {
                onSuccess: () => {
                    notify.success('Rol creado correctamente.');
                },
                onError: () => {
                    notify.error('No se pudo crear el rol.');
                },
            });
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6">

            {/* Nombre */}
            <div>

                <Label>Nombre del rol</Label>

                <Input
                    value={data.name}
                    onChange={(e) =>
                        setData('name', e.target.value)
                    }
                />

                {errors.name && (
                    <p className="text-red-500 text-sm">
                        {errors.name}
                    </p>
                )}

            </div>

            {/* Permisos */}
            <div>

                <Label>Permisos</Label>

                <div className="mt-3 space-y-2">

                    {permissions.map((permission) => (
                        <label
                            key={permission.id}
                            className="flex items-center gap-2"
                        >
                            <input
                                type="checkbox"
                                checked={data.permissions.includes(permission.name)}
                                onChange={() =>
                                    togglePermission(permission.name)
                                }
                            />

                            {permission.display_name}
                        </label>
                    ))}

                </div>

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