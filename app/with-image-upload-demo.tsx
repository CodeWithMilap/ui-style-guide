"use client"
import React, { useState, useRef } from "react";
import ColorThief from "colorthief";
import { HexColorPicker } from "react-colorful";
import Button from "@/components/PixelBlock/Button";
import ThemeSwitch from "@/components/ThemeSwitch";

type ColorType = "primary" | "secondary";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [palette, setPalette] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<{ primary: string; secondary: string }>({
    primary: "#000000",
    secondary: "#FFFFFF",
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);

      const img = new Image();
      const colorThief = new ColorThief();

      img.onload = () => {
        const colors = colorThief.getPalette(img, 6); // Get top 6 colors
        const hexColors = colors.map((rgb) =>
          `#${rgb.map((val) => val.toString(16).padStart(2, "0")).join("")}`
        );
        setPalette(hexColors);
      };

      img.src = URL.createObjectURL(file);
    }
  };

  const selectColor = (type: ColorType, color: string) => {
    setSelectedColors((prev) => ({ ...prev, [type]: color }));
    document.documentElement.style.setProperty(`--color-${type}`, color);
  };

  const downloadConfig = () => {
    const config = `module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "${selectedColors.primary}",
        secondary: "${selectedColors.secondary}",
      },
    },
  },
};`;
    const blob = new Blob([config], { type: "text/javascript;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "tailwind.config.js";
    link.click();
  };

  return (
    <main className="p-6 flex flex-col gap-6 dark:bg-gray-900 dark:text-gray-100">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Upload Logo & Extract Colors</h2>
          <ThemeSwitch />
        </div>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-4"
        />

        {image && (
          <div className="mb-6">
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded logo"
              className="w-full max-w-xs mx-auto rounded-md shadow"
            />
          </div>
        )}

        {palette.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium">Extracted Palette</h3>
            <div className="flex gap-2 mt-4">
              {palette.map((color, index) => (
                <div
                  key={index}
                  className="w-10 h-10 rounded-full border cursor-pointer"
                  style={{ backgroundColor: color }}
                  onClick={() => selectColor("primary", color)}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-lg font-medium">Selected Colors</h3>
          <div className="flex gap-4 items-center">
            <div>
              <span className="block text-sm">Primary</span>
              <div
                className="w-10 h-10 rounded-full border"
                style={{ backgroundColor: selectedColors.primary }}
                onClick={() => selectColor("primary", selectedColors.primary)}
              />
            </div>
            <div>
              <span className="block text-sm">Secondary</span>
              <div
                className="w-10 h-10 rounded-full border"
                style={{ backgroundColor: selectedColors.secondary }}
                onClick={() => selectColor("secondary", selectedColors.secondary)}
              />
            </div>
          </div>
        </div>

        <Button onClick={downloadConfig} variant="solid" color="primary">
          Download Config
        </Button>
      </div>
    </main>
  );
}
