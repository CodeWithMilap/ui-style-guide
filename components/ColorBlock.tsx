// components/ColorBlock.tsx
import React, { useRef } from "react";

interface ColorBlockProps {
  bgColor: string;
  label: string;
  onColorChange: (newColor: string) => void;
}

const ColorBlock: React.FC<ColorBlockProps> = ({ bgColor, label, onColorChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBoxClick = () => {
    if (inputRef.current) {
      inputRef.current.click(); // Trigger the hidden input when the box is clicked
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onColorChange(e.target.value); // Trigger color change in parent
  };

  return (
    <div className="text-center flex flex-col gap-3 relative">
      <div
        className="h-24 w-24 rounded-md shadow-lg cursor-pointer"
        onClick={handleBoxClick}
        style={{ backgroundColor: bgColor }} // Keep the bg color dynamic
      />
      <input
        type="color"
        ref={inputRef}
        onChange={handleColorChange}
        className="invisible absolute bottom-0" // Hide the input field
      />
      <div className="text-gray-400">
        <span className="text-primary font-bold">{label}</span>
      </div>
    </div>
  );
};

export default ColorBlock;
