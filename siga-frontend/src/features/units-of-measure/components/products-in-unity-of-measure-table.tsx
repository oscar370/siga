import { DataTable } from "@/components/ui/table-app";
import { ProductBasic } from "@/types/product/basic";
import { columns } from "./products-in-unity-of-measure-columns";

type ProductsInUnityOfMeasureTable = {
  products: ProductBasic[];
};

export function ProductsInUnityOfMeasureTable({
  products,
}: ProductsInUnityOfMeasureTable) {
  return (
    <DataTable
      data={products}
      columns={columns}
      filterColumn="name"
      filterPlaceholder="Buscar por nombre..."
    />
  );
}
