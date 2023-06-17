import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views";
import Post from "./views/Post";
import Login from "./views/Login";
import PersistLogin from "./features/auth/PersistLogin";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<Navbar />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="post" element={<Post />}></Route>
          </Route>
        </Route>
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
