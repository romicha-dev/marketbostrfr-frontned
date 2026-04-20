import CommonBanner from "@/components/reuseable/CommonBanner"
import ContactSection from "./ContactSection"



const Contact = () => {
  return (
      <div className="min-h-screen ">
      <div className="mt-10 px-2.5 md:px-10">
        <CommonBanner
          backgroundImage={"images/about/storyImg1.jpg"}
          title="Contact Us"
          subtitle="We're here to help with all your shipping needs."
          buttonText="ccess  Portal"
          buttonLink="/login"
        />
      </div>
    <ContactSection/>
   
    </div>
  )
}

export default Contact
