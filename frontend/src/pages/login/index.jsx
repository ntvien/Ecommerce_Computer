import { Dvr } from "@mui/icons-material";
import { borderColor } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import userApi from "../../apis/userApi";
import { login } from "../../reducers/AuthReducer";
import storageKeys from "../../util/enum/storageKeys";
import StringContent from "../../util/string_utils/StringContent";
import "./index.css";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [invalidUsername, setInvalidUserName] = useState("");
  const [invalidPass, setInvalidPass] = useState("");
  const authDispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = async () => {
    setInvalidUserName("");
    setInvalidPass("");
    if (!userName) {
      setInvalidUserName(StringContent.EMPTY_USER_NAME);
      return;
    }
    if (!password) {
      setInvalidPass(StringContent.EMPTY_PASSWORD);
      return;
    }
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
  };
  return (
    <div>
      <div class={"container-login " + (isSignUp ? "sign-up-mode" : "")}>
        <div class="forms-container">
          <div class="signin-signup">
            <form action="home.html" class="sign-in-form">
              <h2 class="title">Đăng nhập</h2>
              <div
                class="input-field"
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
                <i class="fa fa-user"></i>
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
                class="input-field"
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
                <i class="fa fa-lock"></i>
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
                class="btn-sign solid"
                onClick={handleLogin}
              />
            </form>

            <form action="home.html" class="sign-up-form" method="GET">
              <h2 class="title">Đăng ký</h2>
              <div class="input-field">
                <i class="fa fa-user"></i>
                <input
                  id="user_signup"
                  name="user"
                  type="text"
                  placeholder="Tên đăng nhập"
                />
              </div>
              <div class="input-field">
                <i class="fa fa-envelope"></i>
                <input
                  id="email_signup"
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                <br></br>
                <div font-size="15px" id="emailchecker"></div>
              </div>
              <div class="input-field">
                <i class="fa fa-lock"></i>
                <input
                  id="pwd_signup"
                  name="password"
                  type="password"
                  placeholder="Mật khẩu"
                />
                <br></br>
                <div font-size="15px" id="passwordchecker"></div>
              </div>
              <input id="signup" type="button" class="btn-sign" value="Đăng ký" />
            </form>
          </div>
        </div>

        <div class="panels-container">
          <div class="panel left-panel">
            <div class="content">
              <img src="../img/log.svg" class="image" alt="" />
              <h2>Xin chào bạn. Hãy đăng ký tài khoản cho bạn!</h2>
              <button class="btn-sign transparent" id="sign-up-btn" onClick={() => setIsSignUp(true)}>
                Đăng Ký
              </button>
            </div>
            <img src="../img/log.svg" class="image" alt="" />
          </div>
          <div class="panel right-panel">
            <div class="content">
              <img src="../img/log.svg" class="image" alt="" />
              <h2>Xin chào bạn. Hãy đăng nhập vào tài khoản của bạn!</h2>
              <button class="btn-sign transparent" id="sign-in-btn" onClick={() => setIsSignUp(false)}>
                Đăng nhập
              </button>
            </div>
            <img src="../img/register.svg" class="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
