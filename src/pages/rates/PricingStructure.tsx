import CommonWrapper from '@/common/CommonWrapper';
import React from 'react';


interface PricingCardProps {
  title: string;
  description: string;
  details?: string[];
  footer?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, description, details, footer }) => (
  <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm flex flex-col h-full transition-hover hover:shadow-md">
    <div className="mb-4">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18.3333 36.2168C18.8401 36.5094 19.4149 36.6634 20 36.6634C20.5851 36.6634 21.1599 36.5094 21.6667 36.2168L33.3333 29.5502C33.8396 29.2579 34.26 28.8376 34.5526 28.3316C34.8451 27.8255 34.9994 27.2514 35 26.6668V13.3335C34.9994 12.749 34.8451 12.1748 34.5526 11.6688C34.26 11.1627 33.8396 10.7424 33.3333 10.4502L21.6667 3.7835C21.1599 3.49093 20.5851 3.33691 20 3.33691C19.4149 3.33691 18.8401 3.49093 18.3333 3.7835L6.66667 10.4502C6.16044 10.7424 5.73997 11.1627 5.44744 11.6688C5.1549 12.1748 5.0006 12.749 5 13.3335V26.6668C5.0006 27.2514 5.1549 27.8255 5.44744 28.3316C5.73997 28.8376 6.16044 29.2579 6.66667 29.5502L18.3333 36.2168Z" stroke="#155DFC" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20 36.6667V20" stroke="#155DFC" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5.48242 11.6665L19.9991 19.9998L34.5158 11.6665" stroke="#155DFC" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12.5 7.1167L27.5 15.7" stroke="#155DFC" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    </div>
    <h3 className="text-[#101828] font-normal font-roboto text-base sm:text-lg md:text-xl mb-3 leading-[150%]">{title}</h3>
    <p className="text-[#4A5565] font-roboto text-sm sm:text-base leading-[150%] font-normal mb-6">
      {description}
    </p>
    
    {details && (
      <div className="space-y-2 mb-6 mt-auto">
        {details.map((item, idx) => (
          <p key={idx} className="text-xs sm:text-base font-roboto text-[#364153] font-normal leading-[150%]">
            {item}
          </p>
        ))}
      </div>
    )}
    
    {footer && (
      <p className="text-xs text-gray-400 font-roboto mt-auto pt-4 ">
        {footer}
      </p>
    )}
  </div>
);

const PricingStructure: React.FC = () => {
  const pricingData = [
    {
      title: "Weight-Based",
      description: "Base rate of €2.50 per kilogram for all packages.",
      footer: "Minimum charge: 1kg"
    },
    {
      title: "Dimension-Based",
      description: "Base rate of €2.50 per kilogram for all packages.",
      footer: "Minimum charge: 1kg"
    },
    {
      title: "Destination",
      description: "Variable rates based on final destination territory.",
      details: [
        "Martinique & Guadeloupe: x1.2",
        "Guyane: x1.5",
        "Réunion & Mayotte: x1.8"
      ]
    },
    {
      title: "Additional Services",
      description: "", // empty because of special list style in image
      details: [
        "Package consolidation: €5 per consolidation",
        "Repackaging service: €3 per package",
        "Photography service: €2 per package",
        "Express processing: +50% of base rate",
        "Extended storage: €1 per day (beyond 30 days)"
      ]
    }
  ];

  return (
    <CommonWrapper>
      <div className="w-full bg-gray-50/50 py-16 ">
      <div className="">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-[150%] font-arima text-[#0A0A0A]">Pricing Structure</h2>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingData.map((card, index) => (
            <PricingCard 
              key={index}
              title={card.title}
              description={card.description}
              details={card.details}
              footer={card.footer}
            />
          ))}
        </div>
      </div>
    </div>
    </CommonWrapper>
  );
};

export default PricingStructure;