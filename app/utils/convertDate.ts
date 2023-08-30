export function convertDate(date: string) {
  return new Date(date).toLocaleString("ru", {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).replace('.', '').replace('г.', '');
}
export function convertDateFull(date: string) {
  return new Date(date).toLocaleString("ru", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
