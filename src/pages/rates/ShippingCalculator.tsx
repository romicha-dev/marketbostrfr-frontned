import React, { useState } from 'react';

const ShippingCalculator: React.FC = () => {
  const [weight, setWeight] = useState('1.8');
  const [destination, setDestination] = useState('Martinique');
  const [result, setResult] = useState<null | {
    cost:string
    price: string;
    note: string;
  }>(null);

  const destinations = [
    'Martinique',
    'Guadeloupe',
    'Guyane',
    'Réunion',
    'Mayotte',
    'Nouvelle-Calédonie',
    'Polynésie française',
    'Saint-Pierre-et-Miquelon',
    'Wallis-et-Futuna',
    'Saint-Martin',
    'Saint-Barthélemy'
  ];

  const handleCalculate = () => {
    // fake calculation (frontend demo)
    const calculatedPrice = (Number(weight) * 12).toFixed(2);

    setResult({
       cost: `Estimated Cost`,
      price: `€${calculatedPrice}`,
      note: `Estimated shipping cost to ${destination} for ${weight} kg package.`,
    });
  };

  return (
    <div className="w-full  bg-[#F6F9FF] py-3 md:py-17.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-11">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-semibold font-arima text-black mb-2.5">
            Estimate delivery to overseas territories
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-black max-w-2xl mx-auto">
            Transparent, competitive pricing for shipping to all DOM-TOM territories.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-2xl shadow-lg p-5 lg:p-7.5">
          {/* Weight */}
          <div className="mb-6">
            <label className="text-sm text-black mb-3 block">
              Package Weight (kg)
            </label>
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-3 bg-blue-50 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Destination */}
          <div className="mb-8">
            <label className="text-sm text-black mb-3 block">
              Destination
            </label>
      <select
  value={destination}
  onChange={(e) => setDestination(e.target.value)}
  className="w-full px-4 py-3 pr-10 bg-blue-50 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none"
>
  {destinations.map((dest) => (
    <option key={dest}>{dest}</option>
  ))}
</select>

          </div>

          {/* Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleCalculate}
              className="px-7 py-3 bg-[#155DFC] text-white rounded-lg hover:bg-blue-700"
            >
              Calculate Quotes
            </button>
          </div>

          {/* ✅ Result Section */}
          {result && (
            <div className="bg-[#F0FDF4] border border-[#B9F8CF] rounded-xl p-6 text-left animate-fadeIn">
              <h1 className='text-[#4A5565] font-inter font-medium text-sm leading-[150%] mb-2 '>{result.cost}</h1>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#00A63E] mb-2">
                {result.price}
              </h3>
              <p className="text-[#6A7282] text-sm font-roboto font-normal leading-snug">
                {result.note}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingCalculator;
