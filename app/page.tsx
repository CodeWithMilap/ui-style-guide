// pages/index.tsx
"use client";

import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { ColorPalette } from "@/types/colorTypes";
import { colorPalette } from "@/colorPalette";
import Button from "@/components/PixelBlock/Button";
import InputField from "@/components/PixelBlock/InputField";
import ThemeSwitch from "@/components/ThemeSwitch";
import Alert from "@/components/PixelBlock/Alert";
import { Download } from "lucide-react";
import chroma from "chroma-js";
import { Avatar } from "@/components/PixelBlock/Avatar";
import { Accordion, AccordionItem } from "@/components/PixelBlock/Accordion";
import MenuAccordion from "@/components/PixelBlock/MenuAccordion";

export type ColorType =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error";

const generateShades = (color: string) => {
  const scale = chroma
    .scale([chroma(color).brighten(2), color, chroma(color).darken(2)])
    .mode("lab")
    .colors(10); // Generate 10 shades

  return {
    "50": scale[0],
    "100": scale[1],
    "200": scale[2],
    "300": scale[3],
    "400": scale[4],
    "500": scale[5],
    "600": scale[6],
    "700": scale[7],
    "800": scale[8],
    "900": scale[9],
    "950": chroma(color).darken(3).hex(), // Extra dark shade
  };
};

const generateTailwindConfig = (colors: ColorPalette) => {
  const formattedColors = Object.entries(colors).reduce((acc, [key, value]) => {
    acc[key as ColorType] = generateShades(value); // Use shared shade generation
    return acc;
  }, {} as Record<ColorType, Record<string, string>>);

  return `module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(formattedColors, null, 2)},
    },
  },
};`;
};

export default function Home() {
  const [userColors, setUserColors] = useState<ColorPalette>(colorPalette);
  const [activeColor, setActiveColor] = useState<ColorType>("primary");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const updateColor = (color: string) => {
    const shades = generateShades(color);

    // Update CSS variables for all shades
    Object.entries(shades).forEach(([key, value]) => {
      document.documentElement.style.setProperty(
        `--color-${activeColor}-${key}`,
        value
      );
    });

    // Update the main color in userColors
    setUserColors((prevColors) => ({ ...prevColors, [activeColor]: color }));
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

  const ColorSwatch = ({ type, color }: { type: ColorType; color: string }) => (
    <div className="flex items-center space-x-2">
      <div
        className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300 dark:border-gray-700"
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
    <main className="p-6 grid gap-6 dark:bg-gray-900 dark:text-gray-100 ">
      {/* Sidebar */}

      <div className="flex flex-row items-center justify-between">
        <div className="flex justify-between items-center col-span-2">
          <h2 className="text-xl font-semibold">Customize Colors</h2>
        </div>

        {/* Download Button */}
        <div className="flex gap-8">
          <Button
            onClick={downloadConfig}
            variant="solid"
            color="primary"
            icon={<Download className="mr-2 h-4 w-4" />}
          >
            Download Config
          </Button>

          <ThemeSwitch />
        </div>
      </div>

      <div className="w-full grid gap-6 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl ">
        <div className="flex justify-between gap-4 ">
          {/* Color Swatches */}
          <div className="">
            <h3 className="text-lg font-medium mb-4">Brand Colors</h3>
            <div className="flex gap-8">
              <ColorSwatch type="primary" color={userColors.primary} />
              <ColorSwatch type="secondary" color={userColors.secondary} />
            </div>
          </div>

          <div className="">
            <h3 className="text-lg font-medium mb-4">State Colors</h3>
            <div className="flex gap-8">
              <ColorSwatch type="info" color={userColors.info} />
              <ColorSwatch type="success" color={userColors.success} />
              <ColorSwatch type="warning" color={userColors.warning} />
              <ColorSwatch type="error" color={userColors.error} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full columns-4 gap-6 space-y-5">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl  p-6 break-inside-avoid">
          {/* Buttons Preview */}
          <div className="mb-10">
            <h3 className="text-lg font-medium mb-4">Buttons</h3>
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-3 flex-wrap gap-4 justify-between">
                <Button color="primary">Primary</Button>
                <Button color="secondary">Secondary</Button>
                <Button color="info">Info</Button>
                <Button color="success">Success</Button>
                <Button color="warning">Warning</Button>
                <Button color="error">Error</Button>
              </div>

              <div className="grid grid-cols-3 flex-wrap gap-4 justify-between">
                <Button color="primary" variant="outline">
                  Primary
                </Button>
                <Button color="secondary" variant="outline">
                  Secondary
                </Button>
                <Button color="info" variant="outline">
                  Info
                </Button>
                <Button color="success" variant="outline">
                  Success
                </Button>
                <Button color="warning" variant="outline">
                  Warning
                </Button>
                <Button color="error" variant="outline">
                  Error
                </Button>
              </div>

              <div className="grid grid-cols-3 flex-wrap gap-4 justify-between">
                <Button color="primary" variant="ghost">
                  Primary
                </Button>
                <Button color="secondary" variant="ghost">
                  Secondary
                </Button>
                <Button color="info" variant="ghost">
                  Info
                </Button>
                <Button color="success" variant="ghost">
                  Success
                </Button>
                <Button color="warning" variant="ghost">
                  Warning
                </Button>
                <Button color="error" variant="ghost">
                  Error
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl  p-6 break-inside-avoid">
          <h3 className="text-lg font-medium mb-4">Login</h3>
          <div className="grid gap-4">
            <InputField type="email" label="Email" placeholder="Email" />
            <InputField
              type="password"
              label="Password"
              placeholder="Password"
            />
            <Button>Login</Button>
          </div>
        </div>

        {/* Inputs Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl  p-6 break-inside-avoid">
          <h3 className="text-lg font-medium mb-4">Inputs</h3>
          <div className="grid gap-4">
            <InputField
              color="primary"
              label="Primary Input"
              placeholder="Primary color"
            />
            <InputField
              color="secondary"
              label="Secondary Input"
              placeholder="Secondary color"
            />
            <InputField
              color="success"
              label="Success Input"
              placeholder="Success color"
            />
            <InputField
              color="warning"
              label="Warning Input"
              placeholder="Warning color"
            />
            <InputField
              color="danger"
              label="Danger Input"
              placeholder="Danger color"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl  p-6 break-inside-avoid">
          <h3 className="text-lg font-medium mb-4">Alert</h3>
          <div className="grid gap-4">
            <Alert
              type="success"
              title="Success Alert"
              description="This is a success alert — check it out!"
              icon={<span className="text-green-500">✔️</span>}
            />
            <Alert
              type="error"
              title="Error Alert"
              description="This is an error alert — check it out!"
              icon={<span className="text-red-500">❌</span>}
            />
            <Alert
              type="warning"
              title="Warning Alert"
              description="This is a warning alert — check it out!"
              icon={<span className="text-yellow-500">⚠️</span>}
            />
            <Alert
              type="info"
              title="Info Alert"
              description="This is an info alert — check it out!"
              icon={<span className="text-blue-500">ℹ️</span>}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl  p-6 break-inside-avoid">
          <h3 className="text-lg font-medium mb-4">Avatar</h3>

          <div className="flex gap-4">
            <Avatar
              name="User A"
              size="md"
              color="primary"
              radius="full"
              className="my-avatar"
            />
            <Avatar
              name="User B"
              size="md"
              color="secondary"
              radius="full"
              className="my-avatar"
            />
            <Avatar
              name="User C"
              size="md"
              color="success"
              radius="full"
              className="my-avatar"
            />
            <Avatar
              name="User D"
              size="md"
              color="warning"
              radius="full"
              className="my-avatar"
            />
            <Avatar
              name="User D"
              size="md"
              color="danger"
              radius="full"
              className="my-avatar"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl  p-6 break-inside-avoid">
          <h3 className="text-lg font-medium mb-4">Avatar</h3>

          <div className="flex gap-4">
            <Accordion>
              <AccordionItem title="Accordion Item 1">
                Content for accordion item 1 goes here.
              </AccordionItem>
              <AccordionItem title="Accordion Item 2">
                Content for accordion item 2 goes here.
              </AccordionItem>
              <AccordionItem title="Accordion Item 3">
                Content for accordion item 3 goes here.
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl  p-6 break-inside-avoid">
          <h3 className="text-lg font-medium mb-4">Menu Accordion</h3>

          <div className="flex gap-4">
            <MenuAccordion
              navItems={[
                {
                  title: "Home",
                  titleLink: { cached_url: "/", linktype: "story" },
                },
                {
                  title: "Services",
                  navLinks: [
                    {
                      linkLabel: "Web Development",
                      link: {
                        cached_url: "services/web-development",
                        linktype: "story",
                      },
                    },
                    {
                      linkLabel: "SEO",
                      link: { cached_url: "services/seo", linktype: "story" },
                    },
                  ],
                },
                {
                  title: "About Us",
                  navLinks: [
                    {
                      linkLabel: "Web Development",
                      link: {
                        cached_url: "services/web-development",
                        linktype: "story",
                      },
                    },
                    {
                      linkLabel: "SEO",
                      link: { cached_url: "services/seo", linktype: "story" },
                    },
                  ],
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Color Picker */}
      {showColorPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center gap-4">
            <h3 className="text-lg font-medium capitalize">
              Select {activeColor} Color
            </h3>
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
