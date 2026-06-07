import * as React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerProps = {
    value?: Date;
    onChange: (date: Date | undefined) => void;
    placeholder?: string;
    className?: string;
};

export function DatePicker({
    value,
    onChange,
    placeholder = "Selecciona una fecha",
    className = "w-[240px]",
}: DatePickerProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className={className}>
                    {value
                        ? format(value, "PPP", { locale: es })
                        : placeholder}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="p-0 z-50 w-auto">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    defaultMonth={value}
                    locale={es}
                    captionLayout="dropdown"
                    className="rounded-md border w-[240px]"
                />
            </PopoverContent>
        </Popover>
    );
}