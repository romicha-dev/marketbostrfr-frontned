/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Calendar, Package, MapPin,  Clock } from 'lucide-react';

export default function PackageBookingForm() {
  const [packageType, setPackageType] = useState('');
  const [formData, setFormData] = useState({
    date: '',
    timeSlot: '',
    packages: '1',
    description: '',
    additionalNotes: '',
    priority: 'Fast delivery',
    // Drop-off Service fields
    fullAddress: '',
    postalCode: '',
    contactPhone: '',
    // Home Pickup fields
    pickupAddress: '',
    pickupPostal: '',
    pickupStreet: '',
    pickupContactPhone: '',
  });

  const packageTypes = [
    { value: 'drop-off', label: 'Drop-off Service' },
    { value: 'home-pickup', label: 'Home Pick-up Service' },
  ];

  const timeSlots = [
    '08:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '12:00 PM - 2:00 PM',
    '2:00 PM - 4:00 PM',
    '4:00 PM - 6:00 PM',
  ];

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 // handleSubmit ফাংশনটি এভাবে লিখুন:
const handleSubmit = () => {
  if (!formData.date || !formData.timeSlot) {
    alert("Please select date and time slot");
    return;
  }

  const newDropOff = {
    id: `DRP-2026-${Math.floor(100 + Math.random() * 900)}`, 
    status: 'Upcoming',
    statusColor: 'blue',
    order: formData.description || (packageType === 'drop-off' ? 'Drop-off Appointment' : 'Home Pickup'),
    weight: packageType === 'drop-off' ? `${formData.packages} packages` : '📦 Pickup Scheduled',
    destination: formData.timeSlot,
    carrier: `🕝 ${formData.date}`,
    price: packageType === 'home-pickup' ? '💶 10.00' : '💶 0.00', 
    trackingNumber: 'TRK-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    blNumber: 'PENDING',
    date: formData.date,
    clientNumber: 'KYL-2026-USER'
  };


  const existingData = JSON.parse(localStorage.getItem('dropoff_packages') || '[]');
  const updatedData = [newDropOff, ...existingData];
  localStorage.setItem('dropoff_packages', JSON.stringify(updatedData));

  alert(`Package booked successfully!\nType: ${packageType}`);

};

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Section - Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 space-y-6">
          
          {/* Important Notice */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <p className="text-sm text-yellow-800 font-medium mb-1">Important</p>
            <p className="text-xs text-yellow-700">
              Please arrive within your selected time slot {packageType === 'drop-off' ? 'during your drop-off' : 'during your home pickup'} and bring a valid ID matching your Kiyo.ai account and your confirmation email.
            </p>
          </div>

          {/* Package Type Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Package Type
            </label>
            <select
              value={packageType}
              onChange={(e) => setPackageType(e.target.value)}
              className="w-full px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select package type</option>
              {packageTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Show form only when package type is selected */}
          {packageType && (
            <>
              {/* Select Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Pick a date"
                  />
                  <Calendar className="absolute right-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Slot
                </label>
                <select
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">08:11 am</option>
                  {timeSlots.map((slot, idx) => (
                    <option key={idx} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              {/* DROP-OFF SERVICE FORM */}
              {packageType === 'drop-off' && (
                <>
                  {/* Number of Packages */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Packages <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="packages"
                      value={formData.packages}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>

                  {/* Package Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Package Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="e.g., Electronics - Headphones and charger"
                      className="w-full px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                      rows={3}
                    />
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      placeholder="This section is optional for additional information"
                      className="w-full px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                      rows={3}
                    />
                  </div>

                  {/* Priority Delivery */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority Delivery
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option>Fast delivery</option>
                      <option>Standard delivery</option>
                      <option>Economy delivery</option>
                    </select>
                  </div>

                  {/* Delivery Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Address
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="fullAddress"
                        value={formData.fullAddress}
                        onChange={handleInputChange}
                        placeholder="Enter Address"
                        className="px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="Enter your postal code"
                        className="px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Enter your additional address"
                        className="px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none md:col-span-2"
                      />
                      <input
                        type="tel"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        placeholder="+33 12 34 56 78"
                        className="px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none md:col-span-2"
                      />
                    </div>
                  </div>

                  {/* Declare Package Button */}
                  <button 
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <Package className="w-5 h-5" />
                    Declare Package
                  </button>
                </>
              )}

              {/* HOME PICKUP SERVICE FORM */}
              {packageType === 'home-pickup' && (
                <>
                  {/* Pick-up Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pick-up Address
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="pickupAddress"
                        value={formData.pickupAddress}
                        onChange={handleInputChange}
                        placeholder="Enter Address"
                        className="px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <input
                        type="text"
                        name="pickupPostal"
                        value={formData.pickupPostal}
                        onChange={handleInputChange}
                        placeholder="Enter your postal code"
                        className="px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <input
                        type="text"
                        name="pickupStreet"
                        value={formData.pickupStreet}
                        onChange={handleInputChange}
                        placeholder="Enter your additional address"
                        className="px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none md:col-span-2"
                      />
                      <div className="md:col-span-2">
                        <label className="block text-xs text-gray-600 mb-1">
                          Contact Phone (To contact you on the day of pickup)
                        </label>
                        <input
                          type="tel"
                          name="pickupContactPhone"
                          value={formData.pickupContactPhone}
                          onChange={handleInputChange}
                          placeholder="+33 12 34 56 78"
                          className="w-full px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Number of Packages */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Packages <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="packages"
                      value={formData.packages}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>

                  {/* Package Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Package Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="e.g., Electronics - Headphones and charger"
                      className="w-full px-4 py-3 bg-blue-50 border-none rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                      rows={3}
                    />
                  </div>

                  {/* Confirm Pick-up Button */}
                  <button 
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <Package className="w-5 h-5" />
                    Confirm Pick-up (10€)
                  </button>
                </>
              )}
            </>
          )}
        </div>

        {/* Right Section - Info Cards */}
        <div className="space-y-4">
          {/* Important Reminders */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex flex-col items-center text-center mb-4">
              <div className="bg-blue-100 p-4 rounded-full mb-3">
                <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none">
                  <circle cx="35" cy="35" r="20" fill="#3B82F6"/>
                  <circle cx="35" cy="60" r="8" fill="#3B82F6"/>
                  <rect x="50" y="20" width="30" height="50" rx="4" fill="#60A5FA"/>
                  <circle cx="65" cy="35" r="15" fill="#93C5FD"/>
                  <path d="M55 45 L65 55 L75 45" stroke="#1E40AF" strokeWidth="3" fill="none"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800">Important Reminders</h3>
            </div>

            {packageType === 'drop-off' && (
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Valid ID matching your account</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Booking confirmation email</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Securely packed packages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>List of package contents</span>
                </li>
              </ul>
            )}

            {packageType === 'home-pickup' && (
              <div className="space-y-3 text-sm">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Home Pick-up Service</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Pick-up directly at your address in France</li>
                    <li>• Flexible time slots Monday to Saturday</li>
                    <li>• Service fee: €10 per pickup (regardless of number of packages)</li>
                    <li>• Automatic confirmation and 24h reminder</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Our Location */}
          {packageType === 'drop-off' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-800">Our Location</h3>
              </div>
              <p className="text-sm text-gray-600 mb-1">119 Avenue de la Légion</p>
              <p className="text-sm text-gray-600">75001 Paris, France</p>
            </div>
          )}

          {/* Service Fee - Home Pickup */}
          {packageType === 'home-pickup' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Service Fee</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Pickup fee:</span>
                  <span className="font-semibold text-gray-800">10€</span>
                </div>
                <div className="border-t border-green-200 my-2"></div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">Total Cost</span>
                  <span className="text-xl font-bold text-green-600">10€</span>
                </div>
              </div>
            </div>
          )}

          {/* Operating Hours */}
          {packageType === 'drop-off' && (
            <div className="bg-pink-50 rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-pink-600" />
                <h3 className="font-semibold text-gray-800">Operating Hours</h3>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Monday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
                <p className="text-pink-600 font-medium">Sunday: Closed</p>
              </div>
            </div>
          )}

          {/* What to Bring - Drop-off */}
          {packageType === 'drop-off' && (
            <div className="bg-yellow-50 rounded-2xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-3">What to Bring</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">✓</span>
                  <span>Valid ID matching your account</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">✓</span>
                  <span>Booking confirmation email</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">✓</span>
                  <span>Securely packed packages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">✓</span>
                  <span>List of package contents</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}