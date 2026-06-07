import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type PersonnelFormProps = {
    data: any;
    setData: any;
    errors: any;
    processing: boolean;

    date: Date | undefined;
    setDate: (date: Date | undefined) => void;

    positions: any[];

    submitLabel?: string;
    onSubmit: (e: React.FormEvent) => void;
};

export default function Form({ data, setData, errors, processing, date, setDate, positions, submitLabel = 'Guardar', onSubmit, }: PersonnelFormProps) {

    return (
        <form onSubmit={onSubmit} className="space-y-4">

            {/* Nombre */}
            <div>
                <Input
                    placeholder="Nombre"
                    value={data.first_name}
                    onChange={(e) => setData('first_name', e.target.value)}
                />

                {errors.first_name && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.first_name}
                    </p>
                )}
            </div>

            {/* Apellido */}
            <div>
                <Input
                    placeholder="Apellido"
                    value={data.last_name}
                    onChange={(e) => setData('last_name', e.target.value)}
                />

                {errors.last_name && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.last_name}
                    </p>
                )}
            </div>

            {/* Cédula */}
            <div>
                <Input
                    type="number"
                    placeholder="Cédula"
                    value={data.id_number}
                    onChange={(e) => setData('id_number', e.target.value)}
                />

                {errors.id_number && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.id_number}
                    </p>
                )}
            </div>

            {/* Correo */}
            <div>
                <Input
                    type="email"
                    placeholder="Correo"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                />

                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                    </p>
                )}
            </div>

            {/* Fecha de nacimiento */}
            <div>
                <DatePicker
                    value={date}
                    onChange={(value) => {
                        setDate(value);

                        if (!value) {
                            setData('birth_date', '');
                            return;
                        }

                        const year = value.getFullYear();
                        const month = String(value.getMonth() + 1).padStart(2, '0');
                        const day = String(value.getDate()).padStart(2, '0');

                        setData(
                            'birth_date',
                            `${year}-${month}-${day}`
                        );
                    }}
                />

                {errors.birth_date && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.birth_date}
                    </p>
                )}
            </div>

            {/* Teléfono */}
            <div>
                <Input
                    placeholder="Teléfono"
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                />

                {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                    </p>
                )}
            </div>

            {/* Dirección */}
            <div>
                <Input
                    placeholder="Dirección"
                    value={data.address}
                    onChange={(e) => setData('address', e.target.value)}
                />

                {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.address}
                    </p>
                )}
            </div>

            {/* Sexo */}
            <div>
                <Select
                    value={data.gender}
                    onValueChange={(value) => setData('gender', value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Sexo" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="male">
                            Masculino
                        </SelectItem>

                        <SelectItem value="female">
                            Femenino
                        </SelectItem>
                    </SelectContent>
                </Select>

                {errors.gender && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.gender}
                    </p>
                )}
            </div>

            {/* Cargo / Position */}
            <div>
                <Select
                    value={data.position_id ? String(data.position_id) : ''}
                    onValueChange={(value) => setData('position_id', value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Cargo" />
                    </SelectTrigger>

                    <SelectContent>
                        {positions.map((position) => (
                            <SelectItem
                                key={position.id}
                                value={String(position.id)}
                            >
                                {position.name}
                                {!position.active && ' 🔒'}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {errors.position_id && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.position_id}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                disabled={processing}
            >
                {submitLabel}
            </Button>

        </form>
    );
}