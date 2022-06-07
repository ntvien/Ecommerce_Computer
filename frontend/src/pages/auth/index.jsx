import { Dvr } from "@mui/icons-material";
import { borderColor } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import userApi from "../../apis/userApi";
import { login } from "../../reducers/AuthReducer";
import storageKeys from "../../util/enum/storageKeys";
import StringContent from "../../util/string_utils/StringContent";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import "./index.css";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div>
      <div class={"container-login " + (isSignUp ? "sign-up-mode" : "")}>
        <div class="forms-container">
          <div class="signin-signup">
            <SignInForm />
            <SignUpForm redirectSignin={() => setIsSignUp(false)} />
          </div>
        </div>

        <div class="panels-container">
          <div class="panel left-panel">
            <div class="content">
              <h4>Xin chào bạn. Hãy đăng ký tài khoản cho bạn!</h4>
              <button class="btn-sign transparent" id="sign-up-btn" onClick={() => setIsSignUp(true)}>
                Đăng Ký
              </button>
              <br></br><br></br><br></br>
              <img src="https://firebasestorage.googleapis.com/v0/b/web-programing-288db.appspot.com/o/static%2Fregister.svg?alt=media&token=221b226a-f9da-4c35-a004-d055ca865244" class="image" alt="" width="300" height="300" />

            </div>
          </div>
          <div class="panel right-panel">
            <div class="content">
              <img src="https://firebasestorage.googleapis.com/v0/b/web-programing-288db.appspot.com/o/static%2Flog.svg?alt=media&token=421eb869-a2dc-495f-9a96-94d33a1e2a6f" class="image" alt="" width="300" height="300" />
              <br></br><br></br>
              <h4>Xin chào bạn. Hãy đăng nhập vào tài khoản của bạn!</h4>
              <button class="btn-sign transparent" id="sign-in-btn" onClick={() => setIsSignUp(false)}>
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
