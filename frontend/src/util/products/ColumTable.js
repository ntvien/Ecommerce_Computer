const columns = [
    {
        field: 'product_id',
        headerName: 'ID sản phẩm',
        width: 120,
        editable: false,
    },
    {
        field: 'title_product',
        headerName: 'Tên sản phẩm',
        width: 320,
        editable: false,
    },
    {
        field: 'brand_name',
        headerName: 'Tên thương hiệu',
        width: 200,
        editable: false,
    },

    {
        field: 'price',
        headerName: 'Giá tiền',
        width: 130,
        editable: false,
    },
    {
        field: 'discount_percent',
        headerName: 'Giảm giá(%)',
        width: 130,
        editable: false,
    },
    {
        field: 'release_time',
        headerName: 'Năm phát hành',
        width: 130,
        editable: false,
    },


];

export default columns;