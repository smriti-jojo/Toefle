import "./App.css";
// import Sidebar from "./Components/Material/Sidebar.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Footer from "./Components/Material/Footer";
// import { createContext, useRef, useState } from "react";
// import { FaBars, FaHamburger } from "react-icons/fa";
import Playlist from "./Pages/Playlist";
import AudioProvider from "./Context/DataProvider";
import Login from "./Pages/EntryPage";
import Home from "./Pages/Home";
import Category from "./Pages/Category";
import ProtectedRoute from "./route/ProtectedRoute";
import ResetPassword from "./Pages/ResetPassword";
import ChangePassword from "./Pages/ChangePassword";
function App() {
  // const [sidebarshow, setShowsidebar] = useState(false);
  // const [play, setPlay] = useState(true);

  // const toggle = (status) => {
  //   setShowsidebar(status);
  // };

  return (
    <>
      <AudioProvider>
        <BrowserRouter>
          <div className=" ">
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/reset_password" element={<ResetPassword />}></Route>
              <Route path="/passwordReset" element={<ChangePassword />}></Route>

              <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />}></Route>
                {/* <Route path="/get_test/:test" element={<Test />}></Route> */}
                <Route path="/get_test/:category" element={<Category />} />
                <Route path="/get_test/:category/:id" element={<Playlist />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </AudioProvider>
    </>
  );
}

export default App;
