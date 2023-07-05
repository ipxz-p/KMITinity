import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./views/Login";
import PersistLogin from "./features/auth/PersistLogin";
import Layout from "./components/Layout";
import Signup from "./views/Signup";
import PageNotFound from "./views/PageNotFound";
import ForgotPassword from "./views/ForgotPassword";
import Profile from "./views/Profile";
import Questions from "./views/Questions";
import CreateQuestion from "./views/CreateQuestion";
function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<Navbar />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Questions />}></Route>
            <Route path="questions/create" element={<CreateQuestion />}></Route>
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
