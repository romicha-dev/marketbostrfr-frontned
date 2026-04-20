// import titleIcon from "/images/home/sectionTitleIcon.png";

// export default function SectionTitle() {
//   return (
//     <div>
//       <p className="text-lg font-normal text-[#164DB2] flex items-center justify-center mb-4 gap-2">
//         <img src={titleIcon} alt="" /> Clear vision
//       </p>
//       <h1 className="text-3xl font-semibold text-gray-900 mb-4">
//         What You Must Check Before Using Our Platform
//       </h1>
//       <p className="text-lg text-gray-600 mb-8">
//         These core principles guide everything we do at KayLeo
//       </p>
//     </div>
//   );
// }

type SectionTitleProps = {
  icon?: string;
  label?: string;
  title: string;
  subtitle?: string;
  subTitleWtidth?: string;
  align?: "center" | "left";
};

export default function SectionTitle({
  icon,
  label,
  title,
  subtitle,
  subTitleWtidth = "max-w-2xl",
  align = "center",
}: SectionTitleProps) {
  const alignment =
    align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <div className={`flex flex-col ${alignment}`}>
      {label && (
        <p className="text-lg font-normal  text-[#164DB2] flex items-center gap-2 mb-4">
          {icon && <img src={icon} alt="" />}
          {label}
        </p>
      )}

      <h1 className="text-3xl md:text-4xl font-semibold font-arima leading-snug md:leading-[150%] text-gray-900 mb-4">
        {title}
      </h1>

      {subtitle && (
        <p className={`text-lg text-gray-600 font-roboto font-normal leading-snug md:leading-[150%] ${subTitleWtidth} mb-8`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
