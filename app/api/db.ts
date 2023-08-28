type Db = {
  asteroids: AsteroidOnClient[];
  cartAsteroidIds: string[];
  asteroidsInCart: AsteroidOnClient[];
  cartAsteroidQuantity: number;
};
export const db: Db = {
  asteroids: [],
  cartAsteroidIds: [],
  asteroidsInCart: [],
  cartAsteroidQuantity: 0
};
