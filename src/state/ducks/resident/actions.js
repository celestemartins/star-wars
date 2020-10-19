import * as types from "./types";

export function fetchList(planet) {
  return {
    type: types.FETCH_LIST,
    meta: {
      async: true,
      blocking: true,
      method: "GET",
      urls: planet?.residents,
      planet: planet?.name,
    },
  };
}

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

export function selectPlanet(planet) {
  return {
    type: types.SELECT_PLANET,
    payload: planet,
  };
}

export function selectResident(resident) {
  return {
    type: types.SELECT_RESIDENT,
    payload: resident,
  };
}

export function fetchResident(name) {
  return {
    type: types.FETCH_RESIDENT,
    meta: {
      async: true,
      blocking: true,
      path: `/people/?search=${encodeURIComponent(name)}`,
      method: "GET",
    },
  };
}
