import React from "react";
import typeProduct from "../../../../util/products/typeProduct";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import { setFilerTypeProduct } from "../../../../reducers/home/FilterTypeProductReducer";

export default function SectionTitle({ title }) {
  const type_of_product = useSelector(
    (state) => state.filterTypeProduct.type_of_product
  );
  const dispatch = useDispatch();
  const handelFilterProduct = (e) => {
    dispatch(
      setFilerTypeProduct({ type_of_product: e.target.dataset.toggle })
    );
    console.log(e.target.dataset.toggle);
  };
  return (
   
      <div class="section-title">
        <h3 class="title">{title.toUpperCase()}</h3>
        <div class="section-nav">
          <ul class="section-tab-nav tab-nav">
            {typeProduct.map((type) => (
              <li key={type} class={type === type_of_product ? "active" : ""}>
                <a data-toggle={type} onClick={handelFilterProduct}>
                  {type.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
  );
}
