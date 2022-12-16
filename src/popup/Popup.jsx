import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import "./popup.less";

const Popup = () => {
  return (
    <div className={"container"}>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="*" element={<Home />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default Popup;
