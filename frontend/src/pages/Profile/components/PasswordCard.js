import React, { useState } from "react";
import userApi from "../../../apis/userApi";

const PasswordCard = ({onSuccess, onFailure}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleChangePassword = async () => {
    if (newPassword != confirmPassword) {
      onFailure("Mật khẩu xác nhận không trùng khớp")
      return;
    }
    try {
      const res = await userApi.changePassword({
        old_password: currentPassword,
        new_password: newPassword
      });
      onSuccess();
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (e) {
      onFailure("Mật khẩu không đúng")
    }
    
  };
  return (
    <form className="align-items-start">
      <div className="mb-3">
        <label className="form-label fw-bold">Mật khẩu hiện tại</label>
        <input
          type="password"
          className="form-control"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-bold">Mật khẩu mới</label>
        <input
          type="password"
          className="form-control"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-bold">Mật khẩu mới (xác nhận)</label>
        <input
          type="password"
          className="form-control"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button
        type="button"
        className="btn btn-primary me-3"
        onClick={handleChangePassword}
      >
        Thay đổi mật khẩu
      </button>
    </form>
  );
};

export default PasswordCard;
