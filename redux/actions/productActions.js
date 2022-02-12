import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
  GET_PRODUCTS_CATEGORY_FAIL,
  GET_PRODUCTS_CATEGORY_REQUEST,
  GET_PRODUCTS_CATEGORY_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_LASTEST_FAIL,
  PRODUCT_LIST_LASTEST_REQUEST,
  PRODUCT_LIST_LASTEST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_TOP_RATED_FAIL,
  PRODUCT_LIST_TOP_RATED_REQUEST,
  PRODUCT_LIST_TOP_RATED_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from "../constants/productConstants";

const getAllProducts =
  (req, page = 1, name = "", category, sort, minVal, maxVal) =>
  async (dispatch) => {
    try {
      const { origin } = absoluteUrl(req);

      dispatch({
        type: PRODUCT_LIST_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const rangeStr = `&minPriceVal=${Number(minVal)}&maxPriceVal=${Number(
        maxVal
      )}`;

      let link = `${origin}/api/products?page=${page}&search=${name}`;

      if (category) link = link.concat(`&category=${category}`);

      if (sort) link = link.concat(`&sort=${sort}`);

      if (minVal && maxVal) link = link.concat(`${rangeStr}`);

      // console.log(link);

      const { data } = await axios.get(link, config);

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: error.response.data.message,
      });
    }
  };

const getProductDetails = (req, id) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);

    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`${origin}/api/products/${id}`, config);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error,
    });
  }
};

const getLastestProducts = (req) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);

    dispatch({
      type: PRODUCT_LIST_LASTEST_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`${origin}/api/products/lastest`, config);

    dispatch({
      type: PRODUCT_LIST_LASTEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_LASTEST_FAIL,
      payload: error,
    });
  }
};

const getTopRatedProducts = (req) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);

    dispatch({
      type: PRODUCT_LIST_TOP_RATED_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`${origin}/api/products/top`, config);

    dispatch({
      type: PRODUCT_LIST_TOP_RATED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_TOP_RATED_FAIL,
      payload: error,
    });
  }
};

const createReviewProduct = (id, rating, comment) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_RESET,
    });

    console.log(id, rating, comment);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/reviews/${id}`,
      { rating, comment },
      config
    );

    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
      payload: data,
    });

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

const createProduct = (values) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/api/admin/products`, values, config);

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

const updateProduct = (values, id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/admin/products/${id}`,
      values,
      config
    );

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.delete(`/api/admin/products/${id}`, config);
    console.log(data);
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};

const getProductsCategory = (req) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);

    dispatch({
      type: GET_PRODUCTS_CATEGORY_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${origin}/api/products/categories`,
      config
    );

    dispatch({
      type: GET_PRODUCTS_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export {
  getAllProducts,
  getProductDetails,
  getLastestProducts,
  getTopRatedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createReviewProduct,
  getProductsCategory,
};
