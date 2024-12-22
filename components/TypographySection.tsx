import React from "react";
import TypographyTable from "./TypographyTable";

interface TypographySectionProps {
  sectionType: string; // Either "Heading" or "Body"
  fontFamily: string;
  fontSource: string;
  typographyData: { name: string; fontSize: string; lineHeight: string }[];
}

const TypographySection: React.FC<TypographySectionProps> = ({
  sectionType,
  fontFamily,
  fontSource,
  typographyData,
}) => {
  return (
    <div className="py-8">
      <div className="grid grid-cols-12 gap-5 w-full">
        <div className="col-span-3 text-gray-400 overflow-hidden">
          <span className="text-[232px] leading-none font-bold">
            A<span className="font-normal">a</span>
          </span>
          <p className="text-3xl font-medium mt-4">{sectionType}</p>
          <p className="text-base mt-2">
            Line height and paragraph spacing for {sectionType.toLowerCase()} text is
            {sectionType === "Heading" ? " 1.1 x font size" : " 1.4 x font size"}
          </p>
        </div>
        <div className="gap-12 flex flex-col col-span-9 w-full">
          <div>
            <h3 className="text-5xl font-bold">{fontFamily}</h3>
            <p className="mb-8 text-sm text-gray-500">{fontSource}</p>
          </div>
          <TypographyTable typographyData={typographyData} />
        </div>
      </div>
    </div>
  );
};

export default TypographySection;
