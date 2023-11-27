import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "../pages/log-in/LogIn";
import SignIn from "../pages/Sing-in/Sign-in";
import BannerPage from "../pages/BannerPage/BannerPage";

import EditBanner from "../pages/EditBanner/EditBanner";
import UserBanners from "../pages/UserBanner/UserBanner";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
import AllProduct from "../pages/AllProduct/AllProduct";
import AddBanner from "../pages/addBanner/addBanner";
import Layout from "../Layout/Layout";

function MyRouter(): JSX.Element {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/singIn" element={<SignIn />} />
          <Route path="/forgetPassword" element={<ForgetPassword/>} />
        <Route element={<Layout/>}>
           <Route path="/bannerPage/:id" element={<BannerPage />} />
           <Route path="/allProduct" element={<AllProduct />} />
          <Route path="/addBanner/:id" element={<AddBanner />} />
          <Route path="/userBanners" element={<UserBanners />} />
          <Route path="/editBanner/:id" element={<EditBanner />} />
         </Route>
      </Routes>
    </Router>
  );
}
export default MyRouter;
