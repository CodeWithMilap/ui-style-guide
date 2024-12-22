// components/ColorSection.tsx

import React from "react";
import ColorBlock from "./ColorBlock";

interface Color {
  bgColor: string;
  label: string;
}

interface ColorSectionProps {
  title: string;
  colors: Color[];
  onColorChange: (index: number, newColor: string) => void;
}

const ColorSection: React.FC<ColorSectionProps> = ({ title, colors, onColorChange }) => {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-3">
        <h3 className="text-3xl font-medium text-gray-500 w-full">{title}</h3>
      </div>
      <div className="flex gap-12 col-span-6 w-full">
        {colors.map((color, index) => (
          <ColorBlock
            key={index}
            bgColor={color.bgColor}
            label={color.label}
            onColorChange={(newColor) => onColorChange(index, newColor)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSection;
