import React, { useState } from "react";
import Slider from "react-slick";

const ThumbImage = React.forwardRef(
  ({ images, asNavFor, productName }, ref) => {
    const [current, setCurrent] = useState(0);
    const settings = {
      slidesToShow: images.length > 3 ? 3 : images.length - 1,
      slidesToScroll: 1,
      arrows: false,
      centerMode: true,
      focusOnSelect: true,
      centerPadding: 0,
      vertical: true,
      asNavFor: asNavFor,
      infinite: true,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            vertical: false,
            arrows: false,
            dots: true,
          },
        },
      ],
      beforeChange: (cur, next) => setCurrent(next),
    };
    return (
      <Slider {...settings} ref={ref} className="mb-5">
        {images.map((item, index) => (
          <div
            className={"border " + (index == current ? "border-primary" : "")}
          >
            <img src={item.url_image} alt={productName} className="w-100" />
          </div>
        ))}
      </Slider>
    );
  }
);

export default ThumbImage;
