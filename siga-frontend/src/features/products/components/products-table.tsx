import { Button } from "@/components/ui/button";
import { ErrorContent } from "@/components/ui/error-content";
import { DataTable } from "@/components/ui/table-app";
import { getProducts } from "@/services/product/get-products";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "./columns";

export async function ProductsTable() {
  const products = await getProducts();

  if (!products.ok) return <ErrorContent />;

  return (
    <DataTable
      data={products.data}
      columns={columns}
      filterColumn="name"
      filterPlaceholder="Buscar por nombre..."
      toolbarActions={
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/products/new">
            <Plus />
            <span>Agregar</span>
          </Link>
        </Button>
      }
    />
  );
}
