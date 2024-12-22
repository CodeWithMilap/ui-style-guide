// components/DownloadTailwindConfig.tsx
import React from "react";
import { generateTailwindConfig } from "../utils/generateTailwindConfig";
import { ColorPalette } from "@/types/colorTypes"; // Use ColorPalette type
import { Download } from "lucide-react";

type DownloadProps = {
  colors: ColorPalette;
};

const DownloadTailwindConfig: React.FC<DownloadProps> = ({ colors }) => {
  const handleDownload = () => {
    const config = generateTailwindConfig(colors); // Generate config based on current colors
    const blob = new Blob([config], { type: "text/plain" }); // Create Blob object for file
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "tailwind.config.js"; // Set download filename
    link.click();
  };

  return (
    <div>
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 py-2 px-4 bg-black w-full justify-center text-white rounded"
      >
        <Download className="h-4 w-4" />
        Download Config
      </button>
    </div>
  );
};

export default DownloadTailwindConfig;
