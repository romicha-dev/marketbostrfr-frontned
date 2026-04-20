import CommonBanner from "@/components/reuseable/CommonBanner"

import DeliveryTimeline from "./DeliveryTimeLine"
import Order from "./Order"


const HowItWorks = () => {
  return (
      <div className="min-h-screen ">
      <div className="mt-10 px-2.5 md:px-10">
        <CommonBanner
          backgroundImage={"images/howitWorks/workbanner.svg"}
          title="How It Works"
          subtitle="Some simple ways to ship your packages to DOM-TOM territories."
          buttonText="ccess  Portal"
          buttonLink="/login"
        />
      </div>

      <Order/>
      <DeliveryTimeline/>
    </div>
  )
}

export default HowItWorks
