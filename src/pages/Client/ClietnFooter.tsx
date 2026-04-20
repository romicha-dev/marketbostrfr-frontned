import logo from '../../../public/footerLogo.png';
import { Facebook, Instagram, Twitter } from 'lucide-react'; // Social icons er jonno

export const ClientFooter: React.FC = () => {
  return (
    <footer className="bg-[#F3F7FF] ">
      <div className="">
        {/* Blue background box inside footer */}
        <div className="bg-[#1D61DF0F] px-10 py-3 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Logo & Socials */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img src={logo} alt="KayLeo" className="h-8" />
          <div className="flex gap-3">
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

          {/* Copyright */}
          <p className="text-gray-400 text-sm flex items-center font-normal font-roboto leading-[150%]">
            Copyright © 2025 Kayleo . All rights reserved.
          </p>

          {/* Links */}
          <div className="flex gap-2 text-sm font-normal font-roboto leading-[150%] text-[#919EAB]">
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600">Terms of Use</a>
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
