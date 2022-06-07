import React, { useState, useEffect, useMemo, useRef } from "react";
import "./index.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../reducers/customers/CartReducer";
import ordersApi from "../../apis/orders";
import ModalOrder from "./components/modal";
import { useHistory } from "react-router-dom";
import Alert from "../../components/Alert/Alert";

const regular_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regular_phone = /^[0-9()-]+$/;

export default function Checkout() {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertConf, setAlertConf] = useState({});
  const { items, numberItems } = useSelector((state) => state.cart);
  const { isAuth, profile } = useSelector((state) => state.auth);
  const formRer = useRef(null);
  // const [accept, setAccept] = useState(false);
  const [show, setShow] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [isProcess, setIsProcess] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    history.push("/");
  };
  const totalPrice = useMemo(() => {
    return items.reduce(
      (a, b) =>
        a + (1 - b.discount_percent / 100) * Number(b.price) * b.number_items,
      0
    );
  }, [items, numberItems]);
  const [errorField, setErrorField] = useState({
    email_order: { error: false, helper: "", firstTime: true },
    phone_order: { error: false, helper: "", firstTime: true },
  });
  const [orderInfo, setOrderInfo] = useState({
    user_id: "",
    first_name: "",
    last_name: "",
    time_order: new Date().getTime(),
    address_order: "",
    phone_order: "",
    email_order: "",
    items: items,
    notes: "",
    type_payment: "bank_transfer",
  });
  useEffect(() => {
    setOrderInfo((old) => ({
      ...old,
      user_id: profile.user_id,
      first_name: profile.first_name,
      last_name: profile.last_name,
      address_order: profile.address,
      phone_order: profile.phone_number,
      email_order: profile.email,
    }));
  }, [profile]);
  const handleChangeField = (fieldName, value) => {
    setOrderInfo((order) => {
      order[fieldName] = value;
      return { ...order };
    });
  };
  const handleOrder = (e) => {
    e.preventDefault();
    if (!isProcess) {
      setIsProcess(true);
      if (isValidateField() && items.length > 0) {
        handleChangeField("time_order", new Date().getTime());
        ordersApi
          .addOrders(orderInfo)
          .then(() => {
            handleShow(true);
            dispatch(clearCart());
            setIsProcess(false);
          })
          .catch((e) => console.log(e));
      }
    }
  };
  const isValidateField = () => {
    const { email_order } = errorField;
    email_order.error = !regular_email.test(orderInfo.email_order);
    email_order.helper =
      orderInfo.email_order === ""
        ? "please fill out this field"
        : "email is invalid";
    email_order.firstTime = false;
    setErrorField((old) => ({ ...old, email_order: email_order }));
    const { phone_order } = errorField;
    phone_order.error = !regular_phone.test(orderInfo.phone_order);
    phone_order.helper =
      orderInfo.phone_order === ""
        ? "please fill out this field"
        : "phone is invalid";
    phone_order.firstTime = false;
    setErrorField((old) => ({ ...old, phone_order: phone_order }));
    return !phone_order.error && !email_order.error;
  };
  return (
    // <!-- SECTION -->
    <div class="section">
      {/* <!-- container --> */}
      <div class="container">
        {/* <!-- row --> */}
        <div class="row">
          <div class="col-md-7">
            {/* <!-- Billing Details --> */}
            <div class="billing-details ">
              <div class="section-title text-center">
                <h3 class="title">Đại chỉ thanh toán</h3>
              </div>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "80%" },
                }}
                autoComplete="off"
                onSubmit={handleOrder}
              >
                <input
                  type="submit"
                  style={{ display: "none" }}
                  ref={formRer}
                />
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="Tên"
                  fullWidth
                  variant="outlined"
                  autoComplete="given-name"
                  value={orderInfo.first_name}
                  on
                  onChange={(e) =>
                    handleChangeField("first_name", e.target.value)
                  }
                  onKeyDown={(e) => {
                    console.log(e);
                    if (e.code === "keyEnter" && e.target.value) {
                      e.preventDefault();
                    }
                  }}
                />
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Họ tên lót"
                  fullWidth
                  autoComplete="given-name"
                  variant="outlined"
                  value={orderInfo.last_name}
                  onChange={(e) =>
                    handleChangeField("last_name", e.target.value)
                  }
                />
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
                  fullWidth
                  autoComplete="email"
                  variant="outlined"
                  error={errorField.email_order.error}
                  helper={errorField.email_order.helper}
                  value={orderInfo.email_order}
                  onChange={(e) =>
                    handleChangeField("email_order", e.target.value)
                  }
                />
                <TextField
                  required
                  id="phone_number"
                  name="phone_number"
                  label="Số điện thoại"
                  fullWidth
                  autoComplete="phone"
                  variant="outlined"
                  error={errorField.phone_order.error}
                  helper={errorField.phone_order.helper}
                  value={orderInfo.phone_order}
                  onChange={(e) =>
                    handleChangeField("phone_order", e.target.value)
                  }
                />
                <TextField
                  required
                  id="address_order"
                  name="address_order"
                  label="Địa chỉ"
                  fullWidth
                  autoComplete="Address"
                  variant="outlined"
                  value={orderInfo.address_order}
                  onChange={(e) =>
                    handleChangeField("address_order", e.target.value)
                  }
                />
                <TextareaAutosize
                  aria-label="Order Notes"
                  placeholder="Ghi chú đơn hàng"
                  minRows={2}
                  maxRows={6}
                  style={{
                    padding: 10,
                    width: "80%",
                    marginLeft: 5,
                    borderColor: "#C4C4C4",
                  }}
                  value={orderInfo.notes}
                  onChange={(e) => handleChangeField("notes", e.target.value)}
                />
              </Box>
            </div>
          </div>

          {/* <!-- Order Details --> */}
          <div class="col-md-5 order-details">
            <div class="section-title text-center">
              <h3 class="title">Đơn hàng của bạn</h3>
            </div>
            <div class="order-summary">
              <div class="order-col">
                <div>
                  <strong>Sản phẩm</strong>
                </div>
                <div>
                  <strong>Giá tiền</strong>
                </div>
              </div>
              <div class="order-products">
                {items.map((item) => (
                  <div class="order-col">
                    <div>
                      {item.number_items}x {item.title_product}
                    </div>
                    <div>
                      $
                      {Number(
                        (1 - item.discount_percent / 100) *
                        item.price *
                        item.number_items
                      ).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              <div class="order-col">
                <div>Shiping</div>
                <div>
                  <strong>Miễn phí</strong>
                </div>
              </div>
              <div class="order-col">
                <div>
                  <strong>Tổng tiền</strong>
                </div>
                <div>
                  <strong class="order-total">
                    ${Number(totalPrice).toFixed(2)}
                  </strong>
                </div>
              </div>
            </div>
            <div class="payment-method">
              <div class="input-radio">
                <input
                  type="radio"
                  name="bank_transfer"
                  value="bank_transfer"
                  onClick={(e) =>
                    handleChangeField("type_payment", e.target.value)
                  }
                  checked={orderInfo.type_payment === "bank_transfer"}
                  id="bank_transfer"
                ></input>
                <label for="bank_transfer">
                  <span></span>
                  Chuyển khoản trực tiếp
                </label>
              </div>

              <div class="input-radio">
                <input
                  type="radio"
                  name="receive_payment"
                  value="receive_payment"
                  onChange={(e) =>
                    handleChangeField("type_payment", e.target.value)
                  }
                  checked={orderInfo.type_payment === "receive_payment"}
                  id="receive_payment"
                ></input>
                <label for="receive_payment">
                  <span></span>
                  Thanh toán tiền mặt khi nhận hàng
                </label>
              </div>
              <div class="input-radio">
                <input
                  type="radio"
                  name="zaloPay"
                  value="zaloPay"
                  onChange={(e) =>
                    handleChangeField("type_payment", e.target.value)
                  }
                  checked={orderInfo.type_payment === "zaloPay"}
                  id="zaloPay"
                ></input>
                <label for="zaloPay">
                  <span></span>
                  Thanh toán bằng ví ZaloPay
                </label>
              </div>
              <div class="input-radio">
                <input
                  type="radio"
                  name="momo"
                  value="momo"
                  onChange={(e) =>
                    handleChangeField("type_payment", e.target.value)
                  }
                  checked={orderInfo.type_payment === "momo"}
                  id="momo"
                ></input>
                <label for="momo">
                  <span></span>
                  Thanh toán bằng ví MoMo
                </label>
              </div>
              <div class="input-radio">
                <input
                  type="radio"
                  name="receive_payment"
                  value="creditCard"
                  onChange={(e) =>
                    handleChangeField("type_payment", e.target.value)
                  }
                  checked={orderInfo.type_payment === "creditCard"}
                  id="creditCard"
                ></input>
                <label for="creditCard">
                  <span></span>
                  Thanh toán bằng thẻ quốc tế Visa, Master, JCB
                </label>
              </div>
            </div>
            {/* <div class="input-checkbox">
              <input
                type="checkbox"
                id="terms"
                checked={accept}
                onChange={(e) => setAccept((old) => !old)}
              ></input>
              <label for="terms">
                <span></span>
                Tôi đã đọc và chấp nhận các <a href="#">điều khoản & điều kiện</a>
              </label>
            </div> */}
            <div
              class={`primary-btn order-submit  ${items.length <= 0 ? "disabled" : ""
                }`}
              onClick={() => formRer.current.click()}
            >
              Đặt hàng
            </div>
          </div>
          {/* <!-- /Order Details --> */}
        </div>
        {/* <!-- /row --> */}
      </div>
      {/* <!-- /container --> */}
      <Alert {...alertConf} open={openAlert} setOpenAlert={setOpenAlert} />
      <ModalOrder
        show={show}
        handleShow={handleShow}
        handleClose={handleClose}
      />
    </div>
  );
}
