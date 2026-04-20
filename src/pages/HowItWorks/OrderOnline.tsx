



interface Step {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const OrderOnline = () => {

     const steps: Step[] = [
    {
      number: 1,
      icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.6665 2.66675H4.98651C6.42651 2.66675 7.55984 3.90675 7.43984 5.33341L6.33317 18.6134C6.1465 20.7867 7.86649 22.6534 10.0532 22.6534H24.2532C26.1732 22.6534 27.8532 21.0801 27.9998 19.1734L28.7198 9.17342C28.8798 6.96009 27.1998 5.16007 24.9732 5.16007H7.75985" stroke="#292D32" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M21.6667 29.3333C22.5871 29.3333 23.3333 28.5871 23.3333 27.6667C23.3333 26.7462 22.5871 26 21.6667 26C20.7462 26 20 26.7462 20 27.6667C20 28.5871 20.7462 29.3333 21.6667 29.3333Z" stroke="#292D32" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.0002 29.3333C11.9206 29.3333 12.6668 28.5871 12.6668 27.6667C12.6668 26.7462 11.9206 26 11.0002 26C10.0797 26 9.3335 26.7462 9.3335 27.6667C9.3335 28.5871 10.0797 29.3333 11.0002 29.3333Z" stroke="#292D32" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 10.6667H28" stroke="#292D32" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>,
      title: "Shop Online",
      description: "Browse your favorite e-commerce sites (Amazon, Shein, Temu, etc.)"
    },
    {
      number: 2,
      icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.9998 17.9067C18.2973 17.9067 20.1598 16.0442 20.1598 13.7467C20.1598 11.4492 18.2973 9.58667 15.9998 9.58667C13.7023 9.58667 11.8398 11.4492 11.8398 13.7467C11.8398 16.0442 13.7023 17.9067 15.9998 17.9067Z" stroke="#292D32" stroke-width="2"/>
  <path d="M4.8266 11.3201C7.45327 -0.226582 24.5599 -0.213249 27.1733 11.3334C28.7066 18.1068 24.4933 23.8401 20.7999 27.3868C18.1199 29.9734 13.8799 29.9734 11.1866 27.3868C7.5066 23.8401 3.29327 18.0934 4.8266 11.3201Z" stroke="#292D32" stroke-width="2"/>
</svg>,
      title: "Use KayLeo Address",
      description: "Enter your unique KayLeo mailbox address as the shipping destination"
    },
    {
      number: 3,
      icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M30.6667 23.88C30.6934 24.88 30.4267 25.8267 29.9467 26.64C29.6801 27.12 29.3201 27.56 28.9201 27.92C28.0001 28.7733 26.7867 29.2933 25.44 29.3333C23.4934 29.3733 21.7734 28.3733 20.8267 26.84C20.3201 26.0533 20.0134 25.1067 20.0001 24.1067C19.9601 22.4267 20.7067 20.9067 21.9067 19.9067C22.8134 19.16 23.9601 18.6933 25.2134 18.6667C28.1601 18.6 30.6001 20.9333 30.6667 23.88Z" stroke="#292D32" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M23.2534 24.0401L24.6001 25.3201L27.3868 22.6267" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4.22656 9.92017L15.9999 16.7335L27.6932 9.96012" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16 28.8136V16.7202" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M28.8131 12.2268V19.7735C28.8131 19.8401 28.8132 19.8934 28.7998 19.9601C27.8665 19.1467 26.6665 18.6668 25.3332 18.6668C24.0798 18.6668 22.9198 19.1068 21.9998 19.8401C20.7732 20.8134 19.9998 22.3201 19.9998 24.0001C19.9998 25.0001 20.2798 25.9468 20.7732 26.7468C20.8932 26.9601 21.0398 27.1601 21.1998 27.3468L18.7598 28.6935C17.2398 29.5468 14.7598 29.5468 13.2398 28.6935L6.11983 24.7468C4.5065 23.8534 3.18652 21.6135 3.18652 19.7735V12.2268C3.18652 10.3868 4.5065 8.14678 6.11983 7.25344L13.2398 3.30675C14.7598 2.45341 17.2398 2.45341 18.7598 3.30675L25.8798 7.25344C27.4932 8.14678 28.8131 10.3868 28.8131 12.2268Z" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>,
      title: "We Receive",
      description: "Your package arrives at our secure warehouse in France"
    },
    {
      number: 4,
      icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.3333 29.3334H18.6667C25.3333 29.3334 28 26.6667 28 20.0001V12.0001C28 5.33341 25.3333 2.66675 18.6667 2.66675H13.3333C6.66667 2.66675 4 5.33341 4 12.0001V20.0001C4 26.6667 6.66667 29.3334 13.3333 29.3334Z" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M23 11.0533C19.0133 7.50664 12.9867 7.50664 9 11.0533L11.9067 15.72C14.24 13.64 17.76 13.64 20.0933 15.72L23 11.0533Z" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>,
      title: "Weigh & Quote",
      description: "We weigh your package and send you a shipping quote"
    },
    {
      number: 5,
      icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.22656 9.92017L15.9999 16.7335L27.6932 9.96012" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16 28.8136V16.7202" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13.2398 3.30675L6.11983 7.26679C4.5065 8.16012 3.18652 10.4001 3.18652 12.2401V19.7735C3.18652 21.6135 4.5065 23.8534 6.11983 24.7468L13.2398 28.7068C14.7598 29.5468 17.2532 29.5468 18.7732 28.7068L25.8932 24.7468C27.5065 23.8534 28.8265 21.6135 28.8265 19.7735V12.2401C28.8265 10.4001 27.5065 8.16012 25.8932 7.26679L18.7732 3.30675C17.2398 2.45341 14.7598 2.45341 13.2398 3.30675Z" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M22.6665 17.6532V12.7733L10.0132 5.46655" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>,
      title: "We Process",
      description: "Your package arrives at our secure warehouse in France"
    },
    {
      number: 6,
      icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.6665 2.66675H4.98651C6.42651 2.66675 7.55984 3.90675 7.43984 5.33341L6.33317 18.6134C6.1465 20.7867 7.86649 22.6534 10.0532 22.6534H24.2532C26.1732 22.6534 27.8532 21.0801 27.9998 19.1734L28.7198 9.17342C28.8798 6.96009 27.1998 5.16007 24.9732 5.16007H7.75985" stroke="#292D32" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M21.6667 29.3333C22.5871 29.3333 23.3333 28.5871 23.3333 27.6667C23.3333 26.7462 22.5871 26 21.6667 26C20.7462 26 20 26.7462 20 27.6667C20 28.5871 20.7462 29.3333 21.6667 29.3333Z" stroke="#292D32" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.0002 29.3333C11.9206 29.3333 12.6668 28.5871 12.6668 27.6667C12.6668 26.7462 11.9206 26 11.0002 26C10.0797 26 9.3335 26.7462 9.3335 27.6667C9.3335 28.5871 10.0797 29.3333 11.0002 29.3333Z" stroke="#292D32" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 10.6667H28" stroke="#292D32" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>,
      title: "Pay Online",
      description: "Review and pay your invoice securely through our dashboard"
    },
    {
      number: 7,
      icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.9998 17.9067C18.2973 17.9067 20.1598 16.0442 20.1598 13.7467C20.1598 11.4492 18.2973 9.58667 15.9998 9.58667C13.7023 9.58667 11.8398 11.4492 11.8398 13.7467C11.8398 16.0442 13.7023 17.9067 15.9998 17.9067Z" stroke="#292D32" stroke-width="2"/>
  <path d="M4.8266 11.3201C7.45327 -0.226582 24.5599 -0.213249 27.1733 11.3334C28.7066 18.1068 24.4933 23.8401 20.7999 27.3868C18.1199 29.9734 13.8799 29.9734 11.1866 27.3868C7.5066 23.8401 3.29327 18.0934 4.8266 11.3201Z" stroke="#292D32" stroke-width="2"/>
</svg>,
      title: "We Ship",
      description: "Your package is shipped to your DOM-TOM destination"
    },
    {
      number: 8,
      icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 18.6667H17.3333C18.8 18.6667 20 17.4667 20 16.0001V2.66675H8C6 2.66675 4.25335 3.7734 3.34668 5.40007" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M2.6665 22.6667C2.6665 24.8801 4.45317 26.6667 6.6665 26.6667H7.99984C7.99984 25.2001 9.19984 24.0001 10.6665 24.0001C12.1332 24.0001 13.3332 25.2001 13.3332 26.6667H18.6665C18.6665 25.2001 19.8665 24.0001 21.3332 24.0001C22.7998 24.0001 23.9998 25.2001 23.9998 26.6667H25.3332C27.5465 26.6667 29.3332 24.8801 29.3332 22.6667V18.6667H25.3332C24.5998 18.6667 23.9998 18.0667 23.9998 17.3334V13.3334C23.9998 12.6001 24.5998 12.0001 25.3332 12.0001H27.0531L24.7732 8.01343C24.2932 7.18676 23.4132 6.66675 22.4532 6.66675H19.9998V16.0001C19.9998 17.4667 18.7998 18.6667 17.3332 18.6667H15.9998" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10.6667 29.3333C12.1394 29.3333 13.3333 28.1394 13.3333 26.6667C13.3333 25.1939 12.1394 24 10.6667 24C9.19391 24 8 25.1939 8 26.6667C8 28.1394 9.19391 29.3333 10.6667 29.3333Z" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M21.3332 29.3333C22.8059 29.3333 23.9998 28.1394 23.9998 26.6667C23.9998 25.1939 22.8059 24 21.3332 24C19.8604 24 18.6665 25.1939 18.6665 26.6667C18.6665 28.1394 19.8604 29.3333 21.3332 29.3333Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M29.3333 16V18.6667H25.3333C24.6 18.6667 24 18.0667 24 17.3333V13.3333C24 12.6 24.6 12 25.3333 12H27.0533L29.3333 16Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M2.6665 10.6667H10.6665" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M2.6665 14.6667H7.99984" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M2.6665 18.6667H5.33317" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>,
      title: "Delivery",
      description: "Track in real-time and receive your package at home"
    }
  ];

  return (
    <div className=''>
      <div className=' max-w-[1312px] mx-auto'>


         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 h-full hover:shadow-md transition-shadow">
                {/* Step Number Badge */}
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-[#155DFC] font-roboto rounded-full flex items-center justify-center text-white font-semibold mb-4">
                      {step.number}
                    </div>
                  </div>
                </div>

                {/* Icon */}
                <div className="mb-12 text-gray-700">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg md:text-xl font-roboto font-normal text-[#101828] mb-3 leading-[150%]">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:tex-sm md:text-base font-roboto  text-[#4A5565] font-normal leading-[150%]">
                  {step.description}
                </p>
              </div>

              {/* Connector Line - Hidden on mobile, shown on larger screens */}
              {index < steps.length - 1 && (
                 <>
                  {/* Vertical connector for mobile */}
                  <div className="sm:hidden absolute top-full left-5 w-0.5 h-6 bg-[#BEDBFF] -translate-x-1/2" />
                  
                  {/* Horizontal connector for desktop */}
                  <div className="hidden lg:block absolute top-8 left-full w-10 h-0.5 bg-[#BEDBFF] -ml-3 -mr-3" 
                       style={{ 
                         display: (index + 1) % 4 === 0 ? 'none' : 'block' 
                       }} />
                  
                  {/* Horizontal connector for tablet */}
                  <div className="hidden sm:block lg:hidden absolute top-8 left-full w-10 h-0.5 bg-[#BEDBFF] -ml-3 -mr-3"
                       style={{ 
                         display: (index + 1) % 2 === 0 ? 'none' : 'block' 
                       }} />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderOnline
