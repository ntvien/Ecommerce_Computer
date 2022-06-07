import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Rating from "../../../../../../components/Rating";
import './index.css'
export default function RatingProgress({ avg_rating, number_rating }) {
  const percent = `${(avg_rating / 5) * 100}%`;
  return (
    <div>
      <Rating avg_rating={avg_rating} class_name="rating-stars" />
      <div class="rating-progress">
        <div style={{ width: percent }}></div>
      </div>
      <span class="sum">{number_rating}</span>
    </div>
  );
}
