// const ImageComponent = () => {
//   return (
//     <div className="flex flex-wrap items-center justify-center gap-4">
//       {/* Small Image */}
//       <div className="relative w-full sm:w-1/3 lg:w-[200px] h-[200px] sm:h-[250px] lg:h-[300px] overflow-hidden rounded-lg shadow-lg bottom-0 right-0 md:bottom-4 -md:right-30">
//         <img
//           src="https://images.unsplash.com/photo-1765790859163-53e82c11775a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8"
//           alt="Secondary image"
//           className="w-full h-full object-cover"
//         />
//       </div>
//       {/* Large Image */}
//       <div className="relative w-full sm:w-2/3 lg:w-[620px] h-[350px] sm:h-[400px] lg:h-[500px] overflow-hidden rounded-lg shadow-lg">
//         <img
//           src="https://images.unsplash.com/photo-1766258725835-88ff59f0040d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//           alt="Main image"
//           className="w-full h-full object-cover"
//         />
//       </div>
//     </div>
//   );
// };

// export default ImageComponent;

const ImageComponent = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {/* Large Image */}
      <div className="relative">
        <div className="w-full sm:w-2/3 lg:w-[520px] h-[350px] sm:h-[400px] lg:h-[580px] overflow-hidden rounded-lg shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1766258725835-88ff59f0040d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Main image"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Small Image - Positioned 60% to the left and 40px up from the bottom of the large image */}
        <div className="absolute -left-15 bottom-10 h-[250px] overflow-hidden rounded-lg shadow-lg z-10 border-6 border-white">
          <img
            src="https://images.unsplash.com/photo-1765790859163-53e82c11775a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8"
            alt="Secondary image"
            className="w-full h-full object-cover rounded-[8px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageComponent;
