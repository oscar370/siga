import { DataTable } from "@/components/ui/table-app";
import { ProductBasic } from "@/types/product/basic";
import { columns } from "./products-in-category-columns";

type ProductsTableProps = {
  products: ProductBasic[];
};

export function ProductsInCategoryTable({ products }: ProductsTableProps) {
  return (
    <DataTable
      data={products}
      columns={columns}
      filterColumn="name"
      filterPlaceholder="Buscar por nombre..."
    />
  );
}
