import React, { useState } from "react";

interface HomePickUpFormProps {
  address: string;
  setAddress: (val: string) => void;
}

const HomePickUpForm: React.FC<HomePickUpFormProps> = ({ address, setAddress }) => {
  const [pickUpDate, setPickUpDate] = useState('');
  const [pickUpTime, setPickUpTime] = useState('');

  return (
    <div className="space-y-6">

      <div>
        <label className="block text-[#1C60DF] mb-2">
          Pick-up Address
        </label>
        <input
          type="text"
          placeholder="Enter pick-up address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-3 bg-blue-50 border border-blue-100 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-[#1C60DF] mb-2">
          Pick-up Date
        </label>
        <input
          type="date"
          value={pickUpDate}
          onChange={(e) => setPickUpDate(e.target.value)}
          className="w-full px-4 py-3 bg-blue-50 border border-blue-100 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-[#1C60DF] mb-2">
          Pick-up Time
        </label>
        <select
          value={pickUpTime}
          onChange={(e) => setPickUpTime(e.target.value)}
          className="w-full px-4 py-3 bg-blue-50 border border-blue-100 rounded-lg"
        >
          <option value="">Select Time</option>
          <option value="9AM-12PM">9AM – 12PM</option>
          <option value="12PM-4PM">12PM – 4PM</option>
          <option value="4PM-8PM">4PM – 8PM</option>
        </select>
      </div>

    </div>
  );
};

export default HomePickUpForm;
