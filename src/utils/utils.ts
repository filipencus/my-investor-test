export default function formatCurrency(value: string): { formatted: string; numeric: number } {
  const numeric = parseFloat(value.replace(/[^\d.]/g, "")) || 0;
  const formatted = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(numeric);
  return { formatted, numeric };
}

const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatNumber = (value: number | string = 0) => {
  return formatter.format(Number(value));
};
