const columns = [
    {
        field: 'user_id',
        headerName: 'ID',
        width: 70
    },
    {
        field: 'user_name',
        headerName: 'Tên đăng nhập',
        width: 140,
        editable: false,
    },
    
    {
        field: 'first_name',
        headerName: 'Tên',
        width: 100,
        editable: true,
    },

    {
        field: 'last_name',
        headerName: 'Họ tên lót',
        width: 130,
        editable: true,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 140,
        editable: true,
    },
    {
        field: 'address',
        headerName: 'Địa chỉ',
        width: 195,
        editable: true,
    },
    {
        field: 'phone_number',
        headerName: 'Số điện thoại',
        width: 140,
        editable: true,
    },
    {
        field: 'role_name',
        headerName: 'Vai trò',
        width: 150,
        editable: true, // renderCell will render the component
    },

];
export default columns;