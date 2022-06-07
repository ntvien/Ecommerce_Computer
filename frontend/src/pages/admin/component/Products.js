import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { useRouteMatch, useHistory } from "react-router-dom";
import columns from '../../../util/products/ColumTable';
import productApi from "../../../apis/product/index"
import { setProductDetail, resetProductDetail } from '../../../reducers/admin/productDetailReducer';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import firebaseStorageApi from '../../../apis/firebase';
import Alert from '../../../components/Alert/Alert';
export default function Products() {
    const [dataProducts, setDataProducts] = useState({ products: [], page: 0, size: 1000 });
    const [listCellProductsDelete, setListCellProductsDelete] = useState([])
    const [newBrand, setNewBrand] = useState({ brand_name: "", logo_url: "" })
    const [openAlert, setOpenAlert] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const history = useHistory();
    const { url } = useRouteMatch();
    const dispatch = useDispatch();
    useEffect(() => {
        const product = fetchProduct();
        Promise.all([product]);
    }, []);
    const fetchProduct = async () => {
        try {
            const { page, size, products } = dataProducts;
            const res = await productApi.getProducts({ page: page, size: size });
            const newProducts = res.map(product => ({ ...product, id: product.product_id }))
            setDataProducts({
                products: [...products, ...newProducts],
                page: page + 1,
                size: size
            })
        } catch (e) {
            console.log(e);
        }
    }

    const onSelectProducts = (listCell) => {
        setListCellProductsDelete(listCell)
    }
    const onDeleteProducts = async () => {
        try {
            await productApi.deleteProduct({ ids: listCellProductsDelete })

            setDataProducts(old => ({
                ...old,
                products: [...old.products.filter(product => !listCellProductsDelete.includes(product.id))]
            }))
            setListCellProductsDelete([]);
        } catch (e) {
            console.log(e);
        }
    }
    const handleProductDetail = (product) => {
        dispatch(setProductDetail(product))
        history.push(`${url}/product-detail`);
    }
    const onAddProduct = () => {
        dispatch(resetProductDetail());
        history.push(`${url}/product-detail`);
    }
    const onCreateBrand = () => {
        productApi.addBrand(newBrand).then(() => setOpenAlert(true))
            .catch(e => console.log(e));
        setShow(false);
    }
    const handleUploadLogo = (e) => {
        const image = e.target.files[0];
        firebaseStorageApi.uploadImage(image, newBrand.brand_name != "" ? newBrand.brand_name : "unknown", (url) => setNewBrand({ ...newBrand, logo_url: url }))
    }
    const handleChangePage = (page) => {
        if ((Number(page) + 2) * 5 >= dataProducts.page * dataProducts.size) {
            fetchProduct();
        }
    }

    console.log(dataProducts.products)
    return (
        <div style={{ height: 650, width: '100%' }}>
            <DataGrid
                rows={dataProducts.products}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                checkboxSelection
                onSelectionModelChange={(a, b) => onSelectProducts(a)}
                onRowDoubleClick={(event, detail) => handleProductDetail(event.row)}
                style={{ marginBottom: 50 }}
                onPageChange={handleChangePage}

            />
            <Stack margin={5} justifyContent="flex-end" direction="row" spacing={5}>
                <Button
                    hidden={listCellProductsDelete.length <= 0}
                    variant="outlined"
                    startIcon={<DeleteIcon
                    />}
                    onClick={onDeleteProducts}
                >
                    Xoá
                </Button>
                <Button variant="contained"
                    onClick={handleShow}
                >
                    Thêm thương hiệu
                </Button>
                <Button variant="contained"
                    onClick={onAddProduct}
                >
                    Thêm sản phẩm
                </Button>
            </Stack>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm thương hiệu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Typography variant="h6" gutterBottom>
                        Thông tin thương hiệu
                    </Typography>

                    <Grid item xs={12}>
                        <TextField
                            required
                            id="brandName"
                            name="brandName"
                            label="Tên thương hiệu"
                            value={newBrand.brand_name}
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            onChange={(event) => setNewBrand({ ...newBrand, brand_name: event.target.value })}
                        />
                    </Grid>

                    <br></br>
                    <Grid item xs={12}>
                        <TextField
                            id="logo"
                            helperText="Logo thương hiệu"
                            type="file"
                            onChange={handleUploadLogo}
                        />
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="contained" onClick={onCreateBrand} >
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
            <Alert title="save successful!" type="success" open={openAlert} setOpenAlert={setOpenAlert} />

        </div>

    );
}