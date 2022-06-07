import React from "react";
import CollectionSection from "./components/collectionSection/index.jsx";
import HotDealSection from "./components/hotDeal";
import ProductTab from "./components/productTab/index.jsx";
import ProductWidgetTab from "../../components/productWidgetTab/index.jsx";
import SectionTitle from "./components/sessionTitle/index.jsx";
import "./index.css";
import MetaTags from "react-meta-tags";

export default function Home() {
  return (
    <div class="section">
      <MetaTags>
        <title>BK Computer</title>
        <meta
          name="description"
          content="Hàng 100% chính hãng được phân phối bởi hệ thống bán lẻ kỹ thuật số BK Computer cùng với nhiều khuyến mãi hấp dẫn, bảo hành chính hãng. Mua trực tuyến giá rẻ "
        />
        <meta
          name="keywords"
          content="laptop, giá rẻ, smartphone, điện thoại, máy tính"
        />
      </MetaTags>
      <CollectionSection />
      {/* new product */}
      <div class="section">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <SectionTitle title="Sản phẩm mới" />
            </div>
            <div class="col-md-12">
              <ProductTab keyWorkFilter="release_time" />
            </div>
          </div>
        </div>
      </div>
      {/* new product */}
      <HotDealSection />
      {/* TopSelling */}
      <div class="section">
        <div class="container">
          <div class="row">
            <SectionTitle title="Chương trình khuyến mãi" />
            <ProductTab keyWorkFilter="discount_percent" />
          </div>
        </div>
      </div>
      {/* TopSelling */}
      <div class="section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-3 col-xs-6 product-widget-tab ">
              <ProductWidgetTab keyWorkFilter="discount_percent" />
            </div>
            <div class="col-md-3 col-xs-6 product-widget-tab">
              <ProductWidgetTab keyWorkFilter="discount_percent" />
            </div>
            <div class="col-md-3 col-xs-6 product-widget-tab">
              <ProductWidgetTab keyWorkFilter="discount_percent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
