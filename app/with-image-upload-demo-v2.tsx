"use client";

import React, { useState, useRef } from "react";
import { HexColorPicker } from "react-colorful";
import { ColorPalette } from "@/types/colorTypes";
import { colorPalette } from "@/colorPalette";
import Button from "@/components/PixelBlock/Button";
import InputField from "@/components/PixelBlock/InputField";
import ThemeSwitch from "@/components/ThemeSwitch";
import ColorThief from "colorthief";

export type ColorType = "primary" | "secondary" | "info" | "success" | "warning" | "error";

const generateTailwindConfig = (colors: ColorPalette) => {
  const formattedColors = Object.entries(colors).reduce((acc, [key, value]) => {
    acc[key as ColorType] = {
      "50": value,
      "100": value,
      "200": value,
      "300": value,
      "400": value,
      "500": value,
      "600": value,
      "700": value,
      "800": value,
      "900": value,
      "950": value,
    };
    return acc;
  }, {} as Record<ColorType, Record<string, string>>);

  return `module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(formattedColors, null, 2)}},
  },
};`;
};

export default function Home() {
  const [userColors, setUserColors] = useState<ColorPalette>(colorPalette);
  const [palette, setPalette] = useState<string[]>([]);
  const [activeColor, setActiveColor] = useState<ColorType>("primary");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const updateColor = (color: string) => {
    setUserColors((prevColors) => ({ ...prevColors, [activeColor]: color }));
    document.documentElement.style.setProperty(`--color-${activeColor}`, color);
  };

  const downloadConfig = () => {
    const config = generateTailwindConfig(userColors);
    const blob = new Blob([config], { type: "text/javascript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tailwind.config.js";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetColors = () => setUserColors(colorPalette);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);

      const img = new Image();
      const colorThief = new ColorThief();

      img.onload = () => {
        const colors = colorThief.getPalette(img, 6);
        const hexColors = colors.map((rgb) =>
          `#${rgb.map((val) => val.toString(16).padStart(2, "0")).join("")}`
        );
        setPalette(hexColors);
      };

      img.src = URL.createObjectURL(file);
    }
  };

  const ColorSwatch = ({ type, color }: { type: ColorType; color: string }) => (
    <div className="flex items-center space-x-2 w-full">
      <div
        className="w-6 h-6 rounded-full cursor-pointer border-2 border-gray-300 dark:border-gray-700"
        style={{ backgroundColor: color }}
        onClick={() => {
          setActiveColor(type);
          setShowColorPicker(true);
        }}
      />
      <span className="text-sm font-medium capitalize">{type}</span>
    </div>
  );

  return (
    <main className="p-6 flex flex-col md:flex-row gap-6 dark:bg-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Customize Colors</h2>
          <ThemeSwitch />
        </div>

        {/* Image Upload */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Extract Colors from Logo</h3>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4"
          />
          {palette.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-4">
              {palette.map((color, index) => (
                <div
                  key={index}
                  className="w-10 h-10 rounded-full border"
                  style={{ backgroundColor: color }}
                  onClick={() => updateColor(color)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Color Swatches */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Brand Colors</h3>
          <div className="grid grid-cols-2 gap-4">
            <ColorSwatch type="primary" color={userColors.primary} />
            <ColorSwatch type="secondary" color={userColors.secondary} />
          </div>
        </div>

        {/* Reset and Download */}
        <div className="flex justify-between">
          <Button onClick={resetColors} variant="outline" color="warning">
            Reset to Defaults
          </Button>
          <Button onClick={downloadConfig} variant="solid" color="primary">
            Download Config
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-2/3 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-6">Live Preview</h2>
        {/* Buttons Preview */}
        <div className="mb-10">
          <h3 className="text-lg font-medium mb-4">Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <Button color="primary">Primary</Button>
            <Button color="secondary">Secondary</Button>
            <Button color="info">Info</Button>
            <Button color="success">Success</Button>
            <Button color="warning">Warning</Button>
            <Button color="error">Error</Button>
          </div>
        </div>

        {/* Inputs Preview */}
        <div>
          <h3 className="text-lg font-medium mb-4">Inputs</h3>
          <div className="grid gap-4">
            <InputField color="primary" label="Primary Input" placeholder="Primary" />
            <InputField color="secondary" label="Secondary Input" placeholder="Secondary" />
            <InputField color="success" label="Success Input" placeholder="Success" />
            <InputField color="warning" label="Warning Input" placeholder="Warning" />
            <InputField color="danger" label="Error Input" placeholder="Error" />
          </div>
        </div>
      </div>

      {/* Color Picker */}
      {showColorPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
            <h3 className="text-lg font-medium capitalize">Select {activeColor} Color</h3>
            <HexColorPicker
              color={userColors[activeColor]}
              onChange={updateColor}
              className="w-full max-w-xs"
            />
            <button
              onClick={() => setShowColorPicker(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded shadow-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
