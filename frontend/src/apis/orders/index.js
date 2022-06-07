import API from "..";

const ordersApi = {
    getOrder: ({ page, size }) => {
        const url = '/orders';
        return API.get(url, { params: { page, size} });
    },

    // item:{product_id,number_item }
    addOrders: ({ user_id, first_name, last_name, time_order, address_order, phone_order, email_order, items, notes,type_payment}) => {
        const url = '/orders';
        return API.post(url, { user_id, first_name, last_name, time_order, address_order, phone_order, email_order, items, notes,type_payment});
    },
    deleteOrders: ({ ids }) => {
        const url = '/orders';
        return API.delete(url, { data: { ids } });
    },

    getCarts: (params) => {
        const url = '/carts';
        return API.get(url, { params });
    },
    addCart: ({ product_id, user_id, number_items }) => {
        const url = '/carts';
        return API.post(url, { product_id, user_id, number_items });
    },

    deleteCarts: ({ items }) => {
        const url = '/carts';
        return API.delete(url, { data: { items } });
    },

}
export default ordersApi;