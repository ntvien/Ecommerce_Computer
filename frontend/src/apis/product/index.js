import API from "..";

const productsApi = {
    getProducts: ({ page, size, brand_name, type_of_product, min_price, max_price, sort_by, type_sort }) => {
        const url = '/products';
        console.log({ page, size, brand_name, type_of_product, min_price, max_price, sort_by })
        return API.get(url, { params: { page, size, brand_name, type_of_product, min_price, max_price, sort_by,type_sort } });
    },
    getProductById: (product_id) => {
        const url = '/products';
        return API.get(url, { params: { product_id } });
    },
    addProduct: (params) => {
        const url = '/products';
        return API.post(url, params);
    },
    updateProduct: (product) => {
        const url = '/products';
        return API.put(url, product);
    },
    deleteProduct: ({ ids }) => {
        const url = '/products';
        return API.delete(url, { data: { ids } });
    },
    addBrand: ({ brand_name, logo_url }) => {
        const url = '/products/brands';
        return API.post(url, { brand_name, logo_url }) ;
    },
    getBrands: () => {
        const url = '/products/brands';
        return API.get(url);
    },
    getProductName: () => {
        const url = '/products/names';
        return API.get(url);
    },
}
export default productsApi;