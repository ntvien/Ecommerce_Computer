import { configureStore } from "@reduxjs/toolkit";
import productDetailAdminReducer from "../reducers/admin/productDetailReducer";
import AuthReducer from "../reducers/AuthReducer";
import CartReducer from "../reducers/customers/CartReducer";
import FilterProducerReducer from "../reducers/customers/FilterProductReducer";
import productDetailCustomerReducer from "../reducers/customers/productDetailReducer";
import triggerElement from "../reducers/customers/triggerElement";
import UserInfoReducer from "../reducers/customers/UserInfo";
import FilterTypeProduceReducer from "../reducers/home/FilterTypeProductReducer";
export const store = configureStore({
  reducer: {
    admin_productDetail: productDetailAdminReducer,
    triggerElement: triggerElement,
    cart: CartReducer,
    userInfo: UserInfoReducer,
    customer_productDetail: productDetailCustomerReducer,
    filterProduct: FilterProducerReducer,
    filterTypeProduct: FilterTypeProduceReducer,
    auth: AuthReducer,
  },
});
