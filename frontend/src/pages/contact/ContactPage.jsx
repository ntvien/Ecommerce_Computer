import React from "react";
// import MemberCard from "./components/MemberCard";
import "./ContactPage.css";
export default function ContactPage() {
  return (
    <div class="container mt-3" id="contact">
      <div class="container py-1">
        <div class="row h-100 py-1 justify-content-center">
          <div class="col-md-6 col-sm-12 map" >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.122723562926!2d106.80443711533442!3d10.878269360278876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a5f4e477e9%3A0x29d5aeb365cee20b!2sKTX%20Khu%20A%20%C4%90HQG%20TP.HCM!5e0!3m2!1svi!2s!4v1638192068000!5m2!1svi!2s"
              width="100%"
              height="450"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
          <div class="col-md-6 col-sm-12 pl-3 content">
            <h2 class="font-weight-light">Cửa hàng BK Computer</h2>
            <div class="lead text-muted mb-0">
              <i class="fa fa-home pr-2" aria-hidden="true"></i>
              <span>Đại chỉ: KTX khu A, Đại học Quốc gia TP.HCM</span>
            </div>

            <div class="lead text-muted mb-0">
              <i class="fa fa-phone-square" aria-hidden="true"></i>
              <span>Số điện thoại: 0919523753</span>
            </div>
            <div class="lead text-muted mb-0">
              <i class="fa fa-envelope" aria-hidden="true"></i>
              <span>Email: vu.le08@hcmut.edu.vn</span>
            </div>
            <div class="lead text-muted mb-0">
              <i class="fa fa-clock-o" aria-hidden="true"></i>
              <span>Giờ làm việc: 8:00 - 17:30, T2-T7</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
