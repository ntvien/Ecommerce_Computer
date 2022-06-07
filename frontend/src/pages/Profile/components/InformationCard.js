import React, { useRef, useState, useEffect } from "react";
import Avatar from "react-avatar";
import firebaseStorageApi from "../../../apis/firebase";
import { useDispatch, useSelector } from "react-redux";
import fileApi from "../../../apis/fileApi";
import StringContent from "../../../util/string_utils/StringContent";
import userApi from "../../../apis/userApi";
import { updateProfile } from "../../../reducers/AuthReducer";
const InformationCard = ({ onSuccess }) => {
  const profile = useSelector((state) => state.auth.profile);
  const dispatch = useDispatch();
  const fileUpload = useRef();
  const [avatar, setAvatar] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidPhone, setInvalidPhone] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const handleUploadFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarURL(URL.createObjectURL(file));
    }
  };
  const resetInfo = () => {
    setPhoneNumber(profile.phone_number);
    setAddress(profile.address);
    setFirstName(profile.first_name);
    setLastName(profile.last_name);
    setEmail(profile.email);
    setAvatarURL(profile.avatar_url);
    cancelInvalid();
  };
  useEffect(() => {
    resetInfo();
  }, []);
  const cancelInvalid = () => {
    setInvalidEmail("");
    setInvalidPhone("");
  };
  const handleSave = async () => {
    let isValid = true;
    if (!email) {
      setInvalidEmail(StringContent.EMPTY_EMAIL);
      isValid = false;
    } else {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!email.match(emailPattern)) {
        setInvalidEmail(StringContent.INVALID_EMAIL);
        isValid = false;
      }
    }
    const phonePattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (!phoneNumber.match(phonePattern)) {
      setInvalidPhone(StringContent.INVALID_PHONE);
      isValid = false;
    }
    if (isValid) {
      const request = {
        email: email,
        phone_number: phoneNumber,
        address: address,
        last_name: lastName,
        first_name: firstName,
        avatar_url: profile.avatar_url,
      };
      try {
        if (avatar) {
          const urls = await fileApi.uploadFiles([avatar]);
          request.avatar_url = fileApi.getURL(urls[0]);
        }
        const res = await userApi.updateUser(request);
        onSuccess();
        dispatch(updateProfile(res));
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <>
      <div className="order-lg-1 col-lg-4 d-flex flex-column align-items-center mb-4">
        <Avatar
          size="200"
          round={true}
          className="mx-auto mb-5 d-block"
          name={profile.first_name || profile.user_name}
          src={avatarURL}
        />
        <input
          type="file"
          hidden
          ref={fileUpload}
          onChange={handleUploadFile}
          multiple={false}
        />
        <button
          onClick={() => fileUpload.current.click()}
          className="w-50 btn btn-success fw-bold"
        >
          Chọn ảnh
        </button>
      </div>
      <form className="order-lg-0 col-auto pb-2">
        <div className="mb-3 w-100">
          <label className="form-label fw-bold">Tên đăng nhập</label>
          <input
            type="text"
            className="form-control w-100"
            value={profile.user_name}
            disabled
          />
        </div>
        <div className="mb-3 w-100">
          <label className="form-label fw-bold">Email</label>
          <input
            type="text"
            className="form-control w-100"
            value={email}
            style={
              invalidEmail
                ? {
                  borderColor: "red",
                  borderWidth: 1,
                  borderStyle: "solid",
                }
                : {}
            }
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="me-4 text-danger mb-0 mt-2">{invalidEmail}</p>
          <div className="form-text">
            Chúng tôi sẽ không chia sẻ email của bạn cho bất kỳ ai.
          </div>
        </div>
        <div className="d-flex">
          <div className="mb-3 w-100 me-5">
            <label className="form-label fw-bold">Họ</label>
            <input
              type="text"
              className="form-control w-100"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-3 w-100">
            <label className="form-label fw-bold">Tên</label>
            <input
              type="text"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 w-100">
          <label className="form-label fw-bold">Số điện thoại</label>
          <input
            type="tel"
            className="form-control"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={
              invalidPhone
                ? {
                  borderColor: "red",
                  borderWidth: 1,
                  borderStyle: "solid",
                }
                : {}
            }
          />
          <p className="me-4 text-danger mb-0 mt-2">{invalidPhone}</p>
        </div>
        <div className="mb-3 w-100">
          <label className="form-label fw-bold">Địa chỉ</label>
          <input
            type="tel"
            className="form-control"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </div>
        <div className="d-flex align-self-start">
          <button
            type="button"
            className="btn btn-primary me-3"
            onClick={handleSave}
          >
            Lưu
          </button>
          <button type="button" className="btn btn-danger" onClick={resetInfo}>
            Hủy bỏ
          </button>
        </div>
      </form>
    </>
  );
};

export default InformationCard;
