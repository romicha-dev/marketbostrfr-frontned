// export const DeclarePackage = ()=> {
//   return(
//     <div>
//       kjfgll
//     </div>
//   )
// }





import ImportantRemindersCard from "./ImportantRemainderCards"
import NewPackage from "./Newpackage"



export const DeclarePackage = () => {
  return (
    <div>
         {/* Header */}
        <div className="mb-6">
          <h1 className="text-base sm:text-lg md:text-xl font-semibold font-arima text-[#0A0A0A] leading-[150%] mt-8 mb-2">
            Declare New Package
          </h1>
          <p className="text-[#4A5565] text-sm sm:text-base font-normal leading-[150%]">
            Let us know about your incoming package so we can identify it when it arrives
          </p>
        </div>
     <div className="flex flex-col lg:flex-row gap-6">
  {/* Main content */}
  <div className="flex-1">
    <NewPackage />
  </div>

  {/* Sidebar */}
  <div className="w-full lg:w-lg"> 
    <ImportantRemindersCard />
  </div>
</div>

    </div>
  )
}
