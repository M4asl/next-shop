import { combineReducers } from "redux";
import { userLoginReducer, userRegisterReducer } from "./authReducers";
import { cartReducer } from "./cartReducers";
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
  orderPayReducer,
  orderStatusReducer,
  setOrderPaidReducer,
} from "./orderReducers";
import {
  createReviewProductReducer,
  getProductsCategoryReducer,
  lastestProductsReducer,
  productCreateReducer,
  productUpdateReducer,
  productDetailsReducer,
  productListReducer,
  topRatedProductsReducer,
  productDeleteReducer,
} from "./productReducers";
import { getCurrentUserDetialsReducer } from "./userReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  getCurrentUserDetails: getCurrentUserDetialsReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  lastestProducts: lastestProductsReducer,
  topRatedProducts: topRatedProductsReducer,
  createProduct: productCreateReducer,
  updateProduct: productUpdateReducer,
  deleteProduct: productDeleteReducer,
  createProductReview: createReviewProductReducer,
  productsCategories: getProductsCategoryReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderStatus: orderStatusReducer,
  orderPay: orderPayReducer,
  setOrderPaid: setOrderPaidReducer,
  orderDelete: orderDeleteReducer,
});

export default reducer;
