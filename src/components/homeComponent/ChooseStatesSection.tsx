

// image path gulo apnar folder onujayi change kore niven
import user1 from "/images/users/user1.png";
import user2 from "/images/users/user2.png";
import user3 from "/images/users/user3.png";

const StatsSection = () => {
  return (
    <div className="w-full py-8 border-t border-gray-100 mt-10">
      {/* Grid setup: Mobile-e 1 column, Tablet-e 3 column */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 items-center">
        
        {/* Trusted Clients */}
        <div className="flex flex-col items-center md:items-start px-6">
          <div className="flex items-center gap-3 mb-2">
            {/* Avatar Stack */}
            <div className="flex -space-x-3 overflow-hidden">
              <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white object-cover" src={user1} alt="User" />
              <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white object-cover" src={user2} alt="User" />
              <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white object-cover" src={user3} alt="User" />
            </div>
            <span className="text-2xl font-bold text-gray-900 font-arima">4k+</span>
          </div>
          <p className="text-gray-600 text-sm font-roboto">Trusted clients</p>
        </div>

        {/* Packages Delivered */}
        <div className="flex flex-col items-center md:items-start px-6 md:border-l border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 font-arima mb-2">20k+</h2>
          <p className="text-gray-600 text-sm font-roboto">Packages Delivered</p>
        </div>

        {/* Success Rate */}
        <div className="flex flex-col items-center md:items-start px-6 md:border-l border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 font-arima mb-2">99.00%</h2>
          <p className="text-gray-600 text-sm font-roboto">Success Rate</p>
        </div>

      </div>
    </div>
  );
};

export default StatsSection;