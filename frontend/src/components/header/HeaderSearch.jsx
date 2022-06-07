import "./index.css";
import React, { useState, useEffect } from "react";
import typeProduct from "../../util/products/typeProduct";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import productsApi from "../../apis/product";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createFilterOptions } from "@mui/material/Autocomplete";
export default function HeaderSearch() {
  const [productNameOptions, setProductNameOptions] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    fetchProductName();
  }, []);

  const fetchProductName = () => {
    productsApi
      .getProductName()
      .then((productNameOptions) => setProductNameOptions(productNameOptions))
      .catch((e) => console.log(e));
  };
  const handleSearch = (_, value) => {
    if (value != null && value.product_id != undefined) {
      history.push("/products/" + value.product_id);
    }
  };
  return (
    <div class="header-search">
      <form class="container-fluid row no-gutters">
        <div class="input">
          <Autocomplete
            className="input"
            id="input-inner"
            options={productNameOptions}
            onChange={handleSearch}
            getOptionLabel={(option) => option.title_product}
            filterOptions={createFilterOptions({
              stringify: (option) => option.title_product,
            })}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Nhập từ khoá tìm kiếm..."
                id=""
                onKeyDown={(e) => {
                  if (e.code === "Enter" && e.target.value) {
                    e.preventDefault();
                  }
                }}
              />
            )}
          />
        </div>
      </form>
    </div>
  );
}
