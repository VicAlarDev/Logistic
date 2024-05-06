"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDeleteItem } from "@/hooks/useDelete";
import * as z from "zod";
import { useToast } from "../../ui/use-toast";
import { VehiculoSchema } from "./vehiculo.schema";
import axios from "axios";
import { AlertModal } from "@/components/modal/alert-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Conductor } from "@prisma/client";

type VehiculoFormValues = z.infer<typeof VehiculoSchema>;

interface VehiculoFormProps {
  initialData: any | null;
  conductores: Conductor[] | undefined;
}

export const VehiculoForm: React.FC<VehiculoFormProps> = ({
  initialData,
  conductores,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Editar Vehiculo" : "Crear Vehiculo";
  const description = initialData
    ? "Editar un Vehiculo."
    : "Crear un Vehiculo.";
  const toastMessage = initialData
    ? "Vehiculo editado ✅"
    : "Vehiculo creado ✅";
  const action = initialData ? "Guardar cambios" : "Crear";

  const defaultValues = initialData
    ? initialData
    : {
        placa: "",
        marca: "",
        modelo: "",
        year: 0,
        color: "",
        peso: 0,
        volumen: 0,
        conductorId: 0,
      };

  const handleDelete = useDeleteItem(
    "camiones",
    "Vehículo eliminado 🗑️",
    "vehiculo",
    initialData?.id,
    setOpen,
  );

  const form = useForm<VehiculoFormValues>({
    resolver: zodResolver(VehiculoSchema),
    defaultValues,
  });

  const onSubmit = async (data: VehiculoFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.put(
          `http://localhost:3000/api/camiones/${initialData.id}`,
          data,
        );
      } else {
        await axios.post(`http://localhost:3000/api/camiones`, data);
      }
      router.refresh();
      router.push(`/dashboard/vehiculo`);
      toast({
        variant: "default",
        title: toastMessage,
        description: "Seras redirigido al dashboard.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    handleDelete.mutate();
  };

  return (
    <>
      {
        <AlertModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={onDelete}
          loading={loading}
        />
      }
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="placa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Placa</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Placa del vehículo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="marca"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Marca del vehículo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="modelo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modelo</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Modelo del vehículo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Año</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Color del vehículo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="peso"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Peso</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="volumen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Volumen</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="conductorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conductor</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={String(field.value)}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={String(field.value)}
                          placeholder="Selecciona un conductor"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* @ts-ignore  */}
                      {conductores.map((conductor) => (
                        <SelectItem
                          key={conductor.id}
                          value={String(conductor.id)}
                        >
                          {`${conductor.nombre} ${conductor.apellido}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
