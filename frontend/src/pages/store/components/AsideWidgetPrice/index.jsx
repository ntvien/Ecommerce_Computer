import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import {
  addFilerFieldProduct,
  removeFilerFieldProduct,
} from "../../../../reducers/customers/FilterProductReducer";
import Slider from "@mui/material/Slider";

export default function AsideWidgetPrice({ title, items, field }) {
  const { minPrice, maxPrice } = useSelector((state) => state.filterProduct);
  const dispatch = useDispatch();
  const setMinPrice = (value) => {
    if (value >= 0 && value <= 5000 && value < maxPrice)
      dispatch(addFilerFieldProduct({ nameField: "minPrice", value: value }));
  };
  const setMaxPrice = (value) => {
    if (value >= 0 && value <= 5000 && value > minPrice)
      dispatch(addFilerFieldProduct({ nameField: "maxPrice", value: value }));
  };
  return (
    <div class="aside">
      <h3 class="aside-title">Giá</h3>
      <div class="price-filter">
        <div id="price-slider">
          <Slider
            track="inverted"
            color="primary"
            aria-labelledby="track-inverted-range-slider"
            defaultValue={[100, 3000]}
            max={5000}
            value={[minPrice, maxPrice]}
            onChangeCommitted={(_, value) => {
              setMinPrice(value[0]);
              setMaxPrice(value[1]);
            }}
            min={0}
            step={100}
          />
        </div>
        <div class="input-number price-min">
          <input
            id="price-min"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <span class="qty-up" onClick={() => setMinPrice(minPrice + 100)}>
            +
          </span>
          <span class="qty-down" onClick={() => setMinPrice(minPrice - 100)}>
            -
          </span>
        </div>
        <span>-</span>
        <div class="input-number price-max">
          <input
            id="price-max"
            type="number"
            value={maxPrice}
            onClick={(e) => setMaxPrice(e.target.value)}
          />
          <span class="qty-up" onClick={() => setMaxPrice(maxPrice + 100)}>
            +
          </span>
          <span class="qty-down" onClick={() => setMaxPrice(maxPrice - 100)}>
            -
          </span>
        </div>
      </div>
    </div>
  );
}
