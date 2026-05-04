
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Home from "./Components/Home";
import { AboutUs } from "./Components/AboutUs";
import Contact from "./Components/Contact";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { advertismentContext } from "./Context/context";
import { useState } from "react";

import CategoryDetail from "./Components/CategoryDetail";
import Update from "./Components/Update";
import UserProfile from "./Components/UserProfile";
import LoginModal from "./Modals/LoginModal";

const App = () => {
  const [selectedAd, setSelectedAd] = useState(null);

  return (
    <advertismentContext.Provider value={{ selectedAd, setSelectedAd }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="category/:id" element={<CategoryDetail />} />
            <Route path="details/:id" element={<CategoryDetail />} />
            <Route path="/login" element={<LoginModal />} />

            <Route path="/profile" element={<UserProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </advertismentContext.Provider>
  );
};

export default App;