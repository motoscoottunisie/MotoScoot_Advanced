import React from 'react';
import { Calendar, Gauge, Zap, Info } from 'lucide-react';

interface ListingSpecsProps {
  year: string;
  mileage: string;
  cc: string;
  condition: string;
  type?: string;
}

const S = {
  SpecGrid: "grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4",
  SpecItem: "bg-white rounded-2xl border border-gray-100 flex flex-row items-stretch transition-all hover:border-primary-100 shadow-sm overflow-hidden",
  IconBox: "w-[25%] flex items-center justify-center border-r border-gray-100 py-3 shrink-0 bg-gray-50/20",
  TextBox: "w-[75%] flex flex-col justify-center px-[10px] md:px-[14px] py-2.5",
  SpecLabel: "font-sans text-[10px] font-bold text-[#9ca3af] leading-[11px] tracking-normal normal-case text-left mb-0.5",
  SpecValue: "font-sans text-[15px] font-extrabold text-[#374151] leading-[20px] tracking-normal normal-case text-left",
};

const SpecItem = ({ icon: Icon, label, value }: any) => (
  <div className={S.SpecItem}>
    <div className={S.IconBox}>
      <Icon size={22} className="text-[#E65100]" strokeWidth={2.5} />
    </div>
    <div className={S.TextBox}>
      <span className={S.SpecLabel}>{label}</span>
      <span className={S.SpecValue}>{value}</span>
    </div>
  </div>
);

export const ListingSpecs: React.FC<ListingSpecsProps> = ({ year, mileage, cc, condition, type }) => {
  const isAccessory = type === 'Accessoires';

  return (
    <div className={S.SpecGrid}>
      {!isAccessory && (
        <>
          <SpecItem icon={Calendar} label="Année" value={year} />
          <SpecItem icon={Gauge} label="Km" value={mileage} />
          <SpecItem icon={Zap} label="Cylindrée" value={cc} />
        </>
      )}
      <SpecItem icon={Info} label="État" value={condition} />
      {isAccessory && <SpecItem icon={Zap} label="Catégorie" value="Équipement" />}
    </div>
  );
};