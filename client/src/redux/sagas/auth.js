import { takeLatest,take, call, put } from "redux-saga/effects";

import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../constants/auth";

import { setUser } from "../actions/user";

import { USER_UNSET } from "../constants/user";

import {
  loginApi,
  getLocalAuthToken,
  setAuthToken,
  removeAuthToken,
} from "../../services/auth.service";

const expirationTime = 60 * 60 * 1000;

function logout() {
  removeAuthToken();
}

function* loginFlow(credentials) {
  let payload;
  try {
    payload = yield call(loginApi, credentials.email, credentials.password);
     console.log(payload);
    const exp = new Date().valueOf() + expirationTime;

    yield put(setUser(payload.token, payload.userId, payload.role, exp,payload.username,payload.firstName,payload.lastName,payload.email,payload.phone,payload.address,payload.cart,payload.emailConfirmed,payload.orders));
    yield put({
      type: LOGIN_SUCCESS,
    });

    setAuthToken({
      userId: payload.userId,
      token: payload.token,
      role: payload.role,
      exp: exp,
    });

    // history.push("/projects");
  } catch (error) {
    console.log(error);
    yield put({
      type: LOGIN_FAILURE,
      message: {
        text: error.message,
        severity: "error",
      },
      errors: error.errors,
    });
  }
  return payload;
}

function* loginWatcher() {
  let token = yield call(getLocalAuthToken);
  while (true) {
    if (!token) {
      while (!token) {
        const { payload } = yield take(LOGIN_REQUESTING);
        console.log(payload);
        yield call(loginFlow, payload);
        token = yield call(getLocalAuthToken);
      }
    } else if (token.exp < Date.now().valueOf()) {
      removeAuthToken();
      yield put({
        type: LOGIN_FAILURE,
        message: {
          text: "Session expired. Please login again",
          severity: "error",
        },
      });
      const { payload } = yield take(LOGIN_REQUESTING);
      yield call(loginFlow, payload);
    } else {
      yield put(setUser(token.token, token.userId, token.role, token.exp));
      yield put({ type: LOGIN_SUCCESS });
    }
    yield take(USER_UNSET);
    token = null;
    yield call(logout);
  }
}

export default loginWatcher;