import BreadCrumb from "@/components/breadcrumb";
import { VehiculoTable } from "@/components/tables/camiones-table/vehiculo-table";

const breadcrumbItems = [{ title: "Vehiculo", link: "/dashboard/vehiculo" }];
export default async function page() {

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <VehiculoTable />
      </div>
    </>
  );
}
