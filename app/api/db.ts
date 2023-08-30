type Db = {
  asteroids: AsteroidOnClient[];
  asteroidsInCart: AsteroidOnClient[];
  ids: string[],
  counter: number;
};
export const db: Db = {
  asteroids: [],
  asteroidsInCart: [],
  ids: [],
  counter: 0
};
