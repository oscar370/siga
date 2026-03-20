import { DataField } from "@/components/ui/data-field";
import { CategoryExtended } from "@/types/category/extended";
import { ProductsInCategoryTable } from "./products-in-category-table";

type CategoryDetailsProps = {
  category: CategoryExtended;
};

export function CategoryDetails({ category }: CategoryDetailsProps) {
  return (
    <div className="space-y-2">
      <DataField label="Nombre" value={category.name} />
      {category.description && (
        <DataField label="Descripción" value={category.description} />
      )}
      <DataField label="Productos relacionados">
        <ProductsInCategoryTable products={category.products} />
      </DataField>
    </div>
  );
}
