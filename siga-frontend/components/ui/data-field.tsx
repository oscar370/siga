type DataItemProps =
  | {
      label: string;
      value: string | number;
      children?: never;
    }
  | {
      label: string;
      value?: never;
      children: React.ReactNode;
    };

export function DataItem({ label, value, children }: DataItemProps) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd>{value ?? children}</dd>
    </div>
  );
}

type DataGroupProps = {
  children: React.ReactNode;
};

export function DataGroup({ children }: DataGroupProps) {
  return (
    <section>
      <dl className={"space-y-2"}>{children}</dl>
    </section>
  );
}
