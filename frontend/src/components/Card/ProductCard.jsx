import "./ProductCard.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../reducers/customers/CartReducer";
import { setProductDetail } from "../../reducers/customers/productDetailReducer";
import ordersApi from "../../apis/orders";
import Alert from "../Alert/Alert";
import Rating from "../Rating";
export default function ProductCard({ product }) {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertConf, setAlertConf] = useState({});
  const dispatch = useDispatch();
  const { isAuth, profile } = useSelector((state) => state.auth);
  const handleAddToCart = () => {
    if (!isAuth) {
      setAlertConf({
        type: "error",
        title: "Bạn chưa đăng nhập",
      });
      setOpenAlert(true);
    }else {
      const item = {
        user_id: profile.user_id,
        product_id: product.product_id,
        number_items: 1,
        title_product: product.title_product,
        main_image_url: product.main_image_url,
        price: product.price,
        discount_percent: product.discount_percent,
      };
      dispatch(addToCart(item));
      ordersApi
        .addCart(item)
        .then(() => {
          setAlertConf({
            type: "success",
            title: "Thêm vào giỏ thành công!",
          });
          setOpenAlert(true);
        })
        .catch((e) => console.log(e));
    }
  };
  return (
    <div class="product">
      <div class="product-img">
        <img src={product.main_image_url} alt="product image" />
        <div class="product-label">
          <span class="sale">{`-${product.discount_percent}%`}</span>
          <span class="new">Mới</span>
        </div>
      </div>
      <div class="product-body">
        <p class="product-category">{product.type_of_product}</p>
        <h3 class="product-name">
          <Link
            to={"/products/" + product["product_id"]}
          >
            {product.title_product}
          </Link>
        </h3>
        <h4 class="product-price">
          {`$${Math.floor(
            (1 - product.discount_percent / 100) * product.price
          )}`}
          <del class="product-old-price"> {`$${product.price}`}</del>
        </h4>

        <Rating avg_rating={product.avg_rating} class_name="product-rating" />
      </div>
      <div class="add-to-cart">
        <button class="add-to-cart-btn" onClick={handleAddToCart}>
          <i class="fa fa-shopping-cart"></i> Thêm vào giỏ
        </button>
      </div>
      <Alert {...alertConf} open={openAlert} setOpenAlert={setOpenAlert} />
    </div>
  );
}
