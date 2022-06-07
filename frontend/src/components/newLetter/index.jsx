import "./index.css";
import React from "react";

export default function NewLetter() {
  return (
    // <!-- NEWSLETTER -->
    <div id="newsletter" class="section">
      {/* <!-- container --> */}
      <div class="container">
        {/* <!-- row --> */}
        <div class="row">
          <div class="col-md-12">
            <div class="newsletter">
              <p>
                Đăng ký nhận <strong>Tin tức mới</strong>
              </p>
              <form>
                <div class="row no-gutters">
                  <div className="col-6">
                    <input
                      class="input"
                      type="email"
                      placeholder="Nhập email..."
                    />
                  </div>
                  <div className="col-6">
                    <button class="newsletter-btn">
                      <i class="fa fa-envelope"></i> Đăng ký
                    </button>
                  </div>
                </div>
              </form>
              <ul class="newsletter-follow">
                <li>
                  <a href="https://www.facebook.com/tuanvu.hcmut">
                    <i class="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/tuannn.vu/">
                    <i class="fa fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/letuanvu08">
                    <i class="fa fa-github"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <!-- /row --> */}
      </div>
      {/* <!-- /container --> */}
    </div>
  );
}
