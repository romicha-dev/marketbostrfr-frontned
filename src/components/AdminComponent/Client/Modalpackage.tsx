import { PackageResponse, useGetPackagesQuery } from '@/redux/features/clients/packageApi';
import React from 'react';


interface Props {
  clientId: string;
}

const PackageCard: React.FC<{ pkg: PackageResponse }> = ({ pkg }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
    <div className="text-sm sm:text-base font-normal font-roboto leading-[150%] text-[#155DFC] mb-1.5">
      {pkg.packageCode}
    </div>
    <div className="flex items-start justify-between mb-3">
      <div className="text-sm md:text-base font-normal font-roboto leading-[150%] text-[#101828]">
        {pkg.description}
      </div>
      <span className="bg-[#1C60DF] text-white px-3 py-1 rounded-full text-xs font-inter leading-[150%]">
        {pkg.status}
      </span>
    </div>
    <div className="text-sm md:text-base font-normal font-roboto leading-[150%] text-[#6A7282]">
      {pkg.carrier} — {pkg.destination}
    </div>
    <div className="text-xs font-roboto text-gray-400 mt-1">
      {new Date(pkg.createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })}
    </div>
  </div>
);

const PackagesTab: React.FC<Props> = ({ clientId }) => {
  const { data, isLoading, isError } = useGetPackagesQuery({ page: 1, limit: 100 });

  // Frontend filter by clientId
  const packages = data?.data.filter((pkg) => pkg.clientId === clientId) ?? [];

  if (isLoading) return (
    <p className="text-sm text-gray-400 font-roboto">Loading packages...</p>
  );

  if (isError) return (
    <p className="text-sm text-red-400 font-roboto">Failed to load packages.</p>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-base sm:text-lg md:text-xl font-normal font-roboto leading-[150%] text-[#0A0A0A]">
        Package History
      </h3>
      {packages.length === 0 ? (
        <p className="text-sm text-gray-400 font-roboto">No packages found for this client.</p>
      ) : (
        <div className="space-y-3">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PackagesTab;




// import React from 'react';

// interface PackageItem {
//   id: string;
//   company: string;
//   date: string;
//   status: string;
// }

// interface Props {
//   packages: PackageItem[];
// }

// const PackageCard: React.FC<{ pkg: PackageItem }> = ({ pkg }) => (
//   <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
//     <div className="text-sm sm:text-base font-normal font-roboto leading-[150%]  text-[#155DFC] mb-1.5">{pkg.id}</div>
//     <div className="flex items-start justify-between mb-3">
//       <div>
        
//         <div className="text-sm md:text-base font-normal  font-roboto leading-[150%]  text-[#101828] mb-1.5">{pkg.company}</div>
//       </div>
//       <span className="bg-[#1C60DF] text-white px-3 py-1 rounded-full text-xs  font-inter leading-[150%] ">{pkg.status}</span>
//     </div>
//     <div className="text-sm md:text-base font-normal  font-roboto leading-[150%]  text-[#6A7282]">{pkg.date}</div>
//   </div>
// );

// const PackagesTab: React.FC<Props> = ({ packages }) => (
//   <div className="space-y-4">
//     <h3 className="text-base sm:text-lg md:text-xl  font-normal  font-roboto leading-[150%]  text-[#0A0A0A]">Package History</h3>
//     <div className="space-y-3">
//       {packages.map((pkg, index) => (
//         <PackageCard key={index} pkg={pkg} />
//       ))}
//     </div>
//   </div>
// );

// export default PackagesTab;
