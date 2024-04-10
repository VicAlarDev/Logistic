import BreadCrumb from "@/components/breadcrumb";
import { ConductorTabla } from "@/components/tables/conductores-tables/conductor-table";

const breadcrumbItems = [
  { title: "Conductores", link: "/dashboard/conductor" },
];
export default async function page() {
  /* const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["conductores"],
    queryFn: async () => {
      const conductores = await fetch("http://localhost:3000/api/conductores");
      return conductores;
    },
  }); */

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <ConductorTabla />
      </div>
    </>
  );
}
