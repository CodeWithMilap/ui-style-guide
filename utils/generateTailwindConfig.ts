// utils/generateTailwindConfig.ts
import { ColorPalette } from "@/types/colorTypes"; // Import the correct ColorPalette type

export const generateTailwindConfig = (colors: ColorPalette) => {
  return `
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '${colors.primary}',
          secondary: '${colors.secondary}',
          info: '${colors.info}',
          success: '${colors.success}',
          warning: '${colors.warning}',
          error: '${colors.error}',
      },
    },
  },
};
`;
};
