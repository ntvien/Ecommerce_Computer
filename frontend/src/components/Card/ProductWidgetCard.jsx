import "./ProductWidgetCard.css";
import { Link } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { removeToCart } from "../../reducers/customers/CartReducer";
import ordersApi from "../../apis/orders";
export default function ProductWidgetCard({ item, isItemCart }) {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    ordersApi
      .deleteCarts({
        items: [{ user_id: item.user_id, product_id: item.product_id }],
      })
      .catch((e) => console.log(e));
    dispatch(removeToCart(item));
  };
  const handleProductDetail = () => {};
  return (
    <div class="product-widget">
      <div class="product-img">
        <img src={item.main_image_url} alt="image product" />
      </div>
      <div class="product-body">
        <h3 class="product-name">
          <Link onClick={handleProductDetail} to={"/products/"+item.product_id }>
            {item.title_product}
          </Link>
        </h3>
        <h4 class="product-price">
          {isItemCart && <span class="qty">{`${item.number_items}x`}</span>}

          {`$${Math.floor((1 - item.discount_percent / 100) * item.price)}`}
          <del class="product-old-price"> {`$${item.price}`}</del>
        </h4>
      </div>
      {isItemCart && (
        <button class="delete" onClick={handleRemoveItem}>
          <i class="fa fa-close"></i>
        </button>
      )}
    </div>
  );
}
