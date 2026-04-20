import { Outlet, useLocation } from "react-router-dom";
import { TabBar } from "@/pages/Client/TabBar";
import { ClientFooter } from "@/pages/Client/ClietnFooter";
import ScrollToTop from "@/components/ScrollToTop";
import { useEffect } from "react";

const ClientLayout = () => {
  const { pathname } = useLocation();

useEffect(() => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}, [pathname]);
  return (
    <>
      <ScrollToTop /> {/* self-closing */}
      <div className="bg-[#EFF6FF] min-h-screen">
        <div className="max-w-[1720px] mx-auto">
          <div className="w-full p-4">
            <TabBar user="Esther Howard" />
            <Outlet />
          </div>
          <ClientFooter />
        </div>
      </div>
    </>
  );
};

export default ClientLayout;
