import type { FC, ComponentType } from "react";

interface AdminCardSectionProps {
  icon: ComponentType<{ className?: string }>;
  iconBgColor?: string;
  iconColor?: string;
  value: string | number;
  label: string;
  percentage?: number; // Made optional
  isPositive?: boolean;
    valueColor?: string;   // নতুন prop
  labelColor?: string;
}

export const AdminCardSection: FC<AdminCardSectionProps> = ({
  icon: Icon,
  iconBgColor = "bg-blue-100",
  iconColor = "text-blue-600",
  value,
  label,
    valueColor,
  labelColor,
  percentage,
  isPositive = true,
}) => {
  return (
    <div className="bg-white rounded-[8px] border border-[#DDE7FA] p-5 hover:shadow-md transition-shadow">
      {/* Header: Icon and Percentage (Conditional) */}
      <div className="flex items-start justify-between mb-11">
        <div className={`${iconBgColor} p-3 rounded-lg`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>

        {/* Only show percentage if it is provided */}
        {percentage !== undefined && (
          <span
            className={`text-sm font-semibold ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? "+" : ""}
            {percentage}%
          </span>
        )}
      </div>

      {/* Value and Label */}
   <div>
        <div
          className="text-xl sm:text-2xl md:text-3xl font-semibold font-roboto text-[#101828] leading-snug md:leading-[150%] mb-2"
          style={{ color: valueColor || undefined }} // valueColor না থাকলে default color ব্যবহার হবে
        >
          {value}
        </div>
        <div
          className="text-xs font-normal leading-snug font-inter text-gray-500"
          style={{ color: labelColor || undefined }} // labelColor না থাকলে default gray-500 color
        >
          {label}
        </div>
      </div>

    </div>
  );
};