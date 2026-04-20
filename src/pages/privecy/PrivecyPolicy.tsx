import CommonBanner from "@/components/reuseable/CommonBanner";
import PersonalInfo from "./PersonalInfo";

const PrivacyPolicy = () => {
  return (
     <div className="min-h-screen ">
      <div className="mt-10 px-2.5 md:px-10">
        <CommonBanner
          backgroundImage={"images/contact/contactbanner2.svg"}
          title="Privacy Policy "
          subtitle="We're here to help with all your shipping needs."
          buttonText="Access Portal"
          buttonLink="/login"
        />
      </div>
      <PersonalInfo/>
    </div>
  );
};

export default PrivacyPolicy;
