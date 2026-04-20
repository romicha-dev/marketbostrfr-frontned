import { createBrowserRouter } from "react-router-dom";

import About from "../pages/about/About";

import NotFound from "../pages/NotFound";
import Home from "../pages/homePage/Home";
import AdminRoute from "./AdminRoutes";
import AdminDashboard from "@/pages/Admin/AdminDashboard";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Services from "@/pages/services/Services";
import HowItWorks from "@/pages/HowItWorks/HowItWorks";
import Rates from "@/pages/rates/Rates";
import FAQ from "@/pages/faq/FAQ";
import Contact from "@/pages/contact/Contact";
import PrivacyPolicy from "@/pages/privecy/PrivecyPolicy";

import ClientDashboard from "@/pages/Client/ClientDahboard.tsx/ClientDashboard";
import { DeclarePackage } from "@/pages/Client/Declarepackage/DeclarePackage";
import MyPackages from "@/pages/Client/myPackage/MyPackages";
import Payment from "@/pages/Client/Payment/Payment";
import Invoices from "@/pages/Client/Invoices/Invoices";
import ClientLayout from "@/Layout/ClientLayouts";
import MainLayout from "@/Layout/MainLayout";
import Packages from "@/pages/Admin/Dashboard/Packages";
import { Clients } from "@/pages/Admin/Dashboard/Clients";
import { Payments } from "@/pages/Admin/Dashboard/Payments";
import { Quotes } from "@/pages/Admin/Dashboard/Quotes";
import { Settings } from "@/pages/Admin/Dashboard/Settings";
import { UserSettings } from "@/pages/Client/Settings/UserSettings";
import DropOff from "@/pages/Client/DropOff/DropOff";
import PhysicalDropOff from "@/pages/Client/DropOff/PhysicalDropOff";
import ForgotPasswordPage from "@/pages/ForgotPassworpage";
// import PackageTracking from "@/pages/Client/myPackage/PackageTracking";
// import CompeletePayment from "@/pages/Client/Payment/CompeletePayment";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/how-it-works",
        element: <HowItWorks />,
      },
      {
        path: "/rates",
        element: <Rates />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
          path: "/privacy-policy",
          element: <PrivacyPolicy/>
      },
       
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot_password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },



     
    ],
  },

        {
  path: "/client",
  element: <ClientLayout />,
  children: [
    {
      index: true,
      element: <ClientDashboard />,
    },
    {
      path: "declare-packages",
      element: <DeclarePackage />,
    },
    {
      path: "drop-off",
      element: <DropOff/>,
    },
    {
      path: "drop-off/physical-drop",
      element: <PhysicalDropOff/>,
    },
    {
      path: "my-packages",
      element: <MyPackages />,
    },
      //{
    //   path: "my-packages/track",
    //   element: <PackageTracking />,
    // },
    
    {
      path: "payment",
      element: <Payment />,
    },
    {
      path: "settings",
      element: <UserSettings/>,
    },
    {
      path: "invoices",
      element: <Invoices />,
    },
  ],
},

 {
        path: "/admin",
        element: <AdminRoute />, // This will check if the user is an admin
        children: [
           {
      index: true,
      element: <AdminDashboard />,
    },
          
          {
            path: "packages",
            element: <Packages />
          }, 
          {
            path: "clients",
            element: <Clients />
          }, 
          {
            path: "payments",
            element: <Payments />
          }, 
          {
            path: "quotes",
            element: <Quotes/>
          }, 
          {
            path: "settings",
            element: <Settings/>
          }, 
        ],
      },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
