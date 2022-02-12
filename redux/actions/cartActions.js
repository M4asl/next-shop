import axios from "axios";
import Cookies from "js-cookie";
import {
  GET_CART_ITEMS,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PERSONAL_DETAILS,
} from "../constants/cartConstants";

export const getCartItems = () => async (dispatch) => {
  const cartItems = Cookies.get("cartItems")
    ? JSON.parse(Cookies.get("cartItems"))
    : [];
  dispatch({
    type: GET_CART_ITEMS,
    payload: cartItems,
  });
};

export const addToCart = (id, qty) => async (dispatch, getState) => {
  console.log(id);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { data } = await axios.get(`/api/products/${id}`, config);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      images: data.images[0].url,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  Cookies.set("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  Cookies.set("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const savePersonalDetails =
  (firstName, lastName) => (dispatch, getState) => {
    const personalDetails = {
      firstName,
      lastName,
    };
    dispatch({
      type: CART_SAVE_PERSONAL_DETAILS,
      payload: personalDetails,
    });

    Cookies.set(
      "personalDetails",
      JSON.stringify(getState().cart.personalDetails)
    );
  };

export const saveShippingAddress =
  (address, city, postalCode, country) => (dispatch, getState) => {
    const shippingAddress = {
      address,
      city,
      postalCode,
      country,
    };
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: shippingAddress,
    });

    Cookies.set(
      "shippingAddress",
      JSON.stringify(getState().cart.shippingAddress)
    );
  };
