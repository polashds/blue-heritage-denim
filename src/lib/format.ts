export function formatPrice(paisa: number): string {
  return `৳${(paisa / 100).toLocaleString("en-BD")}`;
}
