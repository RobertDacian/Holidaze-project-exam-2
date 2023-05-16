export function formatDate(isoString) {
  const dateFromISO = new Date(isoString);
  return `${dateFromISO.getFullYear()}-${(dateFromISO.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${dateFromISO.getDate().toString().padStart(2, '0')}`;
}
