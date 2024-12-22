import React from "react";

interface TypographyTableProps {
  typographyData: { name: string; fontSize: string; lineHeight: string }[];
}

const TypographyTable: React.FC<TypographyTableProps> = ({ typographyData }) => {
  return (
    <div className="grid grid-cols-3 gap-8 text-left">
      <p className="text-sm text-gray-500 font-semibold">Name</p>
      <p className="text-sm text-gray-500 font-semibold">Font size</p>
      <p className="text-sm text-gray-500 font-semibold">Line Height</p>

      {typographyData.map((item, index) => (
        <React.Fragment key={index}>
          <p className="text-lg font-bold">{item.name}</p>
          <p className="text-sm">{item.fontSize}</p>
          <p className="text-sm">{item.lineHeight}</p>
        </React.Fragment>
      ))}
    </div>
  );
};

export default TypographyTable;
