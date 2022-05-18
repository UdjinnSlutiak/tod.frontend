import store from "../../store/index.js";

export default (to, from, next) => {
  const { authorize } = to.meta;
  const authObject = store.getters.authObject;

  if (authObject) {
    if (authorize && authorize.length && !authorize.includes(authObject.user.role)) {
      next({ path: from.path });
    }
    next();
  } else if (authorize && authorize.length) {
    next({ path: "/login", query: { returnUrl: from.path } });
  }
  next();
}