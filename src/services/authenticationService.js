import store from "../store";
import apiClient from "./apiClient";

export default {
  login,
  register,
  logout,
  updateAuthObject,
}

const authObject = "authObject";

async function login(login, password) {
  let response = await apiClient.login(login, password);
  await updateAuthObject(response);
}

async function register(registrationObj) {
  let response = await apiClient.register(registrationObj);
  
  if (typeof response == 'object') {
    updateAuthObject(response);
  }
}

async function logout() {
  await store.dispatch(authObject, null);
}

async function updateAuthObject(newAuthObject) {
  await store.dispatch(authObject, newAuthObject);
}