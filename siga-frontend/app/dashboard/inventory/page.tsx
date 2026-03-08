import { PageContainer } from "@/components/ui/page-container";
import { columns, Payment } from "@/features/inventory/components/columns";
import { DataTable } from "@/features/inventory/components/data-table";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ];
}

export default async function Page() {
  const data = await getData();

  return (
    <PageContainer title="Inventario">
      <DataTable columns={columns} data={data} />
    </PageContainer>
  );
}
