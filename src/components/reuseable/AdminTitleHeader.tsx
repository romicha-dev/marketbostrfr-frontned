

interface AdminTitleHeaderProps {
  title: string;
  description?: string;
  align?: "left" | "center";
}

const AdminTitleHeader: React.FC<AdminTitleHeaderProps> = ({
  title, 
  description, 
  align = "left" 
}) => {
  return (
    <div className={`mb-6 ${align === "center" ? "text-center" : "text-left"}`}>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold font-roboto leading-[150%] text-gray-900 mb-1.5">
        {title}
      </h2>
      <p className="text-sm sm:text-base text-gray-700 font-roboto font-normal leading-snug md:leading-[150%] max-w-xl">
        {description}
      </p>
    </div>
  );
};

export default AdminTitleHeader;
