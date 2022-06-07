import "./index.css";
import React, { useState, useMemo, useEffect } from "react";
import ProductWidgetCard from "../Card/ProductWidgetCard";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ordersApi from "../../apis/orders";
import { setCart } from "../../reducers/customers/CartReducer";
export default function Cart() {
  const { items, numberItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const onClick = () => {
    setOpen((old) => !old);
  };

  const totalPrice = useMemo(() => {
    return items.reduce(
      (a, b) =>
        a + (1 - b.discount_percent / 100) * Number(b.price) * b.number_items,
      0
    );
  }, [items, numberItems]);

  useEffect(() => {
    ordersApi
      .getCarts()
      .then((res) => {
        dispatch(setCart(res));
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <div
      class={open ? "dropdown open" : "dropdown"}
      onMouseLeave={() => setOpen(false)}
    >
      <a
        class="dropdown-toggle"
        data-toggle="dropdown"
        aria-expanded={open}
        onClick={onClick}
      >
        <i class="fa fa-shopping-cart"></i>
        <span>Giỏ hàng</span>
        <div class="qty">{numberItems}</div>
      </a>
      <div class="cart-dropdown">
        <div class="cart-list">
          {items.map((item) => (
            <ProductWidgetCard
              key={item.product_id}
              item={item}
              isItemCart={true}
            />
          ))}
        </div>
        <div class="cart-summary">
          <small>{`${numberItems} món được thêm vào`} </small>
          <h5>{`Tổng tiền: ${Number(totalPrice).toFixed(2)}`}</h5>
        </div>
        <div class={`cart-btns  ${numberItems == 0 ? "disabled" : ""}`}>
          <Link to="/checkout">
            Thanh Toán <i class="fa fa-arrow-circle-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
