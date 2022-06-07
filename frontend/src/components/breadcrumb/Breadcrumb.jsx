import "./index.css";
import React, { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";

export default function Breadcrumb() {
  const location = useLocation();
  const breadcrumbs = useMemo(() => location.pathname.split("/"), [location]);
  return (
    // <!-- BREADCRUMB -->
    <div id="breadcrumb" class="section">
      {/* <!-- container --> */}
      <div class="container">
        {/* <!-- row --> */}
        <div class="row">
          <div class="col-md-12">
            <ul class="breadcrumb-tree">
              <li>
                <Link to="/" class={location.pathname === "/" ? "active" : ""}>
                  Trang chủ
                </Link>
              </li>
              {breadcrumbs.slice(1, breadcrumbs.length).map((path, index) => (
                <li>
                  <a class={index === breadcrumbs.length ? "active" : ""}>
                    {path}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* <!-- /row --> */}
      </div>
      {/* <!-- /container --> */}
    </div>
    // <!-- /BREADCRUMB -->
  );
}
