import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    type_of_product: "",
};
export const FilterTypeProducerSlice = createSlice({
    name: "filterProduct",
    initialState,
    reducers: {
        setFilerTypeProduct: (state, action) => {
            return { ...state, ...action.payload }
        },
        removeFilerTypeProduct: (state, action) => {
            state[action.payload] = null;
        }
    }
})

export const { setFilerTypeProduct, removeFilerTypeProduct } = FilterTypeProducerSlice.actions;
export default FilterTypeProducerSlice.reducer;