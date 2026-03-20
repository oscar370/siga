import { DataField } from "@/components/ui/data-field";
import { ProductExtended } from "@/types/product/extended";
import Link from "next/link";

type ProductDetailsProps = {
  product: ProductExtended;
};

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="space-y-2">
      <DataField label="Nombre" value={product.name} />
      <DataField label="SKU" value={product.sku} />
      {product.description && (
        <DataField label="Descripción" value={product.description} />
      )}
      <DataField label="Precio base" value={`$ ${product.basePrice}`} />
      <DataField
        label="Categoría"
        value={
          <Link href={`/dashboard/categories/${product.category?.id}`}>
            {product.category?.name}
          </Link>
        }
      />
      <DataField
        label="Unidad de medida"
        value={
          <Link
            href={`/dashboard/units-of-measure/${product.unityOfMeasure?.id}`}
          >
            {product.unityOfMeasure?.name}
          </Link>
        }
      />
    </div>
  );
}
