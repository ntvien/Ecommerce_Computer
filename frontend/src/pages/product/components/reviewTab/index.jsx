import React, { useState, useEffect, useMemo } from "react";

import Rating from "../../../../components/Rating";
import RatingProgress from "./components/ratingProgress";

import ReviewInput from "./components/ReviewInput";
import "./index.css";
import ReviewPaginate from "./components/ReviewPaginate";

export default function ReviewTab({ product }) {
  const [renderTrigger, setRenderTrigger] = useState(false);
  const rating_progress = [1, 2, 3, 4, 5];
  const loadReviews = () => {
    setRenderTrigger((state) => !state);
  };
  return (
    <div class="row">
      {/* <!-- Rating --> */}
      <div class="col-lg-3">
        <div id="rating">
          <div class="rating-avg">
            <span>{product.avg_rating? Number.parseFloat(product.avg_rating).toPrecision(3):0}</span>
            <Rating avg_rating={product.avg_rating} class_name="rating-stars" />
          </div>
          <ul class="rating">
            {rating_progress.map((rating, index) => (
              <li key={index}>
                <RatingProgress avg_rating={index + 1} number_rating={rating} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div class="col-lg-5">
        <ReviewPaginate
          productId={product.product_id}
          renderTrigger={renderTrigger}
        />
      </div>

      <div class="col-lg-4 mt-3">
        <ReviewInput
          productId={product["product_id"]}
          loadReviews={loadReviews}
        />
      </div>
    </div>
  );
}
