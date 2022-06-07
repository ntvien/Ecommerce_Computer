import "./CollectionCard.css";
import { Link } from "react-router-dom";
import React from "react";
export default function CollectionCard({ name, imageUrl, urlShop }) {
  return (
    <div class="shop">
      <div class="shop-img">
        <img src={imageUrl} alt="image shop" />
      </div>
      <div class="shop-body">
        <h3>
          Bộ sưu tập
          <br />
          {name}
        </h3>
        <Link to="/store" class="cta-btn">
          Mua sắm ngay bây giờ <i class="fa fa-arrow-circle-right"></i>
        </Link>
      </div>
    </div>
  );
}
