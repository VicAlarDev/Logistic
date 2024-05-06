import React, { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Camion } from "@prisma/client";

interface SelectPlacaComboboxProps {
  vehiculos: Camion[] | undefined;
}

export const SelectPlacaCombobox: React.FC<SelectPlacaComboboxProps> = ({
  vehiculos,
}) => {
  const [open, setOpen] = useState(false);
  const { control, setValue } = useFormContext();
  const { field } = useController({
    name: "placa",
    control,
  });

  const handleChange = (selectedValue: string) => {
    setValue("placa", selectedValue, { shouldValidate: true });
    field.onChange(selectedValue); // Actualiza el valor en el formulario
    setOpen(false); // Cierra el combobox después de seleccionar
  };

  if (!vehiculos || vehiculos.length === 0) {
    return <CommandEmpty>No se encontraron placas.</CommandEmpty>; // Devuelve un componente o mensaje más descriptivo directamente
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {field.value
            ? vehiculos.find((v) => v.placa === field.value)?.placa
            : "Selecciona una placa"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar placa..." />
          {vehiculos.length === 0 ? (
            <CommandEmpty>No se encontraron placas.</CommandEmpty>
          ) : (
            <CommandGroup>
              {vehiculos.map((vehiculo) => (
                <CommandItem
                  key={vehiculo.id}
                  value={vehiculo.placa}
                  onSelect={() => handleChange(vehiculo.placa)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      field.value === vehiculo.placa
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {vehiculo.placa}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};
