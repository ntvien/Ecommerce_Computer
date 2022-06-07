import React from "react";
import "./index.css";

export default function HotDealSection() {
  return (
    <div id="hot-deal" class="section">
      {/* <!-- container --> */}
      <div class="container">
        {/* <!-- row --> */}
        <div class="row">
          <div class="col-md-12">
            <div class="hot-deal">
              <ul class="hot-deal-countdown">
                <li>
                  <div>
                    <h3>02</h3>
                    <span>Ngày</span>
                  </div>
                </li>
                <li>
                  <div>
                    <h3>10</h3>
                    <span>Giờ</span>
                  </div>
                </li>
                <li>
                  <div>
                    <h3>34</h3>
                    <span>Phút</span>
                  </div>
                </li>
                <li>
                  <div>
                    <h3>60</h3>
                    <span>Giây</span>
                  </div>
                </li>
              </ul>
              <h2 class="text-uppercase">Giá Sốc Tuần này</h2>
              <p>Bộ sưu tập mới giảm giá tới 50%</p>
              <a class="primary-btn cta-btn" href="#">
                Mua hàng nay bây giờ
              </a>
            </div>
          </div>
        </div>
        {/* <!-- /row --> */}
      </div>
      {/* <!-- /container --> */}
    </div>
  );
}
