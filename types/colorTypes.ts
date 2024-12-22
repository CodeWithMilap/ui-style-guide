// types/colorTypes.ts

// Define the full color palette type
export type ColorPalette = {
  primary: string;
  secondary: string;
  info: string;
  success: string;
  warning: string;
  error: string;
};

export interface ColorConfig {
  state?: {
    info: string;
    success: string;
    warning: string;
    error: string;
  };
  black?: {
    black1: string;
    black2: string;
    black3: string;
    white: string;
  };
  grey?: {
    grey1: string;
    grey2: string;
    grey3: string;
    grey4: string;
    grey5: string;
  };
}
