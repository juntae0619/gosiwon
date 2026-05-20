export function AuthField({
  label,
  name,
  error,
  hint,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-sm font-medium text-[#1A1614]">
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-[#5C534C]">{hint}</p>}
      {error && <p className="text-xs text-[#C45C3E]">{error}</p>}
    </div>
  );
}
