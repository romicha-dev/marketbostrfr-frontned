import CommonBanner from "@/components/reuseable/CommonBanner";
import OurService from "./OurService";
import AirFreightService from "./AirFreightService";
import ShippingRestriction from "../homePage/ShippingRestriction";
import CommonWrapper from "@/common/CommonWrapper";

const Services = () => {
  return (
    <div className="min-h-screen ">
      <div className="mt-10 px-2.5 md:px-10">
        <CommonBanner
          backgroundImage={"images/services/servicesBanner.svg"}
          title="Our Services"
          subtitle="Comprehensive logistics solutions tailored for DOM-TOM shipping needs."
          buttonText="Access Portal"
          buttonLink="/login"
        />
      </div>
      <CommonWrapper>
      <OurService />
      <AirFreightService />
      <div className="bg-[#1D61DF0F]">
        <ShippingRestriction />
      </div>
      </CommonWrapper>
    </div>
  );
};

export default Services;
