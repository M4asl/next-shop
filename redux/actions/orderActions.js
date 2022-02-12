import axios from "axios";
import Cookies from "js-cookie";
import absoluteUrl from "next-absolute-url";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_STATUS_FAIL,
  ORDER_STATUS_SUCCESS,
  ORDER_STATUS_REQUEST,
  SET_ORDER_PAID_STATUS_REQUEST,
  SET_ORDER_PAID_STATUS_SUCCESS,
  SET_ORDER_PAID_STATUS_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch) => {
  try {
    console.log(order);
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/api/orders`, order, config);

    console.log(data);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    });
    Cookies.remove("cartItems");
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    });
  }
};

export const getOrderDetails = (req, authCookie, id) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);

    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        cookie: authCookie,
      },
    };

    const { data } = await axios.get(`${origin}/api/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    console.log(paymentResult);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/orders/pay/${id}`,
      paymentResult,
      config
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: message,
    });
  }
};

export const statusOrder = (status, id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_STATUS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/admin/orders/${id}`,
      { status },
      config
    );

    dispatch({
      type: ORDER_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_STATUS_FAIL,
      payload: message,
    });
  }
};

export const paymentOrderStatus = (paid, id) => async (dispatch) => {
  try {
    dispatch({
      type: SET_ORDER_PAID_STATUS_REQUEST,
    });

    console.log(paid, id);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/admin/orders/pay/${id}`,
      { paid },
      config
    );

    dispatch({
      type: SET_ORDER_PAID_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: SET_ORDER_PAID_STATUS_FAIL,
      payload: message,
    });
  }
};

export const listMyOrders = (req, authCookie) => async (dispatch, getState) => {
  try {
    const { origin } = absoluteUrl(req);
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        cookie: authCookie,
      },
    };

    const { data } = await axios.get(`${origin}/api/orders/my`, config);

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: message,
    });
  }
};

export const listOrders = (req, authCookie) => async (dispatch, getState) => {
  try {
    const { origin } = absoluteUrl(req);

    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        cookie: authCookie,
      },
    };

    const { data } = await axios.get(`${origin}/api/admin/orders`, config);

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: message,
    });
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DELETE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.delete(`/api/admin/orders/${id}`, config);

    dispatch({
      type: ORDER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};
