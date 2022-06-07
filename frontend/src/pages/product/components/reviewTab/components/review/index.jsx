import React from "react";
import Rating from "../../../../../../components/Rating";
import moment from "moment";
import "./index.css";
export default function Review({ review }) {
  return (
    <div>
      <div class="review-heading">
        <h5 class="name">{review.user_name}</h5>
        <p class="date">
          {moment(parseInt(review.created_time) * 1000).format("lll")}
        </p>
        <Rating
          avg_rating={review ? review.number_stars : 5}
          class_name="review-rating"
        />
      </div>
      <div class="review-body">
        <p>{review.content}</p>
      </div>
    </div>
  );
}
