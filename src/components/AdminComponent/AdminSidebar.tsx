import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Users,
  CreditCard,
  FileText,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../public/footerLogo.png";
import { useGetAllCompanySettingsQuery } from "@/redux/features/admin/settings/companyApi";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  to: string;
  end?: boolean;
}

export const AdminSidebar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate()

  const navItems: NavItem[] = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", to: "/admin",end: true },
    { icon: <Package size={20} />, label: "Packages", to: "/admin/packages" },
    { icon: <Users size={20} />, label: "Clients", to: "/admin/clients" },
    { icon: <CreditCard size={20} />, label: "Payments", to: "/admin/payments" },
    { icon: <FileText size={20} />, label: "Quotes", to: "/admin/quotes" },
    { icon: <Settings size={20} />, label: "Settings", to: "/admin/settings" },
  ];

  const { data,  } = useGetAllCompanySettingsQuery();
  const company = data?.[0]; 


  return (
    <>
         {/* Mobile Menu Button */}
      {!isMobileMenuOpen && (
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#164DB2] text-white rounded-lg shadow-lg"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Mobile Sidebar & Overlay */}
      {isMobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <aside
            className="fixed top-0 left-0 z-40 w-72 h-screen bg-white shadow-lg flex flex-col justify-between transform transition-transform duration-300 ease-in-out"
          >
            {/* Top Section */}
            <div>
              <div className="flex justify-between items-center p-6">
                <img src={logo} alt="Logo" className="h-10 w-48 object-contain" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-600 hover:text-black"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation */}
              <nav className="px-4 flex-1">
                <ul className="space-y-2">
                  {navItems.map((item, index) => (
                    <li key={index}>
                      <NavLink
                        to={item.to}
                        end={item.end}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                            isActive
                              ? "bg-[#164DB2] text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`
                        }
                      >
                        {item.icon}
                        <span className="font-normal font-roboto text-base leading-[150%]">{item.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* User Profile */}
            <div className="p-4 border-t border-gray-200">
              <div className="bg-[#164DB2] rounded-xl p-4 text-white flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Cameron"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm bg-[#70798666] rounded-full py-1 px-2 font-medium">Company</span>
                  </div>
                  <button onClick={()=> navigate('/client/settings')} className="p-1 hover:bg-blue-500 rounded-lg transition-colors">
                    <Settings size={20} />
                  </button>
                </div>
                <div>
                  <p className="font-semibold text-base">Cameron Williamson</p>
                  <p className="text-xs text-blue-200 mt-1">michelle.rivera@example.com</p>
                </div>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* Sidebar for large screens */}
      <div
        className="hidden lg:flex  lg:fixed inset-y-0 left-0 z-40  w-72 bg-white shadow-lg flex-col h-screen"
      >
        {/* Logo */}
        <div className="p-6 pb-8">
          <img src={logo} alt="Logo" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.to}
                    end={item.end} 
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4">
          <div className="bg-[#164DB2] rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Cameron"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm bg-[#70798666] rounded-full py-2 px-2.5 font-medium">Company</span>
              </div>
              <button onClick={()=> navigate('/admin/settings')} className="p-1 hover:bg-blue-500 cursor-pointer rounded-lg transition-colors">
                <Settings size={20} />
              </button>
            </div>
            <div>
              <p className="font-semibold text-base">{company?.companyName}</p>
              <p className="text-xs text-blue-200 mt-1">
                {company?.companyEmail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
