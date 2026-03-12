import { SkeletonItem } from "./skeleton-item";
import { SkeletonTable } from "./skeleton-table";

export function SkeletonDataField() {
  return (
    <div className="space-y-4">
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonTable />
    </div>
  );
}
