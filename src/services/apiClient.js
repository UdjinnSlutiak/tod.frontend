import requestOptionsService from "./requestOptionsService";
import authenticationService from "./authenticationService";
import router from "../router";
import store from "../store";

export default {
  login,
  register,
  getMe,
  getTopic,
  getLatestTopics: getTopics,
  getFavorites,
  getDiscussed,
  getMyTopics,
  getRecommendedTopics,
  createTopic,
  deleteTopic,
  addToFavorites,
  getUserInterestTags,
  updateUserInterestTags,
  searchTopics,
  getTopicCommentaries,
  createCommentary,
  deleteCommentary,
  getUserTopicReaction,
  getUserCommentariesReaction,
  getUserCommentaryReaction,
  reactOnTopic,
  reactOnCommentary,
}

const apiHosts = {
  localhost: "http://localhost:5005",
}

const apiPrefixes = {
  api: "/api",
}

const apiUrls = {
  login: "/account/login",
  register: "/account/register",
  refreshToken: "/account/refresh-token",
  account: "/account",
  topics: "/topics",
  commentaries: "/commentaries",
  reactions: "/reactions",
  favorites: "/favorites",
  recommended: "/recommended",
  search: "/search",
  my: "/my",
  discussed: "/discussed",
  me: "/me",
  interests: "/interests",
}

function getUrl({
  host = apiHosts.localhost,
  prefix = apiPrefixes.api,
  suffix,
  searchParams
}) {
  let url = new URL(host + prefix + suffix);
  if (!searchParams) {
    return url;
  }

  Object.entries(searchParams).forEach(([key, value]) => 
  url.searchParams.append(key, value),
  );

  return url;
}

async function login(login, password) {
  let response = await fetchApi(
    getUrl({
      suffix: apiUrls.login
    }),
    requestOptionsService.post({ login, password })
  );

  return response;
}

async function register(registrationObject) {
  let response = await fetchApi(
    getUrl({
      suffix: apiUrls.register
    }),
    requestOptionsService.post(registrationObject)
  );

  return response;
}

async function getMe() {
  let response = await fetchApi(
    getUrl({
      suffix: apiUrls.account + apiUrls.me
    }),
    requestOptionsService.get()
  );

  return response;
}

async function refreshToken() {
  const oldAuthObject = store.getters.authObject;

  let response = await fetch(
    getUrl({
      suffix: apiUrls.refreshToken
    }),
    requestOptionsService.post({ 
      accessToken: oldAuthObject.accessToken, 
      refreshToken: oldAuthObject.refreshToken 
    })
  );

  return response;
}

async function getTopic(id) {
  let response = await fetchApi(
    getUrl({
      suffix: apiUrls.topics + "/" + id
    }),
    requestOptionsService.get()
  );

  return response;
}

async function getTopics(skip, offset) {
  let response = await fetchApi(
    getUrl({
      suffix: apiUrls.topics,
      searchParams: { skip, offset }
    }),
    requestOptionsService.get()
  );

  return response;
}

async function getFavorites() {
  let response = await fetchApi(
    getUrl({
      suffix: apiUrls.topics + apiUrls.favorites
    }),
    requestOptionsService.get()
  );

  return response;
}

async function getDiscussed() {
  let response = await fetchApi(
    getUrl({
      suffix: apiUrls.topics + apiUrls.discussed
    }),
    requestOptionsService.get()
  );

  return response;
}

async function getMyTopics() {
  let response = await fetchApi(
    getUrl({
      suffix: apiUrls.topics + apiUrls.my
    }),
    requestOptionsService.get()
  );

  return response;
}

async function getRecommendedTopics() {
  let response = await fetchApi(
    getUrl({
      suffix: apiUrls.topics + apiUrls.recommended
    }),
    requestOptionsService.get()
  );

  return response;
}

async function createTopic(topicObject) {
  let response = await fetchApi(
    getUrl({
      suffix: apiUrls.topics
    }),
    requestOptionsService.post(topicObject)
  );

  return response;
}

async function deleteTopic(id) {
  let response = await fetchApi(
    getUrl({
      suffix: apiUrls.topics + "/" + id
    }),
    requestOptionsService.delete()
  );

  return response;
}

async function addToFavorites(id) {
  let response = await fetchApi(
    getUrl({
      suffix: apiUrls.topics + "/" + id + apiUrls.favorites
    }),
    requestOptionsService.post()
  );

  return response;
}

async function getUserInterestTags() {
  let response = await fetchApi(
    getUrl({
      suffix: apiUrls.account + apiUrls.interests
    }),
    requestOptionsService.get()
  );

  return response;
}

async function updateUserInterestTags(tagsText) {
  let response = await fetchApi(
    getUrl({
      suffix: apiUrls.account + apiUrls.interests
    }),
    requestOptionsService.put(tagsText)
  );

  return response;
}

async function searchTopics(searchObject) {
  let response = await fetchApi(
    getUrl({
      suffix: apiUrls.topics + apiUrls.search
    }),
    requestOptionsService.post(searchObject)
  );

  return response;
}

async function getTopicCommentaries(topicId) {
  let response = await fetchApi(
    getUrl({
      suffix: apiUrls.topics + "/" + topicId + apiUrls.commentaries
    }),
    requestOptionsService.get()
  );

  return response;
}

async function createCommentary(topicId, commentaryObject) {
  let response = await fetchApi(
    getUrl({
      suffix: apiUrls.topics + "/" + topicId + apiUrls.commentaries
    }),
    requestOptionsService.post(commentaryObject)
  );

  return response;
}

async function deleteCommentary(id) {
  let response = await fetchApi(
    getUrl({
      suffix: apiUrls.commentaries + "/" + id
    }),
    requestOptionsService.delete()
  );

  return response;
}

async function getUserTopicReaction(id) {
  let response = await fetchApi(
    getUrl({
      suffix: apiUrls.reactions + apiUrls.topics + "/" + id
    }),
    requestOptionsService.get()
  );

  return response;
}

async function getUserCommentariesReaction(topicId) {
  let response = await fetchApi(
    getUrl({
      suffix: apiUrls.reactions + apiUrls.topics + "/" + topicId + apiUrls.commentaries
    }),
    requestOptionsService.get()
  );

  return response;
}

async function getUserCommentaryReaction(commentaryId) {
  let response = await fetchApi(
    getUrl({
      suffix: apiUrls.reactions + apiUrls.commentaries + "/" + commentaryId,
    }),
    requestOptionsService.get()
  );

  return response;
}

async function reactOnTopic(id, value) {
  let response = await fetchApi(
    getUrl({
      suffix: apiUrls.reactions + apiUrls.topics + "/" + id
    }),
    requestOptionsService.post({ value })
  );

  return response;
}

async function reactOnCommentary(id, value) {
  let response = await fetchApi(
    getUrl({
      suffix: apiUrls.reactions + apiUrls.commentaries + "/" + id
    }),
    requestOptionsService.post({ value })
  );

  return response;
}

async function fetchApi(path, options) {
  let response = await fetch(path, options);

  if (response.status == 401) {
    try {
      var refreshResponse = await refreshToken();

      if (refreshResponse.ok) {
        const authObject = await refreshResponse.json();
        await authenticationService.updateAuthObject(authObject);
        
        options.headers["Authorization"] = "Bearer " + authObject.accessToken;
        return await fetchApi(path, options);
      }
    } catch(error) {
      authenticationService.logout();
      router.push("/login");
    }

    authenticationService.logout();
    router.push("/login");
  }

  if (response.ok) {
    try {
      return await response.json();
    } catch (error) {
      console.log(error);
    }

    return "OK";
  }

  throw { status: response.status, statusText: response.statusText, text: JSON.parse(await response.text()) }
}
