import store from "../store";

export default {
  get() {
    return {
      method: "GET",
      ...headers(),
    }
  },
  post(body) {
    return {
      method: "POST",
      body: JSON.stringify(body),
      ...headers(),
    }
  },
  put(body) {
    return {
      method: "PUT",
      body: JSON.stringify(body),
      ...headers(),
    }
  },
  delete() {
    return {
      method: "DELETE",
      ...headers(),
    }
  }
}

function headers() {
  return {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...getAuthHeader(),
    },
  };
}

function getAuthHeader() {
  let authObject = store.getters.authObject;

  if (authObject) {
    return authObject.accessToken
    ? { Authorization: "Bearer " + authObject.accessToken }
    : {}
  } else {
    return {}
  }
}