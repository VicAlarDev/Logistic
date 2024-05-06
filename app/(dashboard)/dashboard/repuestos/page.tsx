import BreadCrumb from "@/components/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RepuestoForm } from "@/components/forms/repuesto/form-repuesto";

const breadcrumbItems = [{ title: "Profile", link: "/dashboard/profile" }];
export default async function page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <RepuestoForm />
      </div>
    </ScrollArea>
  );
}
