import ClientCard from "@/components/AdminComponent/Client/ClientCard";
import ClientTable from "@/components/AdminComponent/Client/ClientTable";
import AdminTitleHeader from "@/components/reuseable/AdminTitleHeader";
import { Search } from "lucide-react";
import { useState } from "react";

export const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section className="w-full space-y-6">
      <AdminTitleHeader
        title="Client Management"
        description="Manage client accounts and information"
      />

      <div className="w-full">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, client number, or phone..."
            className="
              w-full pl-11 pr-4 py-3
              bg-blue-50 border border-blue-100
              rounded-full focus:outline-none
              focus:ring-2 focus:ring-blue-500
              text-gray-700
            "
          />
        </div>
      </div>

      <div className="space-y-6">
        <ClientCard />
        <ClientTable searchTerm={searchTerm} />
      </div>
    </section>
  );
};





// import ClientCard from "@/components/AdminComponent/Client/ClientCard";
// import ClientTable from "@/components/AdminComponent/Client/ClientTable";
// import AdminTitleHeader from "@/components/reuseable/AdminTitleHeader";
// import { Search } from "lucide-react";
// import { useState } from "react";

// export const Clients = () => {
//   const [searchTerm, setSearchTerm] = useState("");

//   return (
//     <section className="w-full space-y-6">
//       {/* Page Header */}
//       <AdminTitleHeader
//         title="Client Management"
//         description="Manage client accounts and information"
//       />

//       {/* Search Bar */}
//       <div className="w-full">
//         <div className="relative ">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search by ID, tracking number, or description..."
//             className="
//               w-full
//               pl-11
//               pr-4
//               py-3
//               bg-blue-50
//               border border-blue-100
//               rounded-full
//               focus:outline-none
//               focus:ring-2
//               focus:ring-blue-500
//               text-gray-700
//             "
//           />
//         </div>
//       </div>

//       {/* Client Summary + Table */}
//       <div className="space-y-6">
//         <ClientCard />
//         <ClientTable />
//       </div>
//     </section>
//   );
// };
