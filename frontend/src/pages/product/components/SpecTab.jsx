import React from "react";

const SpecTab = ({ product }) => {
  return (
    <div className="w-75 mx-auto">
      <table className="table table-striped table-hover table-bordered">
        <tbody>
          <tr>
            <td className="fw-bold">Hãng sản xuất</td>
            <td>{product.brand_name}</td>
          </tr>
          <tr>
            <td className="fw-bold">Năm sản xuất</td>
            <td>{product.release_time}</td>
          </tr>
          <tr>
            <td className="fw-bold">CPU</td>
            <td>{product.cpu}</td>
          </tr>
          <tr>
            <td className="fw-bold">RAM</td>
            <td>{product.ram}</td>
          </tr>
          <tr>
            <td className="fw-bold">Ổ cứng</td>
            <td>{product.hard_disk}</td>
          </tr>
          <tr>
            <td className="fw-bold">Card đồ họa</td>
            <td>{product.gpu}</td>
          </tr>
          <tr>
            <td className="fw-bold">Màn hình</td>
            <td>{product.screen}</td>
          </tr>
          <tr>
            <td className="fw-bold">Hệ điều hành</td>
            <td>{product.operating_system}</td>
          </tr>
          <tr>
            <td className="fw-bold">Pin</td>
            <td>{product.pin_charge}</td>
          </tr>
          <tr>
            <td className="fw-bold">Camera trước</td>
            <td>{product.front_camera}</td>
          </tr>
          {product.back_camera && (
            <tr>
              <td className="fw-bold">Camera sau</td>
              <td>{product.back_camera}</td>
            </tr>
          )}
          <tr>
            <td className="fw-bold">Độ nặng</td>
            <td>{product.dimension_weight}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SpecTab;
