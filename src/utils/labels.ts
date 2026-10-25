export function labelOf<T extends string>(
  options: { value: T; label: string }[],
  value: T
): string {
  return options.find((option) => option.value === value)?.label ?? value;
}