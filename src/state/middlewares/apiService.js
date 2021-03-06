import { fetch } from "../utils";

const baseUrl = "https://swapi.dev/api";

const apiService = () => (next) => (action) => {
  const multiUrls = action.meta?.urls && action.meta.urls.length > 0;
  const result = next(action);
  if (!action.meta || !action.meta.async) {
    return result;
  }

  const { path, method = "GET", body } = action.meta;

  if (!path && !multiUrls) {
    throw new Error(`'path' not specified for async action ${action.type}`);
  }

  const url = `${baseUrl}${path}`;

  if (!multiUrls) {
    // Call to API
    return fetch(url, method, body).then(
      (res) => handleResponse(res, action, next),
      (err) => handleErrors(err, action, next)
    );
  } else {
    // Fetch multiples urls at once
    return multipleCall(action.meta.urls).then(
      (res) => handleResponse(res, action, next),
      (err) => handleErrors(err, action, next)
    );
  }
};

export default apiService;

async function multipleCall(urls) {
  // Call all APIs at once
  const allPromises = await Promise.all(
    urls.map((url) => {
      url = url.replace("http", "https");
      return fetch(url);
    })
  );
  return allPromises;
}

function handleErrors(err, action, next) {
  // if request fails, dispatch _FAILED action to handle the error in reducer
  next({
    type: `${action.type}_FAILED`,
    payload: err,
    meta: action.meta,
  });

  return Promise.reject(err);
}

function handleResponse(res, action, next) {
  // if request success, dispatch _COMPLETE action to update the state in reducer
  next({
    type: `${action.type}_COMPLETED`,
    payload: res,
    meta: action.meta,
  });

  return res;
}
