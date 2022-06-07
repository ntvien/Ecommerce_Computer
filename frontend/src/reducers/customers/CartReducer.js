import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    numberItems: 0
};
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            if (action.payload) {
                const item = state.items.find(item => item.product_id === action.payload.product_id)
                if (item) {
                    state.numberItems += -item.number_items + Number(action.payload.number_items);
                    item.number_items = action.payload.number_items;
                } else {
                    state.items.push(action.payload);
                    state.numberItems += Number(action.payload.number_items);
                }

            }
        },
        removeToCart: (state, action) => {
            const items = state.items.filter(item => item.product_id != action.payload.product_id);
            state.numberItems -= Number(action.payload.number_items);
            state.items = items;
        },
        setCart: (state, action) => {
            state.numberItems = 0;
            state.items = []
            action.payload.map(item => {
                state.items.push(item);
                state.numberItems += Number(item.number_items);
            })
        },
        clearCart: (state) => {
            state.numberItems = 0;
            state.items = []
        }
    }
})

export const { addToCart, removeToCart, setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;