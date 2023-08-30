export default function convertKilometers(km: string) {
  return km.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
