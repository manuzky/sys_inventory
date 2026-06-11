import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Personnel = {
    id: number;
    first_name: string;
    last_name: string;
    email: string | null;
};

                            /* =======================================================
                                                CREATE FORM
                            ======================================================= */

export function FormCreate({
    data,
    setData,
    errors,
    processing,
    personnels = [],
    onSubmit,
}: any) {

    return (
        <form onSubmit={onSubmit} className="space-y-4">

            {/* PERSONA */}
            <div>
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
                            <SelectItem key={p.id} value={String(p.id)}>
                                {p.first_name} {p.last_name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* EMAIL */}
            <Input value={data.email || ''} disabled />

            {/* USERNAME */}
            <Input
                placeholder="Username"
                value={data.username}
                onChange={(e) => setData('username', e.target.value)}
            />

            {/* PASSWORD */}
            <Input
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
            />

            <Input
                type="password"
                placeholder="Confirm password"
                value={data.password_confirmation}
                onChange={(e) =>
                    setData('password_confirmation', e.target.value)
                }
            />

            <Button type="submit" disabled={processing}>
                Crear
            </Button>
        </form>
    );
}

                        /* =======================================================
                                                    EDIT FORM
                        ======================================================= */

export function FormEdit({
    data,
    setData,
    errors,
    processing,
    personnels = [],
    onSubmit,
}: any) {

    return (
        <form onSubmit={onSubmit} className="space-y-4">

            {/* PERSONA */}
            <div>
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
                            <SelectItem key={p.id} value={String(p.id)}>
                                {p.first_name} {p.last_name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {errors.personnel_id && (
                    <p className="text-red-500 text-sm">
                        {errors.personnel_id}
                    </p>
                )}
            </div>

            {/* EMAIL */}
            <Input value={data.email || ''} disabled />

            {/* USERNAME */}
            <Input
                value={data.username}
                onChange={(e) => setData('username', e.target.value)}
            />

            {errors.username && (
                <p className="text-red-500 text-sm">
                    {errors.username}
                </p>
            )}

            {/* ACTIVE */}
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={data.active}
                    onChange={(e) => setData('active', e.target.checked)}
                />
                <span>Usuario activo</span>
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
                    <Input
                        type="password"
                        placeholder="Nueva contraseña"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <Input
                        type="password"
                        placeholder="Confirmar"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                    />

                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                            setData('change_password', false);
                            setData('password', '');
                            setData('password_confirmation', '');
                        }}
                    >
                        Cancelar
                    </Button>
                </>
            )}

            <Button type="submit" disabled={processing}>
                Guardar
            </Button>
        </form>
    );
}