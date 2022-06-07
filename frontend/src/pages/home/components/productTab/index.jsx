import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import productsApi from "../../../../apis/product";
import ProductCard from "../../../../components/Card/ProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

const settings = {
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  infinite: true,
  speed: 300,
  dots: false,
  arrows: true,
  appendArrows: false,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default function ProductTab({ keyWorkFilter }) {
  const [products, setProducts] = useState([]);
  const type_of_product = useSelector(
    (state) => state.filterTypeProduct.type_of_product
  );
  useEffect(() => {
    fetchProduct();
  }, [type_of_product]);
  const fetchProduct = () => {
    productsApi
      .getProducts({ page: 0, size: 10,brand_name:[], type_of_product:[type_of_product],min_price:0, max_price:5000,sort_by:keyWorkFilter })
      .then((products) => {
        setProducts(products);
      })
      .catch((e) => console.log(e));
  };
  return (
    <div class="row">
      <div class="products-tabs">
        <div id="tab1" class="tab-pane active">
          <div class="products-slick px-2" data-nav="#slick-nav-1">
            <Slider {...settings}>
              {products.length > 0 ? (
                products
                  .filter(
                    (product) =>
                      type_of_product === "" ||
                      product.type_of_product === type_of_product
                  )
                  .map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))
              ) : (
                <div></div>
              )}
            </Slider>
          </div>

          <div id="slick-nav-1" class="products-slick-nav"></div>
        </div>
      </div>
    </div>
  );
}
