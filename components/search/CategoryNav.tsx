import React from 'react';

const IconMoto = (props: any) => <img src="https://www.magma-studio.tn/portfolio2/moto/icons/moto.svg" alt="Moto" className={props.className} />;
const IconScooter = (props: any) => <img src="https://www.magma-studio.tn/portfolio2/moto/icons/scooter.svg" alt="Scooter" className={props.className} />;
const IconQuad = (props: any) => <img src="https://www.magma-studio.tn/portfolio2/moto/icons/quad.svg" alt="Quad" className={props.className} />;
const IconAccessoires = (props: any) => <img src="https://www.magma-studio.tn/portfolio2/moto/icons/accesoires.svg" alt="Accessoires" className={props.className} />;
const IconCasques = (props: any) => <img src="https://www.magma-studio.tn/portfolio2/moto/icons/casques.svg" alt="Casques" className={props.className} />;
const IconVestes = (props: any) => <img src="https://www.magma-studio.tn/portfolio2/moto/icons/vestes.svg" alt="Vestes" className={props.className} />;
const IconGants = (props: any) => <img src="https://www.magma-studio.tn/portfolio2/moto/icons/gants.svg" alt="Gants" className={props.className} />;

interface CategoryItem {
  icon: React.ElementType;
  label: string;
}

const categories: CategoryItem[] = [
  { icon: IconMoto, label: "Moto" },
  { icon: IconScooter, label: "Scooter" },
  { icon: IconQuad, label: "Quad" },
  { icon: IconAccessoires, label: "Accessoires" },
  { icon: IconCasques, label: "Casques" },
  { icon: IconVestes, label: "Vestes" },
  { icon: IconGants, label: "Gants" },
];

interface CategoryNavProps {
  onCategoryClick: (label: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ onCategoryClick }) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar pb-6 md:pb-2 flex-shrink-0 px-6 md:px-0">
      <div className="flex flex-nowrap md:justify-center gap-6 md:gap-10 w-full min-w-max md:min-w-0 py-2">
        {categories.map((item, index) => (
          <div
            key={index}
            onClick={() => onCategoryClick(item.label)}
            className="flex flex-col items-center group cursor-pointer opacity-0 animate-fade-in-up flex-shrink-0"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 will-change-transform">
              <item.icon className="w-10 h-10 md:w-12 md:h-12 transition-transform duration-300" />
            </div>
            <span className="text-white font-semibold text-[11px] md:text-base tracking-wide">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};