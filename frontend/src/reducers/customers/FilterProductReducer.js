import { createSlice } from "@reduxjs/toolkit";
import typeProduct from "../../util/products/typeProduct";

const initialState = {
    type_of_products: [...typeProduct],
    minPrice: 50,
    maxPrice: 5000,
    brand_names: [],
};
export const FilterProducerSlice = createSlice({
    name: "filterProduct",
    initialState,
    reducers: {
        addFilerFieldProduct: (state, action) => {
            if (action.payload.nameField === "minPrice" || action.payload.nameField === "maxPrice")
                state[action.payload.nameField] = action.payload.value;
            else {
                state[action.payload.nameField].push(action.payload.value)
            }
        },
        removeFilerFieldProduct: (state, action) => {
            if (action.payload.nameField === "minPrice")
                state.maxPrice = Infinity
            else if (action.payload.nameField === "maxPrice")
                state.maxPrice = 0
            else {
                state[action.payload.nameField] = state[action.payload.nameField].filter(name => name !== action.payload.value)
            }
        }
    }
})

export const { addFilerFieldProduct, removeFilerFieldProduct } = FilterProducerSlice.actions;
export default FilterProducerSlice.reducer;