import { useEffect, useRef, useState } from "react";

const LanguageSelect = () => {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("English");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

    // 👉 outside click handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-32">
        
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between
        text-white px-3 py-1 rounded-md"
      >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.99 8.95996H7.01001" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 7.28003V8.96002" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M14.5 8.93994C14.5 13.2399 11.14 16.7199 7 16.7199" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16.9999 16.72C15.1999 16.72 13.6 15.76 12.45 14.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        {lang}
        <svg width="14" height="8" viewBox="0 0 14 8" fill="white">
          <path d="M7 8L0 0h14L7 8z" />
        </svg>
      </button>

      {open && (
        <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-50">
          {["English", "French"].map((item) => (
            <div
              key={item}
              onClick={() => {
                setLang(item);
                setOpen(false);
              }}
              className="px-3 py-2 text-black hover:bg-gray-100 cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelect;
