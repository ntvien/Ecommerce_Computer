import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import productsApi from "../../apis/product";
import ProductCard from "../Card/ProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import ProductWidgetCard from "../Card/ProductWidgetCard";

const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  autoplay: true,
  speed: 300,
  dots: false,
  arrows: true,
  appendArrows: true,
};

export default function ProductWidgetTab({ keyWorkFilter }) {
  const [products, setProducts] = useState([]);
  const type_of_product = useSelector(
    (state) => state.filterTypeProduct.type_of_product
  );
  useEffect(() => {
    fetchProduct();
  }, []);
  const fetchProduct = () => {
    productsApi
      .getProducts({ page: 0, size: 9, sort_by: keyWorkFilter })
      .then((products) => {
        setProducts(products);
      })
      .catch((e) => console.log(e));
  };
  return (
    <div >
      <div class="section-title">
        <h4 class="title">Giá Sốc</h4>
        <div class="section-nav">
          <div id="slick-nav-3" class="products-slick-nav"></div>
        </div>
      </div>

      <div class="products-widget-slick" data-nav="#slick-nav-3">
        <Slider {...settings}>
          {products.length >= 9 ? (
            [...Array(3).keys()].map((i) => (
              <div key={i}>
                {[...Array(3).keys()].map((j) => (
                  <ProductWidgetCard key={j} item={products[i * 3 + j]} />
                ))}
              </div>
            ))
          ) : (
            <div></div>
          )}
        </Slider>
      </div>
      <div id="slick-nav-1" class="products-slick-nav"></div>
    </div>
  );
}
