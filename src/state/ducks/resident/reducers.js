import * as types from "./types";
import { createReducer } from "../../utils";

const initialState = [];

const residentsReducer = createReducer(initialState)({
  [types.FETCH_LIST_COMPLETED]: (state, action) => {
    return {
      [action.meta.planet]: {
        residents: action.payload,
      },
      planetName: action.meta.planet,
    };
  },
  [types.SELECT_RESIDENT]: (state, action) => {
    return {
      ...state,
      residentName: action.payload,
    };
  },
  [types.SELECT_PLANET]: (state, action) => {
    return {
      ...state,
      planetName: action.payload,
    };
  },
  [types.FETCH_RESIDENT_COMPLETED]: (state, action) => {
    return {
      ...state,
      resident: action.payload.results && action.payload.results[0],
    };
  },
  [types.FETCH_PLANET_COMPLETED]: (state, action) => {
    return {
      ...state,
      planet: action.payload.results && action.payload.results[0],
    };
  },
});

export default residentsReducer;
