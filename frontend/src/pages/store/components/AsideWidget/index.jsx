import React, { useMemo } from "react";
import typeProduct from "../../../../util/products/typeProduct";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import {
  addFilerFieldProduct,
  removeFilerFieldProduct,
} from "../../../../reducers/customers/FilterProductReducer";

export default function AsideWidgetFilter({ title, items, field }) {
  const currentFilter = useSelector((state) => state.filterProduct[field]);

  const filterChecked = useMemo(
    () =>
      items.map((item) => ({
        item: item,
        checked: currentFilter.findIndex((i) => i === item) != -1,
      })),
    [currentFilter,items]
  );
  const dispatch = useDispatch();
  const handelFilterProduct = (item) => {
    if (item.checked)
      dispatch(removeFilerFieldProduct({ nameField: field, value: item.item }));
    else dispatch(addFilerFieldProduct({ nameField: field, value: item.item }));
  };
  return (
    // Categories
    <div class="aside">
      <h3 class="aside-title">{title}</h3>
      <div class="checkbox-filter">
        {filterChecked.map((item) => (
          <div class="input-checkbox" onClick={() => handelFilterProduct(item)}>
            <input
              type="checkbox"
              value={item.item}
              checked={item.checked}
              onChange={(e) =>console.log(e.target.value)}
            ></input>
            <label for="category-1">
              <span></span>
              {item.item ? item.item.toUpperCase() : ""}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
