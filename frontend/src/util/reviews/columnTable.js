import moment from "moment";
const columns = [
    {
        field: 'review_id',
        headerName: 'ID bình luận',
        width: 110,
        editable: false,
    },
    {
        field: 'user_id',
        headerName: 'ID khách hàng',
        width: 120,
        editable: false,
    },
    {
        field: 'user_name',
        headerName: 'Tên đăng nhập',
        width: 130,
        editable: false,
    },
    {
        field: 'product_id',
        headerName: 'ID sản phẩm',
        width: 110,
        editable: false,
    },
    {
        field: 'title_product',
        headerName: 'Tên sản phẩm',
        width: 170,
        editable: false,
    },

    {
        field: 'created_time',
        headerName: 'Thời gian bình luận',
        width: 170,
        editable: false,
        renderCell: (params) => moment(parseInt(params.value)).format("lll"),
    },
    {
        field: 'number_star',
        headerName: 'Xếp hạng',
        width: 100,
        editable: false,
    },
    {
        field: 'content',
        headerName: 'Nội dung bình luận',
        width: 350,
        editable: false,
    },
];

export default columns;