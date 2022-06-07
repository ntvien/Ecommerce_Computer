import React, { useEffect, useState, Fragment } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import productApi from "../../../apis/product/index"
import { setProductDetail, addListImages, resetProductDetail } from '../../../reducers/admin/productDetailReducer';
import { useSelector, useDispatch } from 'react-redux';
import typeProduct from '../../../util/products/typeProduct';
import { storage } from "../../../firebase/index";
import { createFilterOptions } from '@mui/material/Autocomplete';
import Alert from '../../../components/Alert/Alert';
import firebaseStorageApi from '../../../apis/firebase';
import fileApi from '../../../apis/fileApi';

export default function ProductsDetail() {

    const productDetail = useSelector((state) => state.admin_productDetail.product);
    const [brand, setBrand] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const dispatch = useDispatch();
    console.log(productDetail);
    useEffect(async () => {
        await fetchBranch();
    }, []);
    const fetchBranch = async () => {
        try {
            const res = await productApi.getBrands({ type_products: "laptop" });
            console.log(res);
            setBrand(res);
        } catch (e) {
            console.log(e)
        }
    }
    const handleUploadMainImage = (e) => {
        const image = e.target.files[0]
        fileApi.uploadFiles([image]).then(res => dispatch(setProductDetail({ ...productDetail, main_image_url: res[0] })))
            .catch(e => console.log(e))
    }

    const handleUploadImages = (e) => {
        const images = e.target.files;
        const listImages =[]
        for (var i = 0; i < images.length; i++) {
            listImages.push(images[i]);
        }
        fileApi.uploadFiles(listImages).then(res => {
            dispatch(addListImages({ url_images:res }) ) })
            .catch(e => console.log(e))
    }


    const onSave = async () => {
        try {
            if (productDetail.product_id) {
                productApi.updateProduct(productDetail)
            } else {
                productApi.addProduct(productDetail);
            }
            setOpenAlert(true)
        } catch (e) {

        }
    }
    const onChangeBrand = (value) => {
        if (value) {
            console.log(value)
            dispatch(setProductDetail({ brand_name: value.brand_name }))
            dispatch(setProductDetail({ brand_id: value.brand_id }));

        }
    }
    const onNew = () => {
        dispatch(resetProductDetail());
    }
    return (
        <div style={{ width: '100%' }}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '30ch' },
                }}
                autoComplete="off"
            >
                <div>
                    <TextField
                        required
                        id="product_id"
                        label="ID sản phẩm"

                        InputProps={{
                            readOnly: true,
                        }}
                        value={productDetail.product_id}
                    />
                    <TextField

                        id="title_product"
                        label="Tên sản phẩm"
                        onChange={(e) => dispatch(setProductDetail({ ...productDetail, title_product: e.target.value }))}
                        value={productDetail.title_product}
                    />
                    <Autocomplete
                        sx={{ display: "inline-flex" }}
                        id="brand"
                        options={brand}
                        onChange={(e, value) => {
                            onChangeBrand(value);
                        }}
                        getOptionLabel={option => option.brand_name}
                        filterOptions={createFilterOptions({
                            matchFrom: "start",
                            stringify: option => option.brand_name,
                        })}
                        renderInput={(params) => <TextField {...params} label="Thương hiệu" />}
                    />
                    <TextField
                        id="price"
                        label="Giá tiền"
                        type="number"
                        onChange={(e) => dispatch(setProductDetail({ ...productDetail, price: e.target.value }))}
                        value={productDetail.price}
                    />
                    <TextField
                        id="discount_percent"
                        label="Giảm giá(%)"
                        type="number"
                        onChange={(e) => dispatch(setProductDetail({ ...productDetail, discount_percent: e.target.value }))}
                        value={productDetail.discount_percent}
                    />
                    <Autocomplete
                        sx={{ display: "inline-flex" }}
                        id="type_of_product"
                        options={typeProduct}
                        value={productDetail.type_of_product}
                        onChange={(e, value) => dispatch(setProductDetail({ type_of_product: value }))}
                        renderInput={(params) => <TextField {...params} label="Loại sản phẩm" />}
                    />

                    <TextField
                        id="release_time"
                        label="Năm phát hành"
                        onChange={(e) => dispatch(setProductDetail({ ...productDetail, release_time: e.target.value }))}
                        value={productDetail.release_time}
                    />

                    <TextField
                        id="cpu"
                        label="CPU"
                        onChange={(e) => dispatch(setProductDetail({ ...productDetail, cpu: e.target.value }))}
                        value={productDetail.cpu}
                    />
                    <TextField
                        id="ram"
                        label="RAM"
                        onChange={(e) => dispatch(setProductDetail({ ...productDetail, ram: e.target.value }))}
                        value={productDetail.ram}
                    />
                    <TextField
                        id="hard_disk"
                        label="Ổ đĩa cứng"
                        onChange={(e) => dispatch(setProductDetail({ ...productDetail, hard_disk: e.target.value }))}
                        value={productDetail.hard_disk}
                    />
                    <TextField
                        id="gpu"
                        label="GPU"
                        onChange={(e) => dispatch(setProductDetail({ ...productDetail, gpu: e.target.value }))}
                        value={productDetail.gpu}
                    />
                    <TextField
                        id="screen"
                        label="Màn hình"
                        onChange={(e) => dispatch(setProductDetail({ ...productDetail, screen: e.target.value }))}
                        value={productDetail.screen}
                    />
                    <TextField
                        id="operating_system"
                        label="Hệ điều hành"
                        onChange={(e) => dispatch(setProductDetail({ ...productDetail, operating_system: e.target.value }))}
                        value={productDetail.operating_system}
                    />
                    <TextField
                        id="sim_description"
                        label="Mô tả Sim"
                        onChange={(e) => dispatch(setProductDetail({ ...productDetail, sim_description: e.target.value }))}
                        value={productDetail.sim_description}
                    />

                    <TextField
                        id="pin_charge"
                        label="Pin sạc"
                        onChange={(e) => dispatch(setProductDetail({ ...productDetail, pin_charge: e.target.value }))}
                        value={productDetail.pin_charge}
                    />
                    <TextField
                        id="back_camera"
                        label="Camera sau"
                        onChange={(e) => dispatch(setProductDetail({ ...productDetail, back_camera: e.target.value }))}
                        value={productDetail.back_camera}
                    />
                    <TextField
                        id="front_camera"
                        label="Camera trước"
                        onChange={(e) => dispatch(setProductDetail({ ...productDetail, front_camera: e.target.value }))}
                        value={productDetail.front_camera}
                    />
                    <TextField
                        id="description_detail"
                        label="Mô tả chi tiết"
                        placeholder="Mô tả chi tiết"
                        multiline
                        rows={1}
                        rowsMax={4}
                        onChange={(e) => dispatch(setProductDetail({ ...productDetail, description_detail: e.target.value }))}
                        value={productDetail.description_detail}
                    />
                    <TextField
                        id="design_description"
                        label="Mô tả thiết kế"
                        placeholder="Mô tả chi tiết thiết kế"
                        multiline
                        rows={1}
                        rowsMax={4}
                        onChange={(e) => dispatch(setProductDetail({ ...productDetail, design_description: e.target.value }))}
                        value={productDetail.design_description}
                    />
                    <TextField
                        id="main_image_url"
                        helperText="Hình ảnh chính"
                        type="file"
                        onChange={handleUploadMainImage}
                    />
                    <TextField
                        id="images"
                        helperText="Hình ảnh phụ"
                        type="file"
                        inputProps={{ multiple: true }}
                        onChange={handleUploadImages}
                    />
                </div>

            </Box>

            <Stack margin={5} justifyContent='flex-end' direction="row" spacing={10}>
                <Button variant="contained"
                    onClick={onNew}
                >
                    Tạo sản phẩm mới
                </Button>
                <Button variant="contained"
                    onClick={onSave}
                >
                    Lưu
                </Button>

            </Stack>
            <Alert title="Lưu thành công!" type="success" open={openAlert} setOpenAlert={setOpenAlert} />

        </div>

    );
}