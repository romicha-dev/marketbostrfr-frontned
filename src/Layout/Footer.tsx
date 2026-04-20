import React, { useState } from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title?: string;
  links: FooterLink[];
}

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setIsSubscribed(false);
      }, 3000);
    }
  };

  const footerColumns: FooterColumn[] = [
    {
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "How It Works", href: "/how-it-works" },
        { label: "FAQ", href: "/faq" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
    {
      links: [
        { label: "Login / Register", href: "/login" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Trust & Legal Page", href: "/trust-legal" }, // Add route if exists
        { label: "Support", href: "/support" }, // Add route if exists
      ],
    },
  ];

  return (
    <footer className="w-full bg-white ">
      <div className="mx-auto px-4 md:px-8 pt-12 md:pt-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-t border-b border-gray-200">
  {/* Logo Section */}
  <div className="flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 p-6">
    <img src="/footerLogo.png" alt="Logo" />
  </div>

  {/* Newsletter Section */}
  <div className="flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-200 p-6">
    <h3 className="font-semibold text-gray-900 mb-4 font-inter text-sm uppercase tracking-wide">
      Newsletter sign up
    </h3>
    <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="px-4 py-2.5 bg-blue-50 border border-blue-200 font-roboto rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />
      <button
        type="submit"
        className="px-4 py-2.5 bg-blue-600 text-white font-medium font-inter rounded-lg hover:bg-blue-700 transition-colors text-sm"
      >
        {isSubscribed ? "✓ Subscribed" : "Subscribe"}
      </button>
    </form>
  <div className="flex gap-3 mt-7">
  <SocialIcon
    icon={<Facebook size={18} />}
    href="https://www.facebook.com"
  />
  <SocialIcon
    icon={<Instagram size={18} />}
    href="https://www.instagram.com"
  />
  <SocialIcon
    icon={<Twitter size={18} />}
    href="https://www.twitter.com"
  />
</div>

  </div>

  {/* Links Column 1 */}
  <div className="flex flex-col border-b md:border-b-0 md:border-r border-gray-200 p-6">
    <nav className="flex flex-col gap-3">
      {footerColumns[0].links.map((link) => (
        <Link
          key={link.label}
          to={link.href}
          className="text-gray-600 font-roboto hover:text-gray-900 text-sm transition-colors border-b border-b-[#DFE3E8] pb-3.5"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  </div>

  {/* Links Column 2 */}
  <div className="flex flex-col p-6">
    <nav className="flex flex-col gap-3">
      {footerColumns[1].links.map((link) => (
        <Link
          key={link.label}
          to={link.href}
          className="text-gray-600 font-roboto hover:text-gray-900 text-sm transition-colors border-b border-b-[#DFE3E8] pb-3.5"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  </div>
</div>


        {/* Bottom Border */}
        <div className="border-t border-gray-200 py-4">
          <div className="flex flex-col md:flex-row items-center font-roboto justify-between gap-4 text-sm font-normal text-[#A8ACAF]">
            <p>Copyright © 2025 Kayléo - All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/privacy-policy" className="hover:text-gray-700 font-roboto transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-300">•</span>
              <Link to="/terms-of-use" className="hover:text-gray-700 font-roboto transition-colors">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({
  icon,
  href,
}: {
  icon: React.ReactNode;
  href: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-9 h-9 bg-gray-400 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-all"
  >
    {icon}
  </a>
);



// import React from "react";
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

// const Footer: React.FC = () => {
//   return (
//     <footer className="bg-[#212a31] text-white py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* About Section */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">About Us</h3>
//             <p className="text-sm">
//               We are a team of passionate developers building amazing web
//               applications with modern technologies.
//             </p>
//           </div>

//           {/* Quick Links Section */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               <li>
//                 <a href="/" className="hover:text-gray-300">
//                   Home
//                 </a>
//               </li>
//               <li>
//                 <a href="/about" className="hover:text-gray-300">
//                   About
//                 </a>
//               </li>
//               <li>
//                 <a href="/services" className="hover:text-gray-300">
//                   Services
//                 </a>
//               </li>
//               <li>
//                 <a href="/contact" className="hover:text-gray-300">
//                   Contact
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Social Media Section */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Follow Us</h3>
//             <div className="flex space-x-4">
//               <a
//                 href="https://facebook.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-gray-300"
//               >
//                 <FaFacebook size={24} />
//               </a>
//               <a
//                 href="https://twitter.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-gray-300"
//               >
//                 <FaTwitter size={24} />
//               </a>
//               <a
//                 href="https://instagram.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-gray-300"
//               >
//                 <FaInstagram size={24} />
//               </a>
//               <a
//                 href="https://linkedin.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-gray-300"
//               >
//                 <FaLinkedin size={24} />
//               </a>
//             </div>
//           </div>

//           {/* Newsletter Section */}
//           <div>
//             <h3 className="text-lg font-bold mb-4">Newsletter</h3>
//             <p className="text-sm mb-4">
//               Subscribe to our newsletter to get the latest updates.
//             </p>
//             <form className="flex">
//               <input
//                 type="email"
//                 placeholder="Your email"
//                 className="p-2 mr-2 rounded-md border-1 border-white  text-white focus:outline-none"
//               />
//               <button
//                 type="submit"
//                 className="bg-[#124e66] text-[#d3d9d4] px-4 rounded-md hover:bg-[#124e66]/50"
//               >
//                 Subscribe
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Copyright Section */}
//         <div className="border-t border-gray-700 mt-8 pt-8 text-center">
//           <p className="text-sm">
//             &copy; {new Date().getFullYear()} Akash Saha. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// import type React from "react";
// import { useState } from "react";
// import { Facebook, Instagram, Twitter } from "lucide-react";
// import { Link, } from "react-router-dom";

// interface FooterLink {
//   label: string;
//   href: string;
// }

// interface FooterColumn {
//   title?: string;
//   links: FooterLink[];
// }

// export const Footer: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [isSubscribed, setIsSubscribed] = useState(false);

//   const handleSubscribe = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (email) {
//       setIsSubscribed(true);
//       setTimeout(() => {
//         setEmail("");
//         setIsSubscribed(false);
//       }, 3000);
//     }
//   };

//   const footerColumns: FooterColumn[] = [
//     {
//       links: [
//         { label: "Home", href: "#" },
//         { label: "About", href: "#" },
//         { label: "Services", href: "#" },
//         { label: "How It Works", href: "#" },
//         { label: "FAQ", href: "#" },
//         { label: "Contact Us", href: "#" },
//       ],
//     },
//     {
//       links: [
//         { label: "Login / Register", href: "#" },
//         { label: "Privacy Policy", href: "#" },
//         { label: "Trust & Legal Page", href: "#" },
//         { label: "Support", href: "#" },
//       ],
//     },
//   ];

//   return (
//     <footer className="w-full bg-white border-t border-gray-200">
//       <div className=" mx-auto px-4 md:px-8 pt-12 md:pt-16">
//         {/* Main Footer Content */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//           {/* Brand Section */}
//           <div className="lg:col-span-1 flex flex-col items-center justify-center">
//             <div className="flex items-center gap-2 mb-6">
//               <img src="/footerLogo.png" alt="" />
//             </div>
//           </div>

//           {/* Newsletter Section */}
//           <div className="lg:col-span-1 flex flex-col justify-between">
//             <div>
//               <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">
//                 Newsletter sign up
//               </h3>
//               <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
//                 <input
//                   type="email"
//                   placeholder="Email address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                 />
//                 <button
//                   type="submit"
//                   className="px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm"
//                 >
//                   {isSubscribed ? "✓ Subscribed" : "Subscribe"}
//                 </button>
//               </form>
//             </div>
//             {/* Social Icons */}
//             <div className="flex gap-3">
//               <a
//                 href="#"
//                 className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
//               >
//                 <Facebook size={18} className="text-gray-700" />
//               </a>
//               <a
//                 href="#"
//                 className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
//               >
//                 <Instagram size={18} className="text-gray-700" />
//               </a>
//               <a
//                 href="#"
//                 className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
//               >
//                 <Twitter size={18} className="text-gray-700" />
//               </a>
//             </div>
//           </div>

//           {/* Links Column 1 */}
//           <div className="flex flex-col">
//             <h3
//               className="font-semibold text-gray-900 mb-4 text-sm opacity-0"
//               aria-hidden="true"
//             >
//               Links
//             </h3>
//             <nav className="flex flex-col gap-3 space-y-1 ml-10">
//               {footerColumns[0].links.map((link) => (
//                 <a
//                   key={link.label}
//                   href={link.href}
//                   className="text-gray-600 hover:text-gray-900 text-sm transition-colors border-b border-b-[#DFE3E8] pb-1 max-w-2xs"
//                 >
//                   {link.label}
//                 </a>
//               ))}
//             </nav>
//           </div>

//           {/* Links Column 2 */}
//           <div className="flex flex-col">
//             <h3
//               className="font-semibold text-gray-900 mb-4 text-sm opacity-0"
//               aria-hidden="true"
//             >
//               Links
//             </h3>
//             <nav className="flex flex-col gap-3 space-y-2">
//               {footerColumns[1].links.map((link) => (
//                 <a
//                   key={link.label}
//                   href={link.href}
//                   className="text-gray-600 hover:text-gray-900 text-sm transition-colors border-b border-b-[#DFE3E8] pb-1"
//                 >
//                   {link.label}
//                 </a>
//               ))}
//             </nav>
//           </div>
//         </div>

//         {/* Bottom Border */}
//         <div className="border-t border-gray-200 py-4">
//           {/* Copyright and Legal Links */}
//           <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-normal text-[#A8ACAF]">
//             <p>Copyright © 2025 Kayléo - All rights reserved.</p>
//             <div className="flex gap-4">
// <Link
//   to="/privacy-policy"
//   className="hover:text-gray-700 transition-colors"
// >
//   Privacy Policy
// </Link>

//               <span className="text-gray-300">•</span>
//               <a href="#" className="hover:text-gray-700 transition-colors">
//                 Terms of Use
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };
