import * as types from "./types";
import { createReducer } from "../../utils";

function modelate(data) {
  // Structure data by id to better access (we are using name as id because it's the key in the API)
  const modelated = {};
  data.forEach((d) => {
    modelated[d.name] = { ...d };
  });
  return modelated;
}

const planetsReducer = createReducer([])({
  [types.FETCH_LIST]: (state) => {
    return {
      ...state,
      loading: true,
    };
  },
  [types.FETCH_LIST_COMPLETED]: (state, action) => {
    return {
      ...state,
      items: {
        ...state.items,
        [action.meta.pagination]: action.payload.results,
        byId: {
          ...state.byId,
          ...modelate(action.payload.results),
        },
      },
      next: action.payload.next,
      count: action.payload.count,
      loading: false,
      error: false
    };
  },
  [types.FETCH_LIST_FAILED]: (state, action) => {
    return {
      ...state,
      error: true,
      loading: false
  }}
});

export default planetsReducer;
