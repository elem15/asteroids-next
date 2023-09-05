export default function checkInCart(asteroid: AsteroidOnClient, cartAsteroidIds: string[]) {
  if (cartAsteroidIds.includes(asteroid.id)) {
    asteroid.isInCart = true;
  } else {
    asteroid.isInCart = false;
  }
  return asteroid;
}
