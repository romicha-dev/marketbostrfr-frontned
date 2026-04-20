import { AdminSidebar } from "@/components/AdminComponent/AdminSidebar";
import MainHeader from "@/components/AdminComponent/MainHeader";
import { ClientFooter } from "@/pages/Client/ClietnFooter";
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const AdminRoute: React.FC = () => {
  const { pathname } = useLocation();

  // Route change হলে main content area scroll to top
  useEffect(() => {
    const mainContent = document.querySelector('.admin-main-content');
    if (mainContent) {
      mainContent.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // বা 'smooth' যদি smooth scroll চান
      });
    }
  }, [pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F9FF]">
      {/* Sidebar - Fixed on left */}
      <AdminSidebar />

      {/* Main content area - Takes remaining space */}
      <div className="flex-1 flex flex-col lg:ml-72 overflow-hidden">
        {/* Header - Sticky at top */}
        <div className="sticky top-0 z-10 bg-white shadow-sm">
          <MainHeader />
        </div>

        {/* Content area - Scrollable - ⭐ admin-main-content class add করা হয়েছে */}
        <main className="admin-main-content flex-1 overflow-y-auto px-3 md:px-6 lg:px-12 py-6 md:py-9">
          <div className="max-w-full">
            <Outlet />
            <div className="mt-20">
              <ClientFooter />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminRoute;





// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
// import type { RootState } from "../store/store";

// const AdminRoute = () => {
//   const user = useSelector((state: RootState) => state.auth.user);

//   // Check if the user is logged in and is an admin
//   if (!user || user.role !== "admin") {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// };

// export default AdminRoute;
