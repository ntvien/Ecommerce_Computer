import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import userApi from "../../../apis/userApi";
import StringContent from "../../../util/string_utils/StringContent";
import storageKeys from "../../../util/enum/storageKeys";
import { login } from "../../../reducers/AuthReducer";
const SignInForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [invalidUsername, setInvalidUserName] = useState("");
  const [invalidPass, setInvalidPass] = useState("");
  const authDispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const checkValid = () => {
    setInvalidUserName("");
    setInvalidPass("");
    let isValid = true;
    if (!userName) {
      setInvalidUserName(StringContent.EMPTY_USER_NAME);
      isValid = false;
    }
    if (!password) {
      setInvalidPass(StringContent.EMPTY_PASSWORD);
      isValid = false;
    }
    return isValid;
  };
  const handleLogin = async () => {
    if (checkValid()) {
      try {
        const res = await userApi.login({
          user_name: userName,
          password: password,
        });
        localStorage.setItem(storageKeys.TOKEN, res["token"]);
        localStorage.setItem(storageKeys.REFRESH_TOKEN, res["refreshToken"]);
        const profile = await userApi.getUser();
        authDispatch(login(profile));
        history.replace(from);
      } catch (e) {
        if (e.response.status == 401) {
          if (e.response.data == "nonexistent_user") {
            setInvalidUserName(StringContent.NON_EXISTENT_USER);
          }
          if (e.response.data == "wrong_password") {
            setInvalidPass(StringContent.INVALID_PASSWORD);
          }
        }
      }
    }
  };
  return (
    <form action="home.html" className="sign-in-form">
      <h2 className="title">Đăng nhập</h2>
      <div
        className="input-field"
        style={
          invalidUsername
            ? {
              borderColor: "red",
              borderWidth: 1,
              borderStyle: "solid",
            }
            : {}
        }
      >
        <i className="fa fa-user"></i>
        <input
          id="user_login"
          name="user"
          type="text"
          placeholder="Tên đăng nhập"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
      </div>
      <p className="me-4 text-danger fs-6">{invalidUsername}</p>
      <div
        className="input-field"
        style={
          invalidPass
            ? {
              borderColor: "red",
              borderWidth: 1,
              borderStyle: "solid",
            }
            : {}
        }
      >
        <i className="fa fa-lock"></i>
        <input
          id="pwd_login"
          name="password"
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <p className="me-4 text-danger fs-6">{invalidPass}</p>
      <input
        id="login"
        type="button"
        value="Đăng nhập"
        className="btn-sign solid"
        onClick={handleLogin}
      />
    </form>
  );
};

export default SignInForm;
