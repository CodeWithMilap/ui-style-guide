import React, { useState, useEffect } from "react";
import DownloadTailwindConfig from "./DownloadTailwindConfig"; // Import your download component
import { ColorPalette } from "@/types/colorTypes";
import { colorPalette } from "@/colorPalette";

const ColorPicker: React.FC = () => {
  const [userColors, setUserColors] = useState<ColorPalette>(colorPalette);

  const updateCSSVariables = (colors: ColorPalette) => {
    document.documentElement.style.setProperty(
      "--color-primary",
      colors.brand.primary
    );
    document.documentElement.style.setProperty(
      "--color-secondary",
      colors.brand.secondary
    );
    document.documentElement.style.setProperty(
      "--color-info",
      colors.state.info
    );
    document.documentElement.style.setProperty(
      "--color-success",
      colors.state.success
    );
    document.documentElement.style.setProperty(
      "--color-warning",
      colors.state.warning
    );
    document.documentElement.style.setProperty(
      "--color-error",
      colors.state.error
    );
    document.documentElement.style.setProperty(
      "--color-black1",
      colors.black.black1
    );
    document.documentElement.style.setProperty(
      "--color-black2",
      colors.black.black2
    );
    document.documentElement.style.setProperty(
      "--color-black3",
      colors.black.black3
    );
    document.documentElement.style.setProperty(
      "--color-white",
      colors.black.white
    );
    document.documentElement.style.setProperty(
      "--color-grey1",
      colors.grey.grey1
    );
    document.documentElement.style.setProperty(
      "--color-grey2",
      colors.grey.grey2
    );
    document.documentElement.style.setProperty(
      "--color-grey3",
      colors.grey.grey3
    );
    document.documentElement.style.setProperty(
      "--color-grey4",
      colors.grey.grey4
    );
    document.documentElement.style.setProperty(
      "--color-grey5",
      colors.grey.grey5
    );
  };

  useEffect(() => {
    updateCSSVariables(userColors);
  }, [userColors]);

  const handleColorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    category: keyof ColorPalette,
    colorType: string
  ) => {
    const newColors = {
      ...userColors,
      [category]: {
        ...userColors[category as keyof ColorPalette],
        [colorType]: e.target.value,
      },
    };
    setUserColors(newColors as ColorPalette); // Ensure type safety here
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold">Customize Colors</h2>

      {/* Brand Colors */}
      <div>
        <h3 className="font-bold">Brand Colors</h3>
        <label>
          Primary:
          <input
            type="color"
            value={userColors.brand.primary}
            onChange={(e) => handleColorChange(e, "brand", "primary")}
          />
        </label>
        {/* <label>
          Secondary:
          <input
            type="color"
            value={userColors.brand.secondary}
            onChange={(e) => handleColorChange(e, 'brand', 'secondary')}
          />
        </label> */}
      </div>

      {/* State Colors */}
      {/* <div>
        <h3 className="font-bold">State Colors</h3>
        {Object.keys(userColors.state).map((stateKey) => (
          <label key={stateKey}>
            {stateKey.charAt(0).toUpperCase() + stateKey.slice(1)}:
            <input
              type="color"
              value={userColors.state[stateKey as keyof StateColors]}
              onChange={(e) => handleColorChange(e, 'state', stateKey)}
            />
          </label>
        ))}
      </div> */}

      {/* Black Colors */}
      {/* <div>
        <h3 className="font-bold">Black Colors</h3>
        {Object.keys(userColors.black).map((blackKey) => (
          <label key={blackKey}>
            {blackKey.charAt(0).toUpperCase() + blackKey.slice(1)}:
            <input
              type="color"
              value={userColors.black[blackKey as keyof BlackColors]}
              onChange={(e) => handleColorChange(e, 'black', blackKey)}
            />
          </label>
        ))}
      </div> */}

      {/* Grey Colors */}
      {/* <div>
        <h3 className="font-bold">Grey Colors</h3>
        {Object.keys(userColors.grey).map((greyKey) => (
          <label key={greyKey}>
            {greyKey.charAt(0).toUpperCase() + greyKey.slice(1)}:
            <input
              type="color"
              value={userColors.grey[greyKey as keyof GreyColors]}
              onChange={(e) => handleColorChange(e, 'grey', greyKey)}
            />
          </label>
        ))}
      </div> */}

      {/* Download Button */}
      <DownloadTailwindConfig colors={userColors} />
    </div>
  );
};

export default ColorPicker;
