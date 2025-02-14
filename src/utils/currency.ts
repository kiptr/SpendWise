export function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function parseIDR(value: string): number {
  const cleanValue = value.replace(/[Rp.,]/g, "").trim();
  return parseInt(cleanValue, 10) || 0;
}
