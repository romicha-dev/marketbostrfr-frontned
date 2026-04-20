import  { useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapSection = () => {
  const [position, setPosition] = useState<[number, number]>([46.603354, 1.888334]); // France center

  const LocationSelector = () => {
    useMapEvents({
      moveend(e) {
        const map = e.target;
        const center = map.getCenter();
        setPosition([center.lat, center.lng]);
      },
    });
    return null;
  };

  return (
    <div className="md:py-[126px] relative w-full">
      {/* Container to hold map and logo */}
      <div className="h-[500px] w-full relative overflow-hidden rounded-xl border border-gray-200">
        
        {/* Map */}
        <MapContainer 
          center={position} 
          zoom={6} 
          style={{ height: "100%", width: "100%", zIndex: 0 }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          />
          <LocationSelector />
        </MapContainer>

        {/* Logo/Icon - Fixed in the center of the MAP container */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     bg-white p-3 rounded-lg shadow-2xl flex items-center justify-center 
                     pointer-events-none z-[1000] border border-gray-100"
        >
          {/* Logo image size ensure kora hoyeche */}
          <img 
            src="/footerLogo.png" 
            alt="Logo" 
            className="h-8 sm:h-12 w-auto object-contain"
            onError={(e) => {
                // Logo na thakle jeno ekta placeholder dekhay test korar jonno
                e.currentTarget.src = "https://via.placeholder.com/150x50?text=Logo";
            }}
          />
        </div>
      </div>

      {/* Selected coordinates */}
      {/* <div className="mt-4 text-center text-gray-600 font-medium">
        <p className="bg-white inline-block px-4 py-2 rounded-full shadow-sm border">
          Selected Coordinates: {position[0].toFixed(4)}, {position[1].toFixed(4)}
        </p>
      </div> */}
    </div>
  );
};

export default MapSection;