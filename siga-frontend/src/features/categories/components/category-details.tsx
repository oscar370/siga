"use client";

import { DataField } from "@/components/ui/data-field";
import { ErrorContent } from "@/components/ui/error-content";
import { SkeletonDataField } from "@/components/ui/skeleton-data-field";
import { getCategoryById } from "@/services/category/get-categoryById";
import { useQuery } from "@tanstack/react-query";
import { ProductsInCategoryTable } from "./products-in-category-table";

type CategoryDetailsProps = {
  id: string;
};

export function CategoryDetails({ id }: CategoryDetailsProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(+id),
  });

  if (isError) return <ErrorContent />;

  if (isLoading) return <SkeletonDataField />;

  if (data)
    return (
      <div className="space-y-2">
        <DataField label="Nombre" value={data.name} />
        {data.description && (
          <DataField label="Descripción" value={data.description} />
        )}
        <DataField label="Productos relacionados">
          <ProductsInCategoryTable products={data.products} />
        </DataField>
      </div>
    );
}
