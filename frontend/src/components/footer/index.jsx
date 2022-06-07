import "./index.css";
import React from "react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer id="footer">
      {/* <!-- top footer --> */}
      <div class="section">
        {/* <!-- container --> */}
        <div class="container">
          {/* <!-- row --> */}
          <div class="row justify-content-md-between">
            <div class="col-lg-3 col-md-6 col-xs-6 ">
              <div class="footer">
                <h3 class="footer-title">Thông tin liên hệ</h3>
                <p>Chào mừng bạn đến với ngôi nhà BK Computer! Tại đây, mỗi một dòng chữ, mỗi chi tiết và hình ảnh đều là những bằng chứng mang dấu ấn, và đang không ngừng phát triển lớn mạnh.</p>
                <ul class="footer-links">
                  <li><a href="#"><i class="fa fa-map-marker"></i>KTX khu A, Đại học Quốc gia TP.HCM</a></li>
                  <li><a href="#"><i class="fa fa-phone"></i>0919523753</a></li>
                  <li><a href="#"><i class="fa fa-envelope-o"></i>vu.le08@hcmut.edu.vn</a></li>
                </ul>
              </div>
            </div>

            <div class="col-lg-3 col-md-6 col-xs-6 ">
              <div class="footer">
                <h3 class="footer-title">Danh mục nổi bật</h3>
                <ul class="footer-links">
                  <li><Link to="/store">Ưu đãi lớn</Link></li>
                  <li><Link to="/store">Laptops</Link></li>
                  <li><Link to="/store">Smartphones</Link></li>
                </ul>
              </div>
            </div>

            <div class="clearfix d-lg-none"></div>

            <div class="col-lg-3 col-md-6 col-xs-6 ">
              <div class="footer">
                <h3 class="footer-title">Thông tin cửa hàng</h3>
                <ul class="footer-links">
                  <li><Link to="/about">Giới thiệu</Link></li>
                  <li><Link to ="/contact">Liên hệ</Link></li>
                  <li><Link to="/policy">Chính sách bảo mật</Link></li>
                </ul>
              </div>
            </div>

            <div class="col-lg-3 col-md-6 col-xs-6 ">
              <div class="footer">
                <h3 class="footer-title">Dịch vụ</h3>
                <ul class="footer-links">
                  <li><Link to ="/profile">Tài khoản của tôi</Link></li>
                </ul>
              </div>
            </div>
          </div>
          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </div>
      {/* <!-- /top footer --> */}

      {/* <!-- bottom footer --> */}
      <div id="bottom-footer" class="section">
        <div class="container">
          {/* <!-- row --> */}
          <div class="row">
            <div class="col-md-12 text-center">
              <ul class="footer-payments">
                <li><a href="#"><i class="fa fa-cc-visa"></i></a></li>
                <li><a href="#"><i class="fa fa-credit-card"></i></a></li>
                <li><a href="#"><i class="fa fa-cc-paypal"></i></a></li>
                <li><a href="#"><i class="fa fa-cc-mastercard"></i></a></li>
                <li><a href="#"><i class="fa fa-cc-discover"></i></a></li>
                <li><a href="#"><i class="fa fa-cc-amex"></i></a></li>
              </ul>
            </div>
          </div>
          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </div>
      {/* <!-- /bottom footer --> */}
    </footer>
  );
}
