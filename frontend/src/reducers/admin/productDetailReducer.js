import { createSlice } from "@reduxjs/toolkit";
import typeProduct from "../../util/products/typeProduct";

const initialState = {
    product: {
        images: [],
        "brand_id": "1",
        "title_product": "",
        "main_image_url": "",
        "price": "",
        "discount_percent": "",
        "type_of_product": "smartphone",
        "cpu": "",
        "ram": "",
        "hard_disk": "",
        "gpu": "",
        "screen": "",
        "operating_system": "",
        "design_description": "",
        "release_time": "",
        "dimension_weight": "",
        "description_detail": "",
        "sim_description": "",
        "pin_charge": "",
        "front_camera": "",
        "back_camera": "",
        "avg_rating": "",
        "number_review": "",

    }
};
export const productDetailSlice = createSlice({
    name: "admin_productDetail",
    initialState,
    reducers: {
        setProductDetail: (state, action) => {
            state.product = { ...state.product, ...action.payload };
        },
        addImages: (state, action) => {
            state.product.images.push(action.payload);
        },
        addListImages: (state, action) => {
            state.product.images = [... state.product.images, ...(action.payload.url_images)];
        },
        resetProductDetail: (state) => {
            return { ...initialState };

        },
    }
})

export const { setProductDetail, addImages,addListImages, resetProductDetail } = productDetailSlice.actions;
export default productDetailSlice.reducer;