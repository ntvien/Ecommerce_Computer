import API from "..";

const communityApi = {
    getReviews: ({ page, size, product_id }) => {
        const url = "/reviews";
        return API.get(url, { params: { page, size, product_id } });
    },
    addReview: ({ product_id, content, number_star }) => {
        const url = '/reviews';
        return API.post(url, { product_id, content, number_star });
    },
    deleteReviews: ({ ids }) => {
        const url = '/reviews';
        return API.delete(url, { data: { ids } });
    },

    //admin
    getReviewsInAdmin: ({ page, size }) => {
        const url = "/reviews";
        return API.get(url, { params: { page, size } });
    },
}
export default communityApi;