import { CLEAR_ERRORS } from "../constants/globalConstants";
import {
  GET_PRODUCTS_CATEGORY_FAIL,
  GET_PRODUCTS_CATEGORY_REQUEST,
  GET_PRODUCTS_CATEGORY_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
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

export const productListReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, productList: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, productDetails: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const lastestProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_LIST_LASTEST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_LASTEST_SUCCESS:
      return { loading: false, lastestProducts: action.payload };
    case PRODUCT_LIST_LASTEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const topRatedProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_LIST_TOP_RATED_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_TOP_RATED_SUCCESS:
      return { loading: false, topRatedProducts: action.payload };
    case PRODUCT_LIST_TOP_RATED_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true, isDeleted: action.payload };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createReviewProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, productDetails: action.payload };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const getProductsCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCTS_CATEGORY_REQUEST:
      return { loading: true };
    case GET_PRODUCTS_CATEGORY_SUCCESS:
      return { loading: false, categories: action.payload };
    case GET_PRODUCTS_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
