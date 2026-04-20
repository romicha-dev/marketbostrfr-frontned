import CommonWrapper from "@/common/CommonWrapper";
import FlammableLequide from "/images/home/FlammableLequide.png";
import ToxicMaterial from "/images/home/ToxicMaterial.png";
import Explosive from "/images/home/Explosive.png";
import Firearm from "/images/home/Firearm.png";
import Corrosive from "/images/home/Corrosive.png";
import Animal from "/images/home/Animal.png";
import Poison from "/images/home/Poison.png";
import Aerosol from "/images/home/Aerosol.png";

export default function ShippingRestriction() {
  return (
    <div className="bg-[#FDFDFD] py-10">
      <CommonWrapper>
        <h3 className="text-base sm:text-lg md:text-xl leading-snug md:leading-[150%] font-arima  font-semibold mb-12 text-center">
          Shipping Restrictions Apply to French Overseas Departments and
          Territories
        </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-8">
  <div>
    <img src={FlammableLequide} alt="" className="w-20 h-20 mb-4 mx-auto" />
    <p className="text-center">Flammable Lequide</p>
  </div>
  <div>
    <img src={ToxicMaterial} alt="" className="w-20 h-20 mb-4 mx-auto" />
    <p className="text-center">Toxic Material</p>
  </div>
  <div>
    <img src={Explosive} alt="" className="w-20 h-20 mb-4 mx-auto" />
    <p className="text-center">Explosive</p>
  </div>
  <div>
    <img src={Firearm} alt="" className="w-20 h-20 mb-4 mx-auto" />
    <p className="text-center">Firearm</p>
  </div>
  <div>
    <img src={Corrosive} alt="" className="w-20 h-20 mb-4 mx-auto" />
    <p className="text-center">Corrosive</p>
  </div>
  <div>
    <img src={Animal} alt="" className="w-20 h-20 mb-4 mx-auto" />
    <p className="text-center">Animal</p>
  </div>
  <div>
    <img src={Poison} alt="" className="w-20 h-20 mb-4 mx-auto" />
    <p className="text-center">Poison</p>
  </div>
  <div>
    <img src={Aerosol} alt="" className="w-20 h-20 mb-4 mx-auto" />
    <p className="text-center">Aerosol</p>
  </div>
</div>

      </CommonWrapper>
    </div>
  );
}
