type ContentContainerProps = {
  children: React.ReactNode;
};

export function ContentContainer({ children }: ContentContainerProps) {
  return <div className="max-w-150 px-1">{children}</div>;
}
