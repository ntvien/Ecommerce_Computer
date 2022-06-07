import React, { Suspense, useEffect } from "react";
import Header from "./components/header/index.jsx";
import Navigation from "./components/navigation/index.jsx";
import Footer from "./components/footer/index.jsx";
import NewLetter from "./components/newLetter/index.jsx";
import Home from "./pages/home/index.jsx";
import Store from "./pages/store/index.jsx";
import Checkout from "./pages/checkout/index.jsx";
import Product from "./pages/product/index.jsx";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import NoMatch from "./pages/noMatch/NoMatch.js";
import Admin from "./pages/admin/index";
import Breadcrumb from "./components/breadcrumb/Breadcrumb.jsx";
import Auth from "./pages/auth/index.jsx";
import Profile from "./pages/Profile/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./reducers/AuthReducer.js";
import userApi from "./apis/userApi/index.js";
import Roles from "./util/users/Roles"
import AboutPage from "./pages/about/AboutPage.jsx";
import ContactPage from "./pages/contact/ContactPage.jsx";
import PolicyPage from "./pages/policy/PolicyPage.jsx";
function App() {
  const authDispatch = useDispatch();
  const { isAuth, profile } = useSelector((state) => state.auth);
  useEffect(async () => {
    const profile = await userApi.getUser();
    authDispatch(login(profile));
  }, []);
  return (
    <div class="App">
      <Suspense fallback={<div>Loading.....</div>}>
        <BrowserRouter>
          <Switch>
            <Route path="/admin">
            <Admin />
            </Route>
            <Route path="/auth">
              <Auth />
            </Route>

            <Route path="/">
              <Header />
              <Navigation />
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                {isAuth && (
                  <Route path="/profile">
                    <Profile />
                  </Route>
                )}
                <Route path="/store">
                  <Store />
                </Route>
                <Route path="/products/:productId">
                  <Product />
                </Route>
                <Route path="/checkout">
                   <Checkout /> 
                </Route>
                <Route path="/about">
                  <AboutPage />
                </Route>
                <Route path="/contact">
                  <ContactPage />
                </Route>
                <Route path="/policy">
                  <PolicyPage />
                </Route>
                <Route path="*">
                  <NoMatch />
                </Route>
              </Switch>

              <NewLetter />
              <Footer />
            </Route>
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}
export default App;
