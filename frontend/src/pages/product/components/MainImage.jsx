import React from "react";
import Slider from "react-slick";

const MainImage = React.forwardRef(({ asNavFor, images, productName }, ref) => {
  const settings = {
    infinite: true,
    speed: 300,
    dots: false,
    arrows: true,
    fade: true,
    asNavFor: asNavFor,
  };
  return (
    <Slider {...settings} ref={ref}>
      {images.map((item, index) => (
        <div className="border">
          <img className="w-100" src={item.url_image} alt={productName} />
        </div>
      ))}
    </Slider>
  );
});

export default MainImage;
