import "./index.css";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
export default function Navigation() {
  const location = useLocation();
  const toggleMenu = useSelector((state) => state.triggerElement.toggleMenu);
  return (
    <nav id="navigation">
      <div class="container">
        <div id="responsive-nav" class={toggleMenu ? "active" : ""}>
          <ul class="custom-nav main-nav nav">
            <li class={location.pathname === "/" ? "active" : ""}>
              <Link to="/">Trang chủ</Link>
            </li>
            <li class={location.pathname === "/store" ? "active" : ""}>
              <Link to="/store">Cửa hàng</Link>
            </li>
          
            <li class={location.pathname === "/about" ? "active" : ""}>
              <Link to="/about">Giới thiệu</Link>
            </li>
            <li class={location.pathname === "/contact" ? "active" : ""}>
              <Link to="/contact">Liên hệ</Link>
            </li>
            <li class={location.pathname === "/policy" ? "active" : ""}>
              <Link to="/policy">Chính sách bảo mật</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
