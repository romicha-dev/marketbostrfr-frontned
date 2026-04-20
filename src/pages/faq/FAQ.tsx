import CommonBanner from "@/components/reuseable/CommonBanner"
import PopularTopic from "./PopularTopic"
import FAQAccordion from "./FaqAccourdion"


const FAQ = () => {
  return (
     <div className="min-h-screen ">
      <div className="mt-10 px-2.5 md:px-10">
        <CommonBanner
          backgroundImage={"images/faq/faqbanner.svg"}
          title="Frequently Asked Questions"
          subtitle="Answers to help you feel informed and confident before your visit."
          buttonText="ccess  Portal"
          buttonLink="/contact"
        />
      </div>
        <PopularTopic/>
        <FAQAccordion/>
    </div>
  )
}

export default FAQ
