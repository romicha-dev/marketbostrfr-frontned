interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureItem({
  icon,
  title,
  description,
}: FeatureItemProps) {
  return (
    <div className="flex gap-4 group">
      <div className="text-2xl md:text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className=" text-black font-roboto leading-snug md:leading-[150%] text-sm md:text-lg font-normal mb-1.5">
          {title}
        </h4>
        <p className="text-sm md:text-base font-normal font-roboto  text-[#3B434A] leading-relaxed md:leading-[150%]">
          {description}
        </p>
      </div>
    </div>
  );
}
