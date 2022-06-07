import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../../reducers/customers/CartReducer";
import Alert from "../../../../components/Alert/Alert";
import "./index.css";
import Rating from "../../../../components/Rating";

export default function ProductDetail({ product }) {
  const { isAuth, profile } = useSelector((state) => state.auth);
  const [openAlert, setOpenAlert] = useState(false);
  const [number_items, setNumberItem] = useState(1);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    if (isAuth) {
      const item = {
        user_id: profile.user_id,
        product_id: product.product_id,
        number_items: number_items,
        title_product: product.title_product,
        price: product.price,
        discount_percent: product.discount_percent,
        main_image_url: product.main_image_url,
      };
      dispatch(addToCart(item));
      setOpenAlert(true);
    }
  };
  return (
    <div class="product-details">
      <h2 class="product-name">{product.title_product.toUpperCase()}</h2>
      <div>
        <Rating avg_rating={product.avg_rating} class_name="product-rating" />
        <a class="review-link" href="#review">
          {`${product.number_review}  Bình luận | Thêm bình luận`}
        </a>
      </div>
      <div>
        <h3 class="product-price">
          {`$${Math.floor(
            (1 - product.discount_percent / 100) * product.price
          )}`}
          <del class="product-old-price"> {`$${product.price}`}</del>
        </h3>
        <span class="product-available">Sản phẩm còn hàng</span>
      </div>
      <div class="product-options">
        <div class="qty-label">
          Số lượng
          <div class="input-number">
            <input
              type="number"
              value={number_items}
              onChange={(e) => setNumberItem(e.target.value)}
            />
            <span
              class="qty-up"
              onClick={() => setNumberItem(number_items + 1)}
            >
              +
            </span>
            <span
              class="qty-down"
              onClick={() => setNumberItem(number_items - 1)}
            >
              -
            </span>
          </div>
        </div>
      </div>

      <div class="add-to-cart">
        <button class="add-to-cart-btn" onClick={handleAddToCart}>
          <i class="fa fa-shopping-cart"></i> Thêm vào giỏ
        </button>
      </div>

      <ul class="product-links">
        <li>Danh mục:</li>
        <li>
          <Link to="/store"> {product.type_of_product.toUpperCase()}</Link>
        </li>
      </ul>

      <ul class="product-links">
        <li>Chia sẻ:</li>
        <li>
          <a href="#">
            <i class="fa fa-facebook"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-google-plus"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-envelope"></i>
          </a>
        </li>
      </ul>
      <Alert
        title="Thêm vào giỏ thành công!"
        type="success"
        open={openAlert}
        setOpenAlert={setOpenAlert}
      />
    </div>
  );
}
