"use client";

import { DataField } from "@/components/ui/data-field";
import { ErrorContent } from "@/components/ui/error-content";
import { SkeletonDataField } from "@/components/ui/skeleton-data-field";
import { getProductById } from "@/services/product/get-product-by-id";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

type ProductDetailsProps = {
  id: string;
};

export function ProductDetails({ id }: ProductDetailsProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getProductById(id),
  });

  if (isError) return <ErrorContent />;

  if (isLoading) return <SkeletonDataField />;

  if (!data) return null;

  return (
    <div className="space-y-2">
      <DataField label="Nombre" value={data.name} />
      <DataField label="SKU" value={data.sku} />
      {data.description && (
        <DataField label="Descripción" value={data.description} />
      )}
      <DataField label="Precio base" value={`$ ${data.basePrice}`} />
      <DataField
        label="Categoría"
        value={
          <Link href={`/dashboard/categories/${data.category?.id}`}>
            {data.category?.name}
          </Link>
        }
      />
      <DataField
        label="Unidad de medida"
        value={
          <Link href={`/dashboard/units-of-measure/${data.unityOfMeasure?.id}`}>
            {data.unityOfMeasure?.name}
          </Link>
        }
      />
    </div>
  );
}
