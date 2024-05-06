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
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../ui/use-toast";
import { ConductorSchema } from "./conductor.schema";
import axios from "axios";
import { AlertModal } from "@/components/modal/alert-modal";
import { cn } from "@/lib/utils";
import { useCreateConductor, useUpdateConductor } from "@/hooks/query";

type ConductorFormValues = z.infer<typeof ConductorSchema>;

interface ConductorFormProps {
  initialData: any | null;
}

export const ConductorForm: React.FC<ConductorFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Editar conductor" : "Crear conductor";
  const description = initialData
    ? "Editar un conductor."
    : "Crear un conductor.";
  const toastMessage = initialData
    ? "Conductor editado ✅"
    : "Conductor creado ✅";
  const action = initialData ? "Guardar cambios" : "Crear";

  const defaultValues = initialData
    ? initialData
    : {
        nombre: "",
        apellido: "",
        cedula: "",
        telefono: "",
        direccion: "",
      };

  const form = useForm<ConductorFormValues>({
    resolver: zodResolver(ConductorSchema),
    defaultValues,
  });

  const createConductor = useCreateConductor();
  const updateConductor = useUpdateConductor();

  const onSubmit = async (data: ConductorFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        updateConductor.mutate({ id: initialData.id, info: data });
      } else {
        createConductor.mutate(data);
      }
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
    try {
      setLoading(true);
      //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
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
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nombre del conductor"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apellido"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Apellido del conductor"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefono</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Telefono del conductor"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cedula"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cedula</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Cedula del conductor"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="direccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Dirección corta del conductor"
                      {...field}
                    />
                  </FormControl>
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
