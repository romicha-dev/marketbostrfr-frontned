// // import howItWork from "/images/shipping/shippingBgPattern.png";
// import howItWork from "../../../public/images/home/howItWork.png";

// export default function CommonBanner() {
//   return (
//     <section
//       style={{
//         backgroundImage: `url("${howItWork}")`,
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//       }}
//       className="w-full bg-gray-900 text-white py-16 md:py-40 relative overflow-hidden"
//     >
//       <div className="absolute inset-0 bg-black opacity-60"></div>
//       {/* <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent"></div> */}
//       <div className="text-center text-white">
//         <h2 className="text-4xl font-semibold">How It Works</h2>
//         <p className="text-xl font-normal mt-6 mb-10">
//           Some simple ways to ship your packages to DOM-TOM territories.
//         </p>
//         <button className="border border-white px-8 py-3">Access Portal</button>
//       </div>
//     </section>
//   );
// }

// import React from "react";

// type CommonBannerProps = {
//   backgroundImage: string;
//   title: string;
//   subtitle: string;
//   buttonText: string;
//   buttonLink?: string; // Optional if you want to add a link for the button
// };

// const CommonBanner: React.FC<CommonBannerProps> = ({
//   backgroundImage,
//   title,
//   subtitle,
//   buttonText,
//   buttonLink = "#", // Default to a placeholder link
// }) => {
//   return (
//     <section
//       style={{
//         backgroundImage: `url("${backgroundImage}")`,
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//       }}
//       className="w-full bg-gray-900 text-white py-16 md:py-40 relative overflow-hidden"
//     >
//       <div className="absolute inset-0 bg-black opacity-60"></div>
//       <div className="text-center text-white">
//         <h2 className="text-4xl font-semibold">{title}</h2>
//         <p className="text-xl font-normal mt-6 mb-10">{subtitle}</p>
//         <a href={buttonLink}>
//           <button className="border border-white px-8 py-3">
//             {buttonText}
//           </button>
//         </a>
//       </div>
//     </section>
//   );
// };

// export default CommonBanner;

import React from "react";

type CommonBannerProps = {
  backgroundImage: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink?: string; // Optional if you want to add a link for the button
  overlayColor?: string;
};

const CommonBanner: React.FC<CommonBannerProps> = ({
  backgroundImage,
  title,
  subtitle,
  buttonText,
  buttonLink = "#", // Default to a placeholder link
  overlayColor = "black",
}) => {
  return (
    <section
      style={{
        backgroundImage: `url("${backgroundImage}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full bg-gray-900 text-white py-16 md:py-40 relative overflow-hidden md:rounded-4xl"
    >
      {/* Overlay (applied only to the background, not affecting the text) */}
      <div
        className={`absolute inset-0 bg-${overlayColor} opacity-50 md:rounded-4xl`}
      ></div>

      {/* Banner Content */}
      <div className="relative z-10 text-center text-white">
        <h2 className="text-4xl font-semibold">{title}</h2>
        <p className="text-xl font-normal mt-6 mb-10">{subtitle}</p>
        <a href={buttonLink}>
          <button className="border border-white px-8 py-3 hover:bg-white hover:text-gray-900 transition-all cursor-pointer">
            {buttonText}
          </button>
        </a>
      </div>
    </section>
  );
};

export default CommonBanner;
