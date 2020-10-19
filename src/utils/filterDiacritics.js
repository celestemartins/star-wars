import _get from "lodash-es/get";
import _intersection from "lodash-es/intersection";

import { remove as removeDiacritics } from "diacritics";
import { createSelector } from "reselect";
import FuzzySearch from "fuzzy-search";

const searchDataMapper = function (user, searchKeys) {
  const obj = {};
  searchKeys.forEach(
    (key) => (obj[key] = removeDiacritics(_get(user, key, "")))
  );
  return obj;
};

export const filterItems = (
  users = [],
  filters,
  searchKeys,
  usePageFilters = false,
  options = {}
) => {
  const { search = "", ...otherFilters } = filters;
  const removeUsersDiacriticsAndFilter = createSelector(
    (users) => users,
    (users, otherFilters) => otherFilters,
    (users, otherFilters) => {
      return users.reduce(function (prev, next) {
        if (usePageFilters && filterPageFilters(next, otherFilters)) {
          prev.push({
            ...next,
            searchData: searchDataMapper(next, searchKeys),
          });
        } else if (!usePageFilters) {
          prev.push({
            ...next,
            searchData: searchDataMapper(next, searchKeys),
          });
        }
        return prev;
      }, []);
    }
  );

  const fuzzySearch = createSelector(
    removeUsersDiacriticsAndFilter,
    (removedUsersDiacritics) => {
      return new FuzzySearch(removedUsersDiacritics, searchKeys, options);
    }
  );

  return fuzzySearch(users, otherFilters, searchKeys).search(
    removeDiacritics(search.trim())
  );
};

function filterPageFilters(user, otherFilters = {}) {
  for (const filterKey of Object.keys(otherFilters)) {
    const value = otherFilters[filterKey];

    switch (filterKey) {
      case "role":
        if (
          value &&
          value.length &&
          _intersection(
            value,
            user.roles.map((role) => role._id)
          ).length === 0
        ) {
          return false;
        }
        break;
      default:
        break;
    }
  }

  return true;
}
