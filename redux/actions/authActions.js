import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/authConstants";

const register = (email, password, passwordConfirm) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/auth/register",
      { email, password, passwordConfirm },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    Cookies.set("token", data.token, {
      expires: 1,
      path: "/",
    });
    window.location.href = "/";
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data.error.errors,
    });
  }
};

const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/auth/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    Cookies.set("token", data.token, {
      expires: 1,
      path: "/",
    });

    window.location.href = "/";
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

const logout = () => async (dispatch) => {
  try {
    Cookies.remove("token");
    Cookies.remove("role");
    await axios.get("/api/auth/logout");
    dispatch({ type: USER_LOGOUT });
    Router.push("/");
  } catch (err) {
    console.log(err);
  }
};

const authCookie = (authCookie) => (dispatch) => {
  dispatch({ type: AUTHENTICATE, payload: authCookie });
};

export { register, login, logout, authCookie };
