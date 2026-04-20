import CommonBanner from "@/components/reuseable/CommonBanner";
import OurStory from "./OurStory";
import CoreValues from "./CoreValues";
import OurCommitment from "./OurCommitment";
import CommonWrapper from "@/common/CommonWrapper";

const About = () => {
  return (
    <div className="">
      <div className="mt-10 px-3 md:px-10">
        <CommonBanner
          backgroundImage={"../../../public/images/about/aboutBanner.png"}
          title="Dedicated to the Clarity of Every Vision"
          subtitle="Your trusted partner for international shipping to DOM-TOM territories since 2020."
          buttonText="Access Portal"
          buttonLink="/login"
        />
      </div>
      <CommonWrapper>
      <OurStory />
      <CoreValues />
      <OurCommitment />
      </CommonWrapper>
    </div>
  );
};

export default About;
