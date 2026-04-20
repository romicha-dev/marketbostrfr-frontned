interface StatCardProps {
  imgs?: string[];
  value: string;
  label: string;
  layout?: "row" | "column";
}

export default function StatCard({ imgs, value, label, layout = "column" }: StatCardProps) {
  return (
    <div className="text-center p-3 md:p-4 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors relative flex flex-col items-center justify-center">
      
      {/* Row Layout: Image and Value side by side */}
      {layout === "row" ? (
        <div className="flex items-center justify-center gap-2 mb-2 w-full">
          {imgs && imgs.length > 0 && (
            <div className="flex -space-x-3 md:-space-x-4">
              {imgs.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt={`img-${index}`}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-white"
                  style={{ zIndex: index }}
                />
              ))}
            </div>
          )}
          <span className="font-semibold font-arima text-lg md:text-2xl text-gray-900 whitespace-nowrap">
            {value}
          </span>
        </div>
      ) : (
        /* Column Layout: Image on top, Value below */
        <div className="flex flex-col items-center">
          {imgs && imgs.length > 0 && (
            <div className="flex justify-center -space-x-3 md:-space-x-4 mb-2">
              {imgs.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt={`img-${index}`}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-white"
                />
              ))}
            </div>
          )}
          <div className="font-semibold font-arima text-lg md:text-2xl text-gray-900 mb-2">
            {value}
          </div>
        </div>
      )}

      {/* Label always at bottom */}
      <p className="text-xs md:text-sm font-roboto text-gray-600 leading-tight">
        {label}
      </p>
    </div>
  );
}