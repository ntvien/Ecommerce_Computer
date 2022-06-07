import moment from "moment";
const columns = [
    {
        field: 'order_id',
        headerName: 'ID đơn hàng',
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
        field: 'first_name',
        headerName: 'Tên',
        width: 80,
        editable: false,
    },
    {
        field: 'last_name',
        headerName: 'Họ tên lót',
        width: 140,
        editable: false,
    },

    {
        field: 'time_order',
        headerName: 'Thời gian đặt hàng',
        width: 170,
        editable: false,
        renderCell: (params) => moment(parseInt(params.value)).format("lll"),
    },
    {
        field: 'address_order',
        headerName: 'Địa chỉ',
        width: 200,
        editable: false,
    },
    {
        field: 'phone_order',
        headerName: 'Số điện thoại',
        width: 150,
        editable: false,
    },
    {
        field: 'email_order',
        headerName: 'Email',
        width: 150,
        editable: false,
    },
    {
        field: 'total_price',
        headerName: 'Tổng tiền',
        width: 120,
        editable: false,
    },
    {
        field: 'type_payment',
        headerName: 'Hình thức thanh toán',
        width: 190,
        editable: false,
    },
    {
        field: 'notes',
        headerName: 'Ghi chú',
        width: 200,
        editable: false,
    },


];

export default columns;