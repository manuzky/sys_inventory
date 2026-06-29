import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';

type PersonnelFormProps = {
    data: any;
    setData: any;
    errors: any;
    processing: boolean;
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    hireDate: Date | undefined;
    setHireDate: (date: Date | undefined) => void;
    positions: any[];
    currentPhoto?: string | null;
    submitLabel?: string;
    onSubmit: (e: React.FormEvent) => void;
};

export default function Form({
    data,
    setData,
    errors,
    processing,
    date,
    setDate,
    hireDate,
    setHireDate,
    positions,
    currentPhoto,
    submitLabel = 'Guardar',
    onSubmit,
}: PersonnelFormProps) {

    const previewUrl =
        data.photo instanceof File
            ? URL.createObjectURL(data.photo)
            : currentPhoto
                ? `/storage/${currentPhoto}`
                : null;

    return (
        <form onSubmit={onSubmit} className="space-y-6">

            {/* ===================== DATOS PERSONALES ===================== */}

            {/* Nombre */}
            <div>
                <Input
                    placeholder="Nombre"
                    value={data.first_name}
                    onChange={(e) => setData('first_name', e.target.value)}
                />

                {errors.first_name && (
                    <p className="text-sm text-red-500 mt-1">
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
                    <p className="text-sm text-red-500 mt-1">
                        {errors.last_name}
                    </p>
                )}
            </div>

            {/* Documento */}
            <div>

                <label className="text-sm font-medium">
                    Documento
                </label>

                <div className="flex gap-2">

                    <Select
                        value={data.document_type}
                        onValueChange={(value) =>
                            setData('document_type', value)
                        }
                    >
                        <SelectTrigger className="w-24">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="V">
                                V
                            </SelectItem>

                            <SelectItem value="E">
                                E
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    <Input
                        className="flex-1"
                        placeholder="Número de cédula"
                        value={data.id_number}
                        onChange={(e) =>
                            setData(
                                'id_number',
                                e.target.value.replace(/\D/g, '')
                            )
                        }
                    />

                </div>

                {errors.document_type && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.document_type}
                    </p>
                )}

                {errors.id_number && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.id_number}
                    </p>
                )}

            </div>

            {/* Correo */}
            <div>

                <label className="text-sm font-medium">
                    Correo electrónico
                </label>

                <div className="flex gap-2">

                    <Input
                        className="flex-1"
                        placeholder="usuario"
                        value={data.email_local}
                        onChange={(e) =>
                            setData('email_local', e.target.value)
                        }
                    />

                    <Select
                        value={data.email_domain}
                        onValueChange={(value) =>
                            setData('email_domain', value)
                        }
                    >
                        <SelectTrigger className="w-48">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>

                            <SelectItem value="@gmail.com">
                                @gmail.com
                            </SelectItem>

                            <SelectItem value="@hotmail.com">
                                @hotmail.com
                            </SelectItem>

                            <SelectItem value="@outlook.com">
                                @outlook.com
                            </SelectItem>

                            <SelectItem value="other">
                                Otro...
                            </SelectItem>

                        </SelectContent>

                    </Select>

                </div>

                {data.email_domain === 'other' && (

                    <div className="mt-2">

                        <Input
                            placeholder="@empresa.com"
                            value={data.email_custom_domain}
                            onChange={(e) =>
                                setData(
                                    'email_custom_domain',
                                    e.target.value
                                )
                            }
                        />

                    </div>

                )}

                {errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.email}
                    </p>
                )}

            </div>

            {/* Fecha de nacimiento */}
            <div>

                <label className="text-sm font-medium">
                    Fecha de nacimiento
                </label>

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
                    <p className="text-sm text-red-500 mt-1">
                        {errors.birth_date}
                    </p>
                )}

            </div>

                        {/* ===================== CONTACTO ===================== */}

            {/* Teléfono principal */}
            <div>

                <label className="text-sm font-medium">
                    Teléfono principal
                </label>

                <div className="flex gap-2">

                    <Select
                        value={data.phone_code}
                        onValueChange={(value) =>
                            setData('phone_code', value)
                        }
                    >
                        <SelectTrigger className="w-28">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="0412">0412</SelectItem>
                            <SelectItem value="0414">0414</SelectItem>
                            <SelectItem value="0416">0416</SelectItem>
                            <SelectItem value="0422">0422</SelectItem>
                            <SelectItem value="0424">0424</SelectItem>
                            <SelectItem value="0426">0426</SelectItem>
                        </SelectContent>
                    </Select>

                    <Input
                        className="flex-1"
                        placeholder="1234567"
                        maxLength={7}
                        value={data.phone}
                        onChange={(e) =>
                            setData(
                                'phone',
                                e.target.value.replace(/\D/g, '')
                            )
                        }
                    />

                </div>

                {errors.phone && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.phone}
                    </p>
                )}

            </div>

            {/* Segundo teléfono */}
            <div>

                <label className="text-sm font-medium">
                    Teléfono de contacto
                </label>

                <div className="flex gap-2">

                    <Select
                        value={data.secondary_phone_code}
                        onValueChange={(value) =>
                            setData('secondary_phone_code', value)
                        }
                    >
                        <SelectTrigger className="w-28">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="0412">0412</SelectItem>
                            <SelectItem value="0414">0414</SelectItem>
                            <SelectItem value="0416">0416</SelectItem>
                            <SelectItem value="0422">0422</SelectItem>
                            <SelectItem value="0424">0424</SelectItem>
                            <SelectItem value="0426">0426</SelectItem>
                        </SelectContent>
                    </Select>

                    <Input
                        className="flex-1"
                        placeholder="1234567"
                        maxLength={7}
                        value={data.secondary_phone}
                        onChange={(e) =>
                            setData(
                                'secondary_phone',
                                e.target.value.replace(/\D/g, '')
                            )
                        }
                    />

                </div>

                {errors.secondary_phone && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.secondary_phone}
                    </p>
                )}

            </div>

            {/* Dirección */}
            <div>

                <label className="text-sm font-medium">
                    Dirección
                </label>

                <Textarea
                    placeholder="Dirección"
                    value={data.address}
                    onChange={(e) =>
                        setData('address', e.target.value)
                    }
                />

                {errors.address && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.address}
                    </p>
                )}

            </div>

            {/* Sexo */}
            <div>

                <label className="text-sm font-medium">
                    Sexo
                </label>

                <Select
                    value={data.gender}
                    onValueChange={(value) =>
                        setData('gender', value)
                    }
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccione..." />
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
                    <p className="text-sm text-red-500 mt-1">
                        {errors.gender}
                    </p>
                )}

            </div>

            {/* Estado civil */}
            <div>

                <label className="text-sm font-medium">
                    Estado civil
                </label>

                <Select
                    value={data.marital_status}
                    onValueChange={(value) =>
                        setData('marital_status', value)
                    }
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccione..." />
                    </SelectTrigger>

                    <SelectContent>

                        <SelectItem value="single">
                            Soltero(a)
                        </SelectItem>

                        <SelectItem value="married">
                            Casado(a)
                        </SelectItem>

                        <SelectItem value="divorced">
                            Divorciado(a)
                        </SelectItem>

                        <SelectItem value="widowed">
                            Viudo(a)
                        </SelectItem>

                    </SelectContent>

                </Select>

                {errors.marital_status && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.marital_status}
                    </p>
                )}

            </div>

            {/* Fecha de ingreso */}
            <div>

                <label className="text-sm font-medium">
                    Fecha de ingreso
                </label>

                <DatePicker
                    value={hireDate}
                    onChange={(value) => {

                        setHireDate(value);

                        if (!value) {
                            setData('hire_date', '');
                            return;
                        }

                        const year = value.getFullYear();
                        const month = String(value.getMonth() + 1).padStart(2, '0');
                        const day = String(value.getDate()).padStart(2, '0');

                        setData(
                            'hire_date',
                            `${year}-${month}-${day}`
                        );

                    }}
                />

                {errors.hire_date && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.hire_date}
                    </p>
                )}

            </div>

            {/* Cargo */}
            <div>

                <label className="text-sm font-medium">
                    Cargo
                </label>

                <Select
                    value={
                        data.position_id
                            ? String(data.position_id)
                            : ''
                    }
                    onValueChange={(value) =>
                        setData('position_id', value)
                    }
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccione un cargo" />
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
                    <p className="text-sm text-red-500 mt-1">
                        {errors.position_id}
                    </p>
                )}

            </div>

                        {/* ===================== ARCHIVOS ===================== */}

            {/* Foto */}
            <div>

                <label className="text-sm font-medium">
                    Fotografía
                </label>

                <div className="flex justify-center my-4">

                    {previewUrl ? (

                        <img
                            src={previewUrl}
                            alt="Vista previa"
                            className="h-32 w-32 rounded-full object-cover border"
                        />

                    ) : (

                        <div className="h-32 w-32 rounded-full border flex items-center justify-center text-sm text-muted-foreground">
                            Sin fotografía
                        </div>

                    )}

                </div>

                <Input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={(e) =>
                        setData(
                            'photo',
                            e.target.files?.[0] ?? null
                        )
                    }
                />

                {errors.photo && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.photo}
                    </p>
                )}

            </div>

            {/* Curriculum */}
            <div>

                <label className="text-sm font-medium">
                    Curriculum (PDF)
                </label>

                <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) =>
                        setData(
                            'curriculum',
                            e.target.files?.[0] ?? null
                        )
                    }
                />

                {errors.curriculum && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.curriculum}
                    </p>
                )}

            </div>

            {/* Botón */}

            <div className="pt-4">

                <Button
                    type="submit"
                    disabled={processing}
                    className="w-full"
                >
                    {submitLabel}
                </Button>

            </div>

        </form>
    );
}