type Props = {
  title: string;
  subtitle?: string;
};

export function PageHeader({ title, subtitle }: Props) {
  return (
    <div className="text-center  mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
        {title}
      </h1>
      {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
    </div>
  );
}
