import "./index.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToggleMenu } from "../../reducers/customers/triggerElement";
import HeaderSearch from "./HeaderSearch";
import Cart from "./Cart";
import { Link } from "react-router-dom";
import { logout } from "../../reducers/AuthReducer";
import { clearCart } from "../../reducers/customers/CartReducer";
import storageKeys from "../../util/enum/storageKeys";
import Roles from "../../util/users/Roles";
export default function Header() {
  const dispatch = useDispatch();
  const { isAuth, profile } = useSelector((state) => state.auth);
  const onClickMenu = () => {
    dispatch(setToggleMenu());
  };
  const handleLogout = () => {
    localStorage.removeItem(storageKeys.TOKEN);
    localStorage.removeItem(storageKeys.REFRESH_TOKEN);
    dispatch(logout());
    dispatch(clearCart());
  };
  return (
    <header>
      <div id="top-header">
        <div class="container">
          <div class=" row " id="top-header-links">
            <ul class="header-links pull-left col-md-7 col-sm-12">
              <li>
                <a href="#">
                  <i class="fa fa-phone"></i>0919523753
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fa fa-envelope-o"></i>vu.le08@hcmut.edu.vn
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fa fa-map-marker"></i>KTX khu A, Đại học Quốc gia
                  TP.HCM
                </a>
              </li>
            </ul>
            <ul class="header-links pull-right col-md-5 col-sm-12 ">
              {isAuth ? (
                <>
                  {profile.role_name === Roles.ADMIN && (
                    <li>
                      <Link to="/admin">
                        <i class="fa fa-tachometer "></i>Trang Admin
                      </Link>
                    </li>
                  )}
                  <li >
                    <Link to="/profile">
                      <i class="fa fa-user-o"></i>Tài khoản
                    </Link>
                  </li>
                  <li onClick={handleLogout}>
                    <i className="fa  fa-sign-out" aria-hidden="true"></i>{" "}
                    <a className="link-light" style={{ cursor: "pointer" }}>
                      Đăng xuất
                    </a>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/auth">
                    <i className="fa fa-user-o"></i> Đăng nhập
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div id="header">
        <div class="container">
          <div class="row">
            <div class="col-lg-3">
              <div class="header-logo">
                <Link to="/" className="logo">
                  <img
                    src="https://vitinhbk.vn/upload/hinhanh/logo-bk-computer-0944.png"
                    alt=""
                    width="350"
                    height="80"
                  ></img>
                </Link>
              </div>
            </div>
            <div class="col-lg-6">
              <HeaderSearch />
            </div>
            {/* <!-- ACCOUNT --> */}
            <div class="col-lg-3 clearfix">
              <div class="header-ctn">
                <Cart />

                <div class="menu-toggle" onClick={onClickMenu}>
                  <a href="#">
                    <i class="fa fa-bars"></i>
                    <span>Menu</span>
                  </a>
                </div>
                {/* <!-- /Menu Toogle --> */}
              </div>
            </div>
            {/* <!-- /ACCOUNT --> */}
          </div>
          {/* <!-- row --> */}
        </div>
        {/* <!-- container --> */}
      </div>
      {/* <!-- /MAIN HEADER --> */}
    </header>
  );
}
