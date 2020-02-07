export function toDbDate(jsd: Date): string {
  return `${jsd.getFullYear()}-${('0' + jsd.getMonth()).slice(-2)}-${('0' + jsd.getDate()).slice(-2)} ${(
    '0' + jsd.getHours()
  ).slice(-2)}:${('0' + jsd.getMinutes()).slice(-2)}:${('0' + jsd.getSeconds()).slice(-2)}`;
}
