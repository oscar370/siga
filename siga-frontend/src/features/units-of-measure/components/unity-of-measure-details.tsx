"use client";

import { DataField } from "@/components/ui/data-field";
import { ErrorContent } from "@/components/ui/error-content";
import { SkeletonDataField } from "@/components/ui/skeleton-data-field";
import { getUnityOfMeasureById } from "@/services/unity-of-measure/get-unity-of-measure-by-id";
import { useQuery } from "@tanstack/react-query";
import { ProductsInUnityOfMeasureTable } from "./products-in-unity-of-measure-table";

type UnityOfMeasureDetailsProps = {
  id: string;
};

export function UnityOfMeasureDetails({ id }: UnityOfMeasureDetailsProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getUnityOfMeasureById(id),
  });

  if (isError) return <ErrorContent />;

  if (isLoading) return <SkeletonDataField />;

  if (!data) return null;

  return (
    <div className="space-y-2">
      <DataField label="Nombre" value={data.name} />
      <DataField label="Abreviatura" value={data.abbreviation} />
      <DataField label="Productos relacionados">
        <ProductsInUnityOfMeasureTable products={data.products} />
      </DataField>
    </div>
  );
}
