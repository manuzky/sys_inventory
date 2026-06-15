import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Permission {
    id: number;
    name: string;
}

interface Role {
    id: number;
    name: string;
    permissions: Permission[];
}

interface Props {
    permissions: Permission[];
    role?: Role;
}

export default function Form({
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

            put(route('roles.update', role.id));

        } else {

            post(route('roles.store'));

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

                            {permission.name}
                        </label>
                    ))}

                </div>

            </div>

            <Button type="submit" disabled={processing}>
                Guardar
            </Button>

        </form>
    );
}