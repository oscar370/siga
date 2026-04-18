"use client";

import { DataGroup, DataItem } from "@/components/ui/data-field";
import { ErrorContent } from "@/components/ui/error-content";
import { Link } from "@/components/ui/link";
import { getProductByIdOptions } from "@/lib/client/@tanstack/react-query.gen";
import { useSuspenseQuery } from "@tanstack/react-query";

type ProductDetailsProps = {
  id: string;
};

export function ProductDetails({ id }: ProductDetailsProps) {
  const { data, isError } = useSuspenseQuery(
    getProductByIdOptions({ path: { id } })
  );

  if (isError) return <ErrorContent />;

  return (
    <DataGroup>
      <DataItem label="Nombre" value={data.name} />

      <DataItem label="SKU" value={data.sku} />

      <DataItem label="Precio base" value={`$ ${data.basePrice}`} />

      <DataItem label="Categoría relacionada">
        <Link href={`/dashboard/categories/${data.categoryId}`}>
          {data.category.name}
        </Link>
      </DataItem>

      <DataItem label="Unidad de medida relacionada">
        <Link href={`/dashboard/units-of-measure/${data.unityOfMeasureId}`}>
          {data.unityOfMeasure.name}
        </Link>
      </DataItem>

      {data.description && (
        <DataItem label="Descripción" value={data.description} />
      )}
    </DataGroup>
  );
}
