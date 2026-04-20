
import DahboardCardSection from "@/components/AdminComponent/Dashbord/DashboardCardSection";
import DestinationChart from "@/components/AdminComponent/Dashbord/DistenitionChart";
import PackageOverview from "@/components/AdminComponent/Dashbord/PackageOverview";
import RecentPackages from "@/components/AdminComponent/Dashbord/RecentPackage";
import RevenueChart from "@/components/AdminComponent/Dashbord/RevenueChart";
import AdminTitleHeader from "@/components/reuseable/AdminTitleHeader";




const AdminDashboard = () => {
  return <div className=" ">
  
  <div>
    <AdminTitleHeader  title="Admin Dashboard"
  description="Overview of your logistics operations for December 2025">

    </AdminTitleHeader>
    <div>
      <DahboardCardSection/>
      <RevenueChart/>
<div className="flex flex-col lg:flex-row gap-6 mt-6 w-full">
  {/* RecentPackages - 2/3 width */}
  <div className="w-full lg:w-2/3">
    <RecentPackages />
  </div>

  {/* DestinationChart - 1/3 width */}
  <div className="w-full lg:w-1/3">
    <DestinationChart />
  </div>
</div>
<PackageOverview/>

    </div>
  </div>
  </div>;
};

export default AdminDashboard;
