import { Menu, X, Search, Bell,  Settings, LogOut,  } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import userImg from '../../../public/clientUser.jpg';
import { NotificationModal } from "./NotificationModal";
import { DashboardIcon } from "@/assets/svg/DashboardIcon";
import { DeclarePackageIcon } from "@/assets/svg/DeclarePackage";
import { DropOffIcon } from "@/assets/svg/DropOffIcon";
import { MypackageIcon } from "@/assets/svg/MypackageIcon";
import { PaymentIcon } from "@/assets/svg/PaymentIcon";
import { InvoiceIcon } from "@/assets/svg/InvoiceIcon";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/features/auth/auth.slice";
import { useGetNotificationsQuery, } from "@/redux/features/admin/notificationApi";



interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
}

export const TabBar: React.FC<{ user: string }> = ({  }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const location = useLocation();
  
  const searchDropdownRef = useRef<HTMLDivElement | null>(null);
  const userDropdownRef = useRef<HTMLDivElement | null>(null);
  
  const isActive = (path: string) => location.pathname.includes(path);

  const navigate = useNavigate()

    const authUser = useSelector(selectUser);


    const { data,  } = useGetNotificationsQuery(undefined);
  
    const notifications = data || [];
  

    const unreadCount = notifications.filter((n: any) => !n.isRead).length;

  console.log(unreadCount)
 







  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
     <>
      <nav className="py-4 sticky top-0 z-50 ">
        <div className=" ">
        
          <div className="flex justify-between items-center gap-4">
            
     
            <div className="items-center flex-1 max-w-md  lg:block">
              <div ref={searchDropdownRef} className="relative w-full">
                <span className="absolute inset-y-0 left-4 flex items-center">
                  <Search className="w-5 h-5 text-gray-400" />
                </span>
                <input
                  type="text"
                  placeholder="Search by name"
                  className="w-full bg-[#E3EBFB] rounded-full py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            
            <div className="hidden lg:flex items-center bg-[#E3EBFB] p-1.5 rounded-full shadow-sm shrink-0">
              <NavItem
                to="/client"
                
                label="Dashboard"
                icon={<DashboardIcon />}
//    
                active={location.pathname === "/client"}
              />
              <NavItem
                to="/client/declare-packages"
                label="Declare Packages"
                icon={<DeclarePackageIcon/>}
                active={isActive("declare-packages")}
              />
              <NavItem
          to="/client/drop-off"
           label="Drop-off/Pick Up"
                icon={<DropOffIcon/>}
                active={isActive("drop-off")}
              />


              <NavItem
                to="/client/my-packages"
                label="My Packages"
                icon={<MypackageIcon/>}
                active={isActive("my-packages")}
              />
              <NavItem
                to="/client/payment"
                label="Payment"
                icon={<PaymentIcon/>}
                active={isActive("payment")}
              />
              <NavItem
                to="/client/invoices"
                label="Invoices"
                icon={<InvoiceIcon/>}
                active={isActive("invoices")}
              />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Notification Button */}
              <button
                onClick={() => setShowNotificationModal(true)}
                className="relative w-12 h-12 flex items-center justify-center cursor-pointer bg-[#E3EBFB] rounded-full hover:bg-[#d4e0f7] transition-colors"
              >
                <Bell className="w-6 h-6 text-gray-700" />
             {unreadCount > 0 && (
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
      {unreadCount}
    </span>
  )}
              </button>

              {/* User Dropdown */}
              <div className="relative hidden sm:block" ref={userDropdownRef}>
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-3 bg-[#E3EBFB] pl-1.5 pr-4 py-1.5  cursor-pointer rounded-full hover:bg-[#d4e0f7] transition-colors"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img    src={authUser?.profileImageUrl || userImg}  alt="user" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm font-semibold">  {authUser?.firstName} {authUser?.lastName}</span>
                  <svg
                    width="14"
                    height="8"
                    viewBox="0 0 14 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform duration-200 ${showUserDropdown ? 'rotate-180' : ''}`}
                  >
                    <path
                      d="M13.5932 0.194858C14.0379 0.522373 14.1329 1.14837 13.8054 1.59306C13.551 1.93847 13.2965 2.26681 13.0734 2.55277C12.6278 3.12364 12.0145 3.88817 11.3482 4.65563C10.6861 5.41813 9.95209 6.20639 9.2668 6.81189C8.9253 7.11363 8.57235 7.39112 8.22818 7.5986C7.91146 7.78954 7.47627 8 7.00014 8C6.52401 8 6.08878 7.78954 5.77206 7.5986C5.42789 7.39112 5.07494 7.11363 4.73344 6.81189C4.04815 6.20639 3.31412 5.41813 2.65208 4.65563C1.98572 3.88817 1.3724 3.12364 0.926885 2.55277C0.703715 2.26681 0.449268 1.93847 0.194876 1.59307C-0.132638 1.14837 -0.0376466 0.522373 0.407047 0.194858C0.585806 0.0632034 0.793869 -0.000168223 1.00007 4.85979e-06L7.00013 4.59752e-06L13.0002 4.33525e-06C13.2064 -0.000168766 13.4144 0.0632029 13.5932 0.194858Z"
                      fill="#1C60DF"
                    />
                  </svg>
                </button>

                {/* User Dropdown Menu */}
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-slate-200">
                          <p className="font-semibold text-slate-800">
        {authUser?.firstName} {authUser?.lastName}
      </p>
      <p className="text-xs text-slate-500">{authUser?.email}</p>
                    </div>
                    <div className="py-2">
                  
                      <button onClick={()=> navigate('/client/settings')}  className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 cursor-pointer flex items-center space-x-3 transition-colors">
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </button>
                  
                    </div>
                    <div className="border-t border-slate-200 py-2">
                      <button onClick={()=> navigate('/')} className="w-full px-4 py-2.5 cursor-pointer text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors">
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* ================= MOBILE DROPDOWN ================= */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 bg-[#E3EBFB] rounded-2xl p-4 shadow-lg space-y-2">
              {/* Mobile Search */}
              <div className="mb-3">
                <div className="relative w-full">
                  <span className="absolute inset-y-0 left-4 flex items-center">
                    <Search className="w-5 h-5 text-gray-400" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search by name"
                    className="w-full bg-white rounded-full py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              
              <MobileNavItem to="/client" label="Dashboard" />
              <MobileNavItem to="/client/declare-packages" label="Declare Packages" />
              <MobileNavItem to="/client/drop-off" label="Drop-off/Pick Up" />
              <MobileNavItem to="/client/my-packages" label="My Packages" />
              <MobileNavItem to="/client/payment" label="Payment" />
              <MobileNavItem to="/client/invoices" label="Invoices" />
              
              {/* Mobile User Menu */}
              <div className="sm:hidden border-t border-white/30 pt-3 mt-3">
                <div className="flex items-center gap-3 px-4 py-2 mb-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src={userImg} alt="user" className="w-full h-full object-cover" />
                  </div>
                  <div>
                                   <p className="font-semibold text-slate-800">
        {authUser?.firstName} {authUser?.lastName}
      </p>
      <p className="text-sm text-slate-500 ">{authUser?.email}</p>
                  </div>
                </div>
              
                <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-white rounded-lg flex items-center space-x-3">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center space-x-3">
                  <LogOut className="w-4 h-4" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Notification Modal */}

<NotificationModal
  isOpen={showNotificationModal}
  onClose={() => setShowNotificationModal(false)}
/>
</>
  );
};

/* ================= DESKTOP NAV ITEM ================= */
const NavItem: React.FC<NavItemProps> = ({ to, label, icon, active }) => {
  const color = active ? "#1C60DF" : "#292D32";

  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-4 xl:px-6 py-2.5 rounded-full 
      text-xs xl:text-sm font-semibold transition-all whitespace-nowrap
      ${active ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"}
      `}
    >
      {/* ICON */}
 <span className="w-5 h-5 flex items-center justify-center">
  {React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<React.SVGProps<SVGSVGElement>>, {
        stroke: color,
      })
    : icon}
</span>

      {/* LABEL */}
      <span className="hidden xl:inline">{label}</span>
    </Link>
  );
};


/* ================= MOBILE NAV ITEM ================= */
const MobileNavItem = ({ to, label }: { to: string; label: string }) => (
  <Link
    to={to}
    className="block w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-white transition"
  >
    {label}
  </Link>
);