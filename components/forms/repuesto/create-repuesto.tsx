"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RepuestoSchema, type RepuestoFormValues } from "./repuesto.schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangleIcon, Trash, Trash2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { use, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import type { Categoria } from "@prisma/client";
import type { Vehiculo } from "@/components/tables/camiones-table/ICamion";
import { CardSelectPlaca } from "./card-select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useCreateRepuesto } from "@/hooks/query";

interface RepuestoFormProps {
  initialData: any | null;
  categorias: Categoria[] | undefined;
  vehiculos: Vehiculo[] | undefined;
}

export const RegistrarRepuesto: React.FC<RepuestoFormProps> = ({
  initialData,
  categorias,
  vehiculos,
}) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vehiculoSeleccionado, setVehiculo] = useState<Vehiculo | null>(null);
  const title = initialData ? "Editar Repuesto" : "Registrar Repuesto";
  const description = initialData
    ? "Editar la información del repuesto."
    : "Registrar repuestos a un vehículo.";
  const toastMessage = initialData ? "Product updated." : "Product created.";
  const action = initialData ? "Save changes" : "Create";
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({});
  const delta = currentStep - previousStep;

  const defaultValues = {
    placa: initialData?.placa || "",
    repuestos: initialData?.repuestos || [
      {
        nombre: "",
        marca: "",
        descripcion: "",
        fechaFabricacion: "",
        serial: "",
        precio: 0,
        categoriaId: 0,
        fechaCambio: "",
      },
    ],
  };

  const form = useForm<RepuestoFormValues>({
    resolver: zodResolver(RepuestoSchema),
    defaultValues,
    mode: "onChange",
  });

  const {
    control,
    formState: { errors },
    setValue,
  } = form;

  const { append, remove, fields } = useFieldArray({
    control,
    name: "repuestos",
  });

  const repuesto = useCreateRepuesto();

  const onSubmit = async (data: RepuestoFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        // await axios.post(`/api/products/edit-product/${initialData._id}`, data);
      } else {
        repuesto.mutate(data);
        console.log("data ==>", data);
      }
      /* router.refresh();
      router.push(`/dashboard/vehiculos`); */
    } catch (error: any) {
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

  const processForm: SubmitHandler<RepuestoFormValues> = (data) => {
    console.log("data ==>", data);
    setData(data);
    //repuesto.mutate(data);
    // form.reset();
  };

  type FieldName = keyof RepuestoFormValues;

  const steps = [
    {
      id: "Paso 1",
      name: "Seleccionar Vehiculo",
      fields: ["placa"],
    },
    {
      id: "Paso 2",
      name: "Datos del Repuesto",
      // fields are mapping and flattening for the error to be trigger  for the dynamic fields
      fields: fields
        ?.map((_, index) => [
          `repuestos.${index}.nombre`,
          `repuestos.${index}.marca`,
          `repuestos.${index}.descripcion`,
          `repuestos.${index}.serial`,
          `repuestos.${index}.fechaFabricacion`,
          `repuestos.${index}.fechaCambio`,
          `repuestos.${index}.precio`,
          `repuestos.${index}.categoriaId`,
          // Add other field names as needed
        ])
        .flat(),
    },
    { id: "Paso 3", name: "Verificación" },
  ];

  const next = async () => {
    const fields = steps[currentStep].fields;

    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await form.handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <>
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
      <div>
        <ul className="flex gap-4">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-sky-600 transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-sky-600">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex h-full w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div>
        <div>
          <Badge
            variant={"outline"}
            className="p-4 text-md font-semibold bg-sky-50 dark:bg-sky-700"
          >
            Vehiculo seleccionado: {vehiculoSeleccionado?.placa}
          </Badge>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(processForm)}
          className="space-y-8 w-full"
        >
          <div
            className={cn(
              currentStep === 0 &&
                "grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 sm:gap-8 ",
              currentStep === 1 && "md:inline-block w-full",
              currentStep === 2 && "w-full",
            )}
          >
            {currentStep === 0 && (
              <>
                <FormField
                  control={form.control}
                  name="placa"
                  render={({ field }) => (
                    <FormField
                      control={form.control}
                      name="placa"
                      render={({ field }) => (
                        <>
                          {vehiculos?.map((vehiculo) => (
                            <CardSelectPlaca
                              key={vehiculo.id}
                              camion={vehiculo}
                              onClick={() => {
                                setVehiculo(vehiculo);
                                setValue("placa", vehiculo.placa);
                              }}
                              isSelected={
                                vehiculoSeleccionado?.id === vehiculo.id
                              }
                            />
                          ))}
                        </>
                      )}
                    />
                  )}
                />
              </>
            )}
            {currentStep === 1 && (
              <>
                {fields?.map((field, index) => (
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue="item-1"
                    key={field.id}
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger
                        className={cn(
                          "[&[data-state=closed]>button]:hidden [&[data-state=open]>.alert]:hidden relative !no-underline",
                          errors?.repuestos?.[index] && "text-red-700",
                        )}
                      >
                        {`Repuesto ${index + 1}`}

                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute right-8"
                          onClick={() => remove(index)}
                        >
                          <Trash2Icon className="h-4 w-4 " />
                        </Button>
                        {errors?.repuestos?.[index] && (
                          <span className="absolute alert right-8">
                            <AlertTriangleIcon className="h-4 w-4   text-red-700" />
                          </span>
                        )}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div
                          className={cn(
                            "md:grid md:grid-cols-3 gap-8 border p-4 rounded-md relative mb-4",
                          )}
                        >
                          <FormField
                            control={form.control}
                            name={`repuestos.${index}.categoriaId`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Categoría del repuesto{" "}
                                  <span className="text-red-600">*</span>
                                </FormLabel>
                                <Select
                                  disabled={loading}
                                  onValueChange={(value) =>
                                    field.onChange(Number(value))
                                  }
                                  value={field.value.toString()}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue
                                        defaultValue={field.value.toString()}
                                        placeholder="Selecciona la categoría"
                                      />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="h-[240px]">
                                    {categorias?.map((categoria) => (
                                      <SelectItem
                                        key={categoria.id}
                                        value={categoria.id.toString()}
                                      >
                                        {categoria.nombre}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`repuestos.${index}.nombre`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Nombre del repuesto{" "}
                                  <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="text"
                                    disabled={loading}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`repuestos.${index}.marca`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Marca del repuesto{" "}
                                  <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="text"
                                    disabled={loading}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`repuestos.${index}.serial`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Serial del repuesto{" "}
                                  <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="text"
                                    disabled={loading}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`repuestos.${index}.fechaFabricacion`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Fecha de fabricación del repuesto{" "}
                                  <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="date"
                                    disabled={loading}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`repuestos.${index}.fechaCambio`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Fecha de cambio del repuesto{" "}
                                  <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="date"
                                    disabled={loading}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`repuestos.${index}.precio`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Precio del repuesto</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    disabled={loading}
                                    {...field}
                                    value={
                                      field.value !== null
                                        ? String(field.value)
                                        : ""
                                    }
                                    onChange={(e) =>
                                      field.onChange(Number(e.target.value))
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`repuestos.${index}.descripcion`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Descripción</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Ingresa una descripción para el repuesto"
                                    className="resize-none"
                                    {...field}
                                    value={
                                      field.value !== null ? field.value : ""
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}

                <div className="flex justify-center mt-4">
                  <Button
                    type="button"
                    className="flex justify-center"
                    size={"lg"}
                    onClick={() =>
                      append({
                        nombre: "",
                        marca: "",
                        descripcion: "",
                        serial: "",
                        fechaFabricacion: "",
                        fechaCambio: "",
                        precio: 0,
                        categoriaId: 0,
                      })
                    }
                  >
                    Agregar mas repuestos
                  </Button>
                </div>
              </>
            )}
            {currentStep === 2 && (
              <div>
                <h1>Estas a un solo paso de registrar los repuestos</h1>
              </div>
            )}
          </div>

          {/* <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button> */}
        </form>
      </Form>
      {/* Navigation */}
      <div className="mt-8 pt-5">
        <div className="flex justify-between">
          <button
            type="button"
            onClick={prev}
            disabled={currentStep === 0}
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
