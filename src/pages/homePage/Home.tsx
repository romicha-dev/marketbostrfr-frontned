// import CommonBanner from "@/components/reuseable/CommonBanner";
import FAQSection from "./FAQSection";
import HeroSection from "./HeroSection";
import ShippingCalculatorSection from "./ShippingCalculatorSection";
import ShippingRestriction from "./ShippingRestriction";
import VisionSection from "./VisionSection";
import WhyChooseSection from "./WhyChooseSection";
import { PricingSection } from "./PricingSection";
// import ImageComponent from "@/components/reuseable/ImageComponent";

const Home = () => {
  return (
    <div className="bg-white min-h-screen">
      <HeroSection />
      <ShippingCalculatorSection />
      <WhyChooseSection />
      <VisionSection />
      <PricingSection />
      
      <ShippingRestriction />
      <FAQSection />
      {/* <CommonBanner
        backgroundImage={"../../../public/images/home/howItWork.png"}
        title="How It Works"
        subtitle="Some simple ways to ship your packages to DOM-TOM territories."
        buttonText="Access Portal"
        buttonLink="/portal"
        overlayColor="[#1C60DF]"
      /> */}
      {/* <ImageComponent /> */}
    </div>
  );
};

export default Home;
