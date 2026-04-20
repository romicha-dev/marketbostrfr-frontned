import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { Footer } from "./Footer";
import { useEffect } from "react";

const MainLayout = () => {
  const { pathname } = useLocation();


  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;