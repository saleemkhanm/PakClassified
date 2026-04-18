import { Outlet } from "react-router-dom";
import Header from "../Navbar/Header";
import { Footter } from "../Footter";

const MainLayout = () => {
  return (
    <>
      <Header />

      <div>
        <Outlet />  {/* Renders Home, About, Contact */}
      </div>

      <Footter />
    </>
  );
};

export default MainLayout;
