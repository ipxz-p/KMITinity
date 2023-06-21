import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views";
import Login from "./views/Login";
import PersistLogin from "./features/auth/PersistLogin";
import Layout from "./components/Layout";
import Signup from "./views/Signup";
import PageNotFound from "./views/PageNotFound";
import ForgotPassword from "./views/ForgotPassword";
import Profile from "./views/Profile";
import Blogs from "./views/Blogs";
import Questions from "./views/Questions";
function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<Navbar />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="blogs" element={<Blogs />}></Route>
            <Route path="questions" element={<Questions />}></Route>
            <Route path="/profile/:username" element={<Profile />}></Route>
          </Route>
        </Route>
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="forgotPassword" element={<ForgotPassword />} />
      <Route path='*' exact={true} element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
