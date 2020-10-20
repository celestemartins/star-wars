import * as types from "./types";
import { createReducer, modelate } from "../../utils";

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
          ...state.items?.byId,
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
