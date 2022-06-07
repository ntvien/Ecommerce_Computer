import React, { useState } from "react";

import ReviewTab from "../components/reviewTab";
import SpecTab from "./SpecTab";
import styles from "./TabContent.module.css";

const TabContent = ({ product }) => {
  const [tab, setTab] = useState("description");
  return (
    <div id="product-tab">
      <ul className="tab-nav">
        <li className={tab === "description" ? "active" : ""}>
          <a
            data-toggle="description"
            onClick={(e) => setTab(e.target.dataset.toggle)}
            style={{ cursor: "pointer" }}
          >
            Mô tả
          </a>
        </li>
        
        <li className={tab === "spec" ? "active" : ""}>
          <a
            data-toggle="spec"
            onClick={(e) => setTab(e.target.dataset.toggle)}
            style={{ cursor: "pointer" }}
          >
            {" "}
            Thông số kỹ thuật
          </a>
        </li>
        <li className={tab === "review" ? "active" : ""}>
          <a
            data-toggle="review"
            onClick={(e) => setTab(e.target.dataset.toggle)}
            style={{ cursor: "pointer" }}
          >{`Bình luận`}</a>
        </li>
        <span className={styles["after-tab-nav"]}></span>
      </ul>
      <div className="tab-content">
        <div>
          {tab == "description" && product.description_detail}
          {tab == "spec" && <SpecTab product={product} />}
          {tab == "review" && <ReviewTab product={product} />}
          {/* <!-- /tab3  --> */}
        </div>
      </div>
      {/* <!-- /product tab content  --> */}
    </div>
  );
};

export default TabContent;
