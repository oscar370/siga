import { DataField } from "@/components/ui/data-field";
import { UnityOfMeasureExtended } from "@/types/unity-of-measure/unity-of-measure-extended";
import { ProductsInUnityOfMeasureTable } from "./products-in-unity-of-measure-table";

type UnityOfMeasureDetailsProps = {
  unityOfMeasure: UnityOfMeasureExtended;
};

export function UnityOfMeasureDetails({
  unityOfMeasure,
}: UnityOfMeasureDetailsProps) {
  return (
    <div className="space-y-2">
      <DataField label="Nombre" value={unityOfMeasure.name} />
      <DataField label="Abreviatura" value={unityOfMeasure.abbreviation} />
      <DataField label="Productos relacionados">
        <ProductsInUnityOfMeasureTable products={unityOfMeasure.products} />
      </DataField>
    </div>
  );
}
