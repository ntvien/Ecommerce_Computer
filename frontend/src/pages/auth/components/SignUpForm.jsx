import React, { useState } from "react";
import StringContent from "../../../util/string_utils/StringContent";
import storageKeys from "../../../util/enum/storageKeys";
import userApi from "../../../apis/userApi";
const SignUpForm = ({ redirectSignin }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [invalidUsername, setInvalidUserName] = useState("");
  const [invalidPass, setInvalidPass] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const checkValid = () => {
    setInvalidUserName("");
    setInvalidPass("");
    setInvalidEmail("");
    let isValid = true;
    if (!userName) {
      setInvalidUserName(StringContent.EMPTY_USER_NAME);
      isValid = false;
    }
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

    if (!password) {
      setInvalidPass(StringContent.EMPTY_PASSWORD);
      isValid = false;
    }
    return isValid;
  };
  const handleSignup = async () => {
    if (checkValid())
      try {
        const res = await userApi.register({
          user_name: userName,
          password: password,
          email: email,
        });
        redirectSignin();
      } catch (e) {
        if (e.response.status == 409) {
          setInvalidUserName(StringContent.EXISTENT_USER);
        }
      }
  };
  return (
    <form action="home.html" className="sign-up-form" method="GET">
      <h2 className="title">Đăng ký</h2>
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
          id="user_signup"
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
          invalidEmail
            ? {
                borderColor: "red",
                borderWidth: 1,
                borderStyle: "solid",
              }
            : {}
        }
      >
        <i className="fa fa-envelope"></i>
        <input
          id="email_signup"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br></br>
        <div font-size="15px" id="emailchecker"></div>
      </div>
      <p className="me-4 text-danger fs-6">{invalidEmail}</p>
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
          id="pwd_signup"
          name="password"
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br></br>
        <div font-size="15px" id="passwordchecker"></div>
      </div>
      <p className="me-4 text-danger fs-6">{invalidPass}</p>
      <input
        id="signup"
        type="button"
        className="btn-sign"
        value="Đăng ký"
        onClick={handleSignup}
      />
    </form>
  );
};

export default SignUpForm;
