import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import userApi from '../../../apis/userApi';
import columns from '../../../util/orders/columnOrders';
import ordersApi from '../../../apis/orders';


export default function Order() {
  const [ordersStates, setOrdersStates] = useState({ orders: [], page: 0, size: 1000 });
  const [listCellDelete, setListCellDelete] = useState([])

  useEffect(() => {
    fetchOrders();
  }, []);
  const fetchOrders = async () => {
    const { orders, page, size } = ordersStates;
    ordersApi.getOrder({ page: page, size: size }).then(res => {
      setOrdersStates({
        orders: res.map(orders => ({ ...orders, id: orders.order_id })),
        page: page,
        size: size
      })
    })
  }
  console.log(ordersStates)
  const onSelect = (ListCell) => {
    console.log(ListCell);
    setListCellDelete(old => [...ListCell])
  }
  const onDelete = async () => {
    try {
      await ordersApi.deleteOrders({ ids: listCellDelete });
      setOrdersStates(old => ({
        ...old,
        orders: [...old.orders.filter(orders => !listCellDelete.includes(orders.id))]
      }))
      setListCellDelete([]);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div style={{ height: 650, width: '100%' }}>
      <DataGrid
        rows={ordersStates.orders}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(a, b) => onSelect(a)}

      />
      <Stack marginTop={5} justifyContent="flex-end" direction="row" spacing={5}>
        <Button
          hidden={listCellDelete.length <= 0}
          variant="outlined"
          startIcon={<DeleteIcon
          />}
          onClick={onDelete}
        >
          Xoá
        </Button>
      </Stack>
    </div>
  );
}