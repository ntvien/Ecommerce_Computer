import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: {
        images: [],
        "brand_id": "1",
        "title_product": "Iphone x",
        "main_image_url": "",
        "price": "1000",
        "discount_percent": "15",
        "type_of_product": "smartphone",
        "cpu": "Intel",
        "ram": "5GB",
        "hard_disk": "SSD",
        "gpu": "1080",
        "screen": "FullHD",
        "operating_system": "Windows 10",
        "design_description": "Thiết kế mỏng nhẹ",
        "release_time": "2018",
        "dimension_weight": "1.5",
        "description_detail": "Thiết kế phù hợp với học sinh",
        "sim_description": "2 SIM (nano‑SIM và eSIM)",
        "pin_charge": "40wh",
        "front_camera": "8MP",
        "back_camera": "2MP",
        "avg_rating": "1",
        "number_review": "0",
    }
};
export const productDetailSlice = createSlice({
    name: "customer_productDetail",
    initialState,
    reducers: {
        setProductDetail: (state, action) => {
            state.product = action.payload;
        },
        resetProductDetail: (state) => {
            return { ...initialState };

        },
    }
})

export const { setProductDetail, resetProductDetail } = productDetailSlice.actions;
export default productDetailSlice.reducer;