import { Button } from "@/components/ui/button";
import { ErrorContent } from "@/components/ui/error-content";
import { DataTable } from "@/components/ui/table-app";
import { getCategories } from "@/services/category/get-categories";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "./columns";

export async function CategoriesTable() {
  const categories = await getCategories();

  if (!categories.ok) return <ErrorContent />;

  return (
    <DataTable
      data={categories.data}
      columns={columns}
      filterColumn="name"
      filterPlaceholder="Buscar por nombre..."
      toolbarActions={
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/categories/new">
            <Plus />
            <span>Agregar</span>
          </Link>
        </Button>
      }
    />
  );
}
