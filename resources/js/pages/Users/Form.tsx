import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Props {
    submitLabel?: string;
}

type Personnel = {
    id: number;
    first_name: string;
    last_name: string;
    email: string | null;
};

type Role = {
    id: number;
    name: string;
};

                            /* =======================================================
                                                CREATE FORM
                            ======================================================= */

export function FormCreate({ data, setData, errors, processing, personnels = [], roles = '', onSubmit, submitLabel = 'Guardar' }: any) {

    const toggleRole = (role: string) => {
        if (data.roles.includes(role)) {
            setData(
                'roles',
                data.roles.filter(
                    (r: string) => r !== role
                )
            );
        } else {
            setData(
                'roles',
                [...data.roles, role]
            );
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4">

            {/* PERSONA */}
            <div>
                <label className="mb-2 block text-sm font-medium">
                    Personal
                </label>

                <Select
                    value={data.personnel_id}
                    onValueChange={(value) => {
                        const selected = personnels.find(
                            (p: any) => String(p.id) === value
                        );

                        setData('personnel_id', value);
                        setData('email', selected?.email ?? '');
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccione una persona" />
                    </SelectTrigger>

                    <SelectContent>
                        {personnels.map((p: any) => (
                            <SelectItem
                                key={p.id}
                                value={String(p.id)}
                            >
                                {p.first_name} {p.last_name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {errors.personnel_id && (
                    <p className="text-sm text-red-500 mt-2">
                        {errors.personnel_id}
                    </p>
                )}
            </div>

            {/* EMAIL */}
            <div>
                <label className="mb-2 block text-sm font-medium">
                    Correo electrónico
                </label>

                <Input
                    value={data.email || ''}
                    disabled
                />
            </div>

            {/* USERNAME */}
            <div>
                <label className="mb-2 block text-sm font-medium">
                    Nombre de usuario
                </label>

                <Input
                    placeholder="Ingrese un nombre de usuario"
                    value={data.username}
                    onChange={(e) =>
                        setData('username', e.target.value)
                    }
                />

                {errors.username && (
                    <p className="text-sm text-red-500 mt-2">
                        {errors.username}
                    </p>
                )}
            </div>

            {/* ROLES Y PERMISOS */}
            <div>

                <label className="mb-2 block text-sm font-medium">
                    Rol
                </label>

                <Select
                    value={data.role}
                    onValueChange={(value) =>
                        setData('role', value)
                    }
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccione un rol" />
                    </SelectTrigger>

                    <SelectContent>

                        {roles.map((role: Role) => (

                            <SelectItem
                                key={role.id}
                                value={role.name}
                            >
                                {role.name}
                            </SelectItem>

                        ))}

                    </SelectContent>

                </Select>

                {errors.role && (
                    <p className="text-sm text-red-500 mt-2">
                        {errors.role}
                    </p>
                )}

            </div>

            {/* PASSWORD */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Contraseña
                    </label>

                    <Input
                        type="password"
                        placeholder="Ingrese una contraseña"
                        value={data.password}
                        onChange={(e) =>
                            setData('password', e.target.value)
                        }
                    />

                    {errors.password && (
                        <p className="text-sm text-red-500 mt-2">
                            {errors.password}
                        </p>
                    )}
                </div>


                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Confirmar contraseña
                    </label>

                    <Input
                        type="password"
                        placeholder="Repita la contraseña"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData(
                                'password_confirmation',
                                e.target.value
                            )
                        }
                    />
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

                        /* =======================================================
                                                    EDIT FORM
                        ======================================================= */

export function FormEdit({ data, setData, errors, processing, personnels = [], roles = [], onSubmit, submitLabel = 'Actualizar' }: any) {

    const toggleRole = (role: string) => {
        if (data.roles.includes(role)) {
            setData(
                'roles',
                data.roles.filter(
                    (r: string) => r !== role
                )
            );
        } else {
            setData(
                'roles',
                [...data.roles, role]
            );
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4">

            {/* PERSONA */}
            <div>
                <label className="mb-2 block text-sm font-medium">
                    Personal
                </label>

                <Select
                    value={data.personnel_id ? String(data.personnel_id) : ''}
                    onValueChange={(value) => {
                        const selected = personnels.find(
                            (p: any) => String(p.id) === value
                        );

                        setData('personnel_id', value);
                        setData('email', selected?.email ?? '');
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccione una persona" />
                    </SelectTrigger>

                    <SelectContent>
                        {personnels.map((p: any) => (
                            <SelectItem
                                key={p.id}
                                value={String(p.id)}
                            >
                                {p.first_name} {p.last_name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {errors.personnel_id && (
                    <p className="text-sm text-red-500 mt-2">
                        {errors.personnel_id}
                    </p>
                )}
            </div>

            {/* EMAIL */}
            <div>
                <label className="mb-2 block text-sm font-medium">
                    Correo electrónico
                </label>

                <Input
                    value={data.email || ''}
                    disabled
                />
            </div>

            {/* USERNAME */}
            <div>
                <label className="mb-2 block text-sm font-medium">
                    Nombre de usuario
                </label>

                <Input
                    value={data.username}
                    onChange={(e) =>
                        setData('username', e.target.value)
                    }
                />

                {errors.username && (
                    <p className="text-sm text-red-500 mt-2">
                        {errors.username}
                    </p>
                )}
            </div>

            {/* ROLES Y PERMISOS */}
            <div>
                <label className="mb-2 block text-sm font-medium">
                    Rol
                </label>

                <Select
                    value={data.role}
                    onValueChange={(value) =>
                        setData('role', value)
                    }
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccione un rol" />
                    </SelectTrigger>

                    <SelectContent>

                        {roles.map((role: Role) => (
                            <SelectItem
                                key={role.id}
                                value={role.name}
                            >
                                {role.name}
                            </SelectItem>
                        ))}

                    </SelectContent>
                </Select>

                {errors.role && (
                    <p className="text-sm text-red-500 mt-2">
                        {errors.role}
                    </p>
                )}
            </div>


            {/* PASSWORD */}
            {!data.change_password ? (
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setData('change_password', true)}
                >
                    Cambiar contraseña
                </Button>
            ) : (
                <>
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Nueva contraseña
                        </label>

                        <Input
                            type="password"
                            placeholder="Nueva contraseña"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                        />

                        {errors.password && (
                            <p className="text-sm text-red-500 mt-2">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Confirmar contraseña
                        </label>

                        <Input
                            type="password"
                            placeholder="Confirmar contraseña"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                        />
                    </div>

                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                            setData('change_password', false);
                            setData('password', '');
                            setData('password_confirmation', '');
                        }}
                    >
                        Cancelar cambio
                    </Button>
                </>
            )}

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