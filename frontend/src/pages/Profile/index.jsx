import React, { useState, useEffect, useRef } from "react";
import Alert from "../../components/Alert/Alert";
import InformationCard from "./components/InformationCard";
import PasswordCard from "./components/PasswordCard";

export default function Profile() {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertConf, setAlertConf] = useState({});
  const handleInfoSuccess = () => {
    setAlertConf({
      type: "success",
      title: "Bạn đã cập nhật thông tin thành công",
    });
    setOpenAlert(true);
    return;
  };
  const handlePassSucess = () => {
    setAlertConf({
      type: "success",
      title: "Bạn đã thay đổi mật khẩu thành công",
    });
    setOpenAlert(true);
    return;
  };
  const handlePassFailure = (title) => {
    setAlertConf({
      type: "error",
      title: title,
    });
    setOpenAlert(true);
    return;
  };
  return (
    <div className="container mt-3">
      <div className="row border border-2 p-3">
        <div className="h2 fw-bold">Thông tin của tôi</div>
      </div>
      <div className="row border border-2 my-3 p-4">
        <InformationCard onSuccess={handleInfoSuccess} />
      </div>
      <div className="row border border-2 my-3 p-4">
        <PasswordCard onSuccess={handlePassSucess} onFailure={handlePassFailure}/>
      </div>
      <Alert {...alertConf} open={openAlert} setOpenAlert={setOpenAlert} />
    </div>
  );
}
