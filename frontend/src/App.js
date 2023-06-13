import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views";
import Post from "./views/Post";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="post" element={<Post />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
