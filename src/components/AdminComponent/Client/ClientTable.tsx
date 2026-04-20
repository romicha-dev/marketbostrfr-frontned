import { useState } from "react";
import { DataTable } from "@/components/reuseable/TableData";
import { Eye } from "lucide-react";
import ClientDetailsModal from "./ClientDetailsModal";
import { Client, useGetClientsQuery } from "@/redux/features/admin/clientApi";


interface ClientTableProps {
  searchTerm?: string;
}

const ClientTable = ({ searchTerm = "" }: ClientTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const { data, isLoading, isError } = useGetClientsQuery({ page: 1, limit: 100 });

  const clients = data?.data ?? [];

  // Frontend search filtering
  const filteredClients = clients.filter((client) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    return (
      client.fullName.toLowerCase().includes(term) ||
      client.email.toLowerCase().includes(term) ||
      client.clientNumber.toLowerCase().includes(term) ||
      client.phone.toLowerCase().includes(term)
    );
  });

  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
  };

  const clientColumns = [
    {
      header: "Client",
      key: "fullName",
      render: (item: Client) => (
        <div>
          <div className="text-sm sm:text-base font-normal font-roboto text-gray-900 leading-[150%]">
            {item.fullName}
          </div>
          <div className="text-sm sm:text-base font-normal font-roboto text-gray-500 leading-[150%]">
            {item.email}
          </div>
        </div>
      ),
    },
    {
      header: "Client Number",
      key: "clientNumber",
      render: (item: Client) => (
        <span className="text-sm sm:text-base font-normal font-roboto text-gray-500 leading-[150%]">
          {item.clientNumber}
        </span>
      ),
    },
    {
      header: "Contact",
      key: "phone",
      render: (item: Client) => (
        <span className="text-sm sm:text-base font-normal font-roboto text-gray-500 leading-[150%]">
          {item.phone}
        </span>
      ),
    },
    {
      header: "Total Spent",
      key: "totalSpent",
      render: (item: Client) => (
        <span className="text-sm sm:text-base font-medium font-roboto text-gray-900 leading-[150%]">
          {item.totalSpent}
        </span>
      ),
    },
    {
      header: "Status",
      key: "status",
      render: (item: Client) => (
        <span
          className={`px-3.5 py-1.5 rounded-full text-sm sm:text-base font-normal font-roboto leading-[150%] ${
            item.status === "Active"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      header: "Action",
      key: "action",
      render: (item: Client) => (
        <button
          onClick={() => handleViewClient(item)}
          className="bg-[#1C60DF] text-white px-4 py-2 rounded-[8px] hover:bg-[#1557CC] transition-colors flex items-center gap-2 text-sm sm:text-base font-normal font-roboto leading-[150%]"
        >
          <Eye className="w-4 h-4" />
          View
        </button>
      ),
    },
  ];

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (isError) {
    return (
      <div className="mt-6 flex items-center justify-center py-12 text-red-500">
        Failed to load clients. Please try again.
      </div>
    );
  }

  return (
    <>
      <div className="mt-6">
        <DataTable
          columns={clientColumns}
          data={filteredClients}
          itemsPerPage={5}
          emptyMessage={
            searchTerm
              ? `No clients found matching "${searchTerm}"`
              : "No clients available"
          }
        />
      </div>

      <ClientDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        clientData={selectedClient}
      />
    </>
  );
};

export default ClientTable;








// import { useState } from "react";
// import { DataTable } from "@/components/reuseable/TableData";

// import { Eye } from "lucide-react";
// import ClientDetailsModal from "./ClientDetailsModal";

// // Define a type for a client
// interface Client {
//   name: string;
//   email: string;
//   clientNumber: string;
//   contact: string;
//   totalPackages: number;
//   inTransit: number;
//   totalSpent: string;
//   status: 'Active' | 'Inactive';
//   address?: string;
//   registrationDate?: string;
// }

// const ClientTable = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedClient, setSelectedClient] = useState<Client | null>(null);

//   const clientsData: Client[] = [
//     {
//       name: 'Jean Dupont',
//       email: 'jean.dupont@email.com',
//       clientNumber: 'KYL-2025-123456',
//       contact: '+596 696 12 34 56',
//       totalPackages: 24,
//       inTransit: 2,
//       totalSpent: '€845.50',
//       status: 'Active',
//       address: '15 Rue des Flamboyants, 97200 Fort-de-France, Martinique',
//       registrationDate: '2025-01-15'
//     },
//     {
//       name: 'Sarah Johnson',
//       email: 'sarah.johnson@email.com',
//       clientNumber: 'KYL-2025-123457',
//       contact: '+596 696 12 34 57',
//       totalPackages: 18,
//       inTransit: 3,
//       totalSpent: '€645.30',
//       status: 'Active',
//       address: '25 Avenue des Roses, 97200 Fort-de-France, Martinique',
//       registrationDate: '2025-01-10'
//     },
//     {
//       name: 'Mike Anderson',
//       email: 'mike.anderson@email.com',
//       clientNumber: 'KYL-2025-123458',
//       contact: '+596 696 12 34 58',
//       totalPackages: 32,
//       inTransit: 1,
//       totalSpent: '€1245.80',
//       status: 'Inactive',
//       address: '30 Boulevard Central, 97200 Fort-de-France, Martinique',
//       registrationDate: '2024-12-20'
//     },
//     {
//       name: 'Emma Wilson',
//       email: 'emma.wilson@email.com',
//       clientNumber: 'KYL-2025-123459',
//       contact: '+596 696 12 34 59',
//       totalPackages: 15,
//       inTransit: 0,
//       totalSpent: '€432.20',
//       status: 'Active',
//       address: '42 Rue de la Liberté, 97200 Fort-de-France, Martinique',
//       registrationDate: '2025-01-05'
//     },
//     {
//       name: 'David Brown',
//       email: 'david.brown@email.com',
//       clientNumber: 'KYL-2025-123460',
//       contact: '+596 696 12 34 60',
//       totalPackages: 28,
//       inTransit: 4,
//       totalSpent: '€987.60',
//       status: 'Active',
//       address: '18 Place de la Savane, 97200 Fort-de-France, Martinique',
//       registrationDate: '2024-12-15'
//     },
//     {
//       name: 'Lisa Chen',
//       email: 'lisa.chen@email.com',
//       clientNumber: 'KYL-2025-123461',
//       contact: '+596 696 12 34 61',
//       totalPackages: 21,
//       inTransit: 2,
//       totalSpent: '€756.40',
//       status: 'Active',
//       address: '55 Route de Didier, 97200 Fort-de-France, Martinique',
//       registrationDate: '2025-01-01'
//     },
//   ];

//   // Handle view button click
//   const handleViewClient = (client: Client) => {
//     setSelectedClient(client);
//     setIsModalOpen(true);
//   };

//   // Handle modal close
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedClient(null);
//   };

//   const clientColumns = [
//     {
//       header: 'Client',
//       key: 'name',
//       render: (item: Client) => (
//         <div>
//           <div className="text-sm sm:text-base font-normal font-roboto text-gray-900 leading-[150%]">
//             {item.name}
//           </div>
//           <div className="text-sm sm:text-base font-normal font-roboto text-gray-500 leading-[150%]">
//             {item.email}
//           </div>
//         </div>
//       )
//     },
//     {
//       header: 'Client Number',
//       key: 'clientNumber',
//       render: (item: Client) => (
//         <span className="text-sm sm:text-base font-normal font-roboto text-gray-500 leading-[150%]">
//           {item.clientNumber}
//         </span>
//       )
//     },
//     {
//       header: 'Contact',
//       key: 'contact',
//       render: (item: Client) => (
//         <span className="text-sm sm:text-base font-normal font-roboto text-gray-500 leading-[150%]">
//           {item.contact}
//         </span>
//       )
//     },
//     {
//       header: 'Packages',
//       key: 'packages',
//       render: (item: Client) => (
//         <div>
//           <div className="text-sm sm:text-base font-normal font-roboto text-gray-900 leading-[150%]">
//             {item.totalPackages} total
//           </div>
//           <div className="text-sm sm:text-base font-normal font-roboto text-[#1C60DF] leading-[150%]">
//             {item.inTransit} in transit
//           </div>
//         </div>
//       )
//     },
//     {
//       header: 'Total Spent',
//       key: 'totalSpent',
//       render: (item: Client) => (
//         <span className="text-sm sm:text-base font-medium font-roboto text-gray-900 leading-[150%]">
//           {item.totalSpent}
//         </span>
//       )
//     },
//     {
//       header: 'Status',
//       key: 'status',
//       render: (item: Client) => (
//         <span className={`px-3.5 py-1.5 rounded-full text-sm sm:text-base font-normal font-roboto leading-[150%] ${
//           item.status === 'Active' 
//             ? 'bg-[#00A63E] text-white' 
//             : 'bg-gray-200 text-gray-700'
//         }`}>
//           {item.status}
//         </span>
//       )
//     },
//     {
//       header: 'Action',
//       key: 'action',
//       render: (item: Client) => (
//         <button 
//           onClick={() => handleViewClient(item)}
//           className="bg-[#1C60DF] text-white px-4 py-2 rounded-[8px] hover:bg-[#1557CC] transition-colors flex items-center gap-2 text-sm sm:text-base font-normal font-roboto leading-[150%]"
//         >
//           <Eye className="w-4 h-4" />
//           View
//         </button>
//       )
//     }
//   ];

//   return (
//     <>
//       <div className="mt-6">
//         <DataTable 
//           columns={clientColumns} 
//           data={clientsData} 
//           itemsPerPage={5} 
//         />
//       </div>

//       {/* Client Details Modal */}
//       <ClientDetailsModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         clientData={selectedClient}
//       />
//     </>
//   );
// };

// export default ClientTable;