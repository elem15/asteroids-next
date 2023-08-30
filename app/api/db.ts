type Db = {
  asteroids: AsteroidOnClient[];
  ids: string[],
  counter: number;
};
export const db: Db = {
  asteroids: [],
  ids: [],
  counter: 0
};
