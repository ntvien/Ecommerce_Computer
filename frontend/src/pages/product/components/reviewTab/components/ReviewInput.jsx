import React, { useState } from "react";
import { useSelector } from "react-redux";
import communityApi from "../../../../../apis/community";
import Alert from "../../../../../components/Alert/Alert";
import StarRatings from "react-star-ratings";

const ReviewInput = ({ productId, loadReviews }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [alertConf, setAlertConf] = useState({});
  const [content, setContent] = useState("");
  const [star, setStar] = useState(0);

  const handleSubmitReview = async () => {
    if (!isAuth) {
      setAlertConf({
        type: "error",
        title: "Bạn chưa đăng nhập",
      });
      setOpenAlert(true);
      return;
    }
    if (!content) {
      setAlertConf({
        type: "error",
        title: "Bạn chưa nhập nội dung bình luận",
      });
      setOpenAlert(true);
      return;
    }
    if (star == 0) {
      setAlertConf({
        type: "error",
        title: "Bạn chưa cho đánh giá",
      });
      setOpenAlert(true);
      return;
    }
    try {
      const res = await communityApi.addReview({
        product_id: productId,
        content: content,
        number_star: star,
      });
      setAlertConf({
        type: "success",
        title: "Bình luận đã được lưu",
      });
      setOpenAlert(true);
      loadReviews();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="d-flex flex-column">
      <textarea
        rows={5}
        cols={40}
        className="w-100 p-2"
        placeholder="Bình luận của bạn"
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="input-rating row my-4">
        <span className="col-xl-auto p-0 align-self-center fw-bold text-center">
          Đánh giá của bạn:{" "}
        </span>
        <div className="stars col-xl-auto d-flex align-items-center mt-2 mt-xl-0">
          <div className="m-auto">
            <StarRatings
              rating={star}
              starRatedColor="#d10024"
              starHoverColor="#d10024"
              starDimension={25}
              changeRating={(rating) => setStar(rating)}
              numberOfStars={5}
            />
          </div>
        </div>
      </div>
      <button
        className="primary-btn mx-auto"
        type="submit"
        onClick={handleSubmitReview}
      >
        Bình luận
      </button>
      <Alert {...alertConf} open={openAlert} setOpenAlert={setOpenAlert} />
    </div>
  );
};

export default ReviewInput;
