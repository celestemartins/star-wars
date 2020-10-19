import * as types from "./types";

export const fetchList = (number = 1) => ({
  type: types.FETCH_LIST,
  meta: {
    async: true,
    blocking: true,
    path: `/planets/?page=${number}`,
    method: "GET",
    pagination: number,
  },
});

export function fetchPlanet(name) {
  return {
    type: types.FETCH_PLANET,
    meta: {
      async: true,
      blocking: true,
      path: `/planets/?search=${encodeURIComponent(name)}`,
      method: "GET",
    },
  };
}
