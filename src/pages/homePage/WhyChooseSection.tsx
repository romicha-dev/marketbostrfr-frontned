import FeatureItem from "@/components/homeComponent/FeatureItem";
import StatCard from "@/components/homeComponent/StatCard";
import heroImg1 from "/images/home/whyChoose.jpg";
import heroImg2 from "../../../public/images/home/WhyChooseImg.png";
import avatar from "/images/home/avatar1.svg";
import avatar2 from "/images/home/avatar2.svg";
import avatar3 from "/images/home/avatar3.svg";
import titleIcon from "/images/home/sectionTitleIcon.png";
import CommonWrapper from "@/common/CommonWrapper";

const features = [
  {
    icon: "🚚",
    title: "Fast Delivery",
    description: "Quick shipping times from France to DOM-TOM territories",
  },
  {
    icon: "🌍",
    title: "DOM-TOM-specific benefits",
    description: "Your packages are insured and tracked throughout the journey",
  },
  {
    icon: "💰",
    title: "Pricing advantages",
    description: "Affordable pricing with transparent quotes",
  },
  {
    icon: "✨",
    title: "Simplicity & Transparency",
    description: "Real-time tracking from pickup to delivery",
  },
];
//  const statImages = [
//   "/images/home/avatar1.svg",
//   "/images/home/avatar1.svg",
//   "/images/home/avatar1.svg",
// ];

const stats = [
  { imgs: [avatar3, avatar2, avatar], value: "1k+", label: "Trusted clients" }, 
  { value: "20k+", label: "Packages Delivered" },
  { value: "99.00%", label: "Success Rate" },
];


export default function WhyChooseSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <CommonWrapper>
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Images Stack */}
          <div className="relative flex justify-center lg:justify-start items-center">
            {/* Background image with rounded corners */}
            <div className="relative w-full  lg:w-96 h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg mb-8 lg:mb-0">
              <img
                src={heroImg2}
                alt="Hands with packing tape"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlay image */}
            <div className="absolute
      left-1/2 
      -translate-x-1/2 
      bottom-[-40px]
      sm:right-[-40px]
      sm:translate-x-0
      sm:bottom-[40px]
      w-[180px]
      h-[150px]
      
      sm:w-[220px]
      sm:h-[200px]
      lg:w-[260px]
      lg:h-[250px]
      overflow-hidden
      rounded-[14px]
      shadow-lg
      z-10
      border-[6px]
      border-white
      bg-white">
              <img
                src={heroImg1}
                alt="Delivery person with package"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Experience Badge */}
            <div className="absolute top-8 lg:bottom-4 mx-3  font-arima  lg:top-80 left-1/2 transform -translate-x-1/2 sm:translate-x-0 sm:left-1/2 lg:left-0 bg-yellow-400 text-gray-900 px-4 md:px-6 py-2 md:py-4 rounded-lg font-semibold leading-snug md:leading-[150%] text-sm md:text-base shadow-lg whitespace-nowrap">
              12+ Years Of  Experience
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col gap-8">
            {/* Header */}
            <div>
              <span className="flex items-center gap-2 text-[#164DB2] font-normal leading-snug md:leading-[150%]  text-sm md:text-lg tracking-wide mb-4">
                <img src={titleIcon} alt="icon" className="w-5 h-5 md:w-6 md:h-6" /> 
                Why we are the best
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold font-arima text-black mt-6 mb-8 leading-tight md:leading-[150%]">
                Why choose Kayleo?
              </h2>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <FeatureItem
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>

            {/* Stats */}
  {/* Stats */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
  {stats.map((stat, index) => (
    <StatCard 
      key={index} 
      imgs={stat.imgs} 
      value={stat.value} 
      label={stat.label} 
   
      layout={index === 0 ? "row" : "column"} 
    />
  ))}
</div>

          </div>
        </div>
      </div>
      </CommonWrapper>
    </section>
  );
}

