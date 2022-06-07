import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProductDetail from "./components/ProductDetail";
import "./index.css";
import { useParams } from "react-router-dom";
import productsApi from "../../apis/product";
import MainImage from "./components/MainImage";
import ThumbImage from "./components/ThumbImage";
import TabContent from "./components/TabContent";
import MetaTags from "react-meta-tags";

export default function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(null);
  const [mainImage, setMainImage] = useState();
  const [thumbImage, setThumbImage] = useState();
  console.log("productId:", productId);
  useEffect(async () => {
    try {
      const res = await productsApi.getProductById(productId);
      console.log(res);
      setProduct(res);
    } catch (e) {
      console.log(e);
    }
  }, [productId]);

  if (!product) return null;
  return (
    <div className="container mt-4">
      <MetaTags>
        <title>{product.title_product}</title>
        <meta name="description" content={product.description_detail} />
        <meta
          name="keywords"
          content={`${product.title_product}, ${product.brand_name}`}
        />
      </MetaTags>
      <div className="row justify-content-sm-center gx-5">
        <div className="col-lg-5 order-lg-1">
          <MainImage
            images={product.images}
            asNavFor={thumbImage}
            ref={(ref) => setMainImage(ref)}
            productName={product.title_product}
          />
        </div>
        <div className="col-lg-2 order-lg-0">
          <ThumbImage
            images={product.images}
            ref={(ref) => setThumbImage(ref)}
            asNavFor={mainImage}
            productName={product.title_product}
          />
        </div>
        <div className="col-lg-3 order-lg-2">
          <ProductDetail
            product={product}
          />
        </div>
      </div>
      <TabContent product={product} />
    </div>
  );
}
