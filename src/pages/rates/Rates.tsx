import  { useState } from 'react';
import CommonBanner from '@/components/reuseable/CommonBanner';
import ShippingCalculator from './ShippingCalculator';
import ShippingRestriction from '../homePage/ShippingRestriction';
import ShippingRatesDisplay from './ShippingRatesDisplay';
import PricingStructure from './PricingStructure';

const Rates = () => {

  const [isLoggedIn] = useState(false);

  // Banner image conditionally set
  const bannerImage = isLoggedIn 
    ? "images/contact/contactbanner2.svg" 
    : "images/rates/ratesbanner.svg";        

  return (
    <div className="min-h-screen">
      <div className="mt-10 px-2.5 md:px-10">
        <CommonBanner
          backgroundImage={bannerImage}
          title="Shipping Rates"
          subtitle="Transparent pricing based on weight, volume, and destination."
          buttonText="Access Portal"
          buttonLink="/login"
        />
      </div>

     
      <div className="text-center my-6">
        {/* <button 
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button> */}
      </div>

      <ShippingCalculator/>
      <ShippingRestriction/>
      <ShippingRatesDisplay/>
      <PricingStructure/>
    </div>
  )
}

export default Rates;







// import CommonBanner from '@/components/reuseable/CommonBanner'
// import ShippingCalculator from './ShippingCalculator'
// import ShippingRestriction from '../homePage/ShippingRestriction'
// import ShippingRatesDisplay from './ShippingRatesDisplay'
// import PricingStructure from './PricingStructure'

// const Rates = () => {
//   return (
//     <div className="min-h-screen ">
//       <div className="mt-10 px-2.5 md:px-10">
//         <CommonBanner
//           backgroundImage={"images/rates/ratesbanner.svg"}
//           title="Shipping Rates"
//           subtitle="Transparent pricing based on weight, volume, and destination."
//           buttonText="ccess  Portal"
//           buttonLink="/portal"
//         />
//       </div>
//       <ShippingCalculator/>
//       <ShippingRestriction/>
//       <ShippingRatesDisplay/>
//       <PricingStructure/>
//     </div>
//   )
// }

// export default Rates
