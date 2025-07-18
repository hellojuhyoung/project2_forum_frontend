import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    spacing: {
      xxs: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    fontSizes: {
      base: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    fontWeights: {
      regular: number;
      medium: number;
      bold: number;
    };
    colors: {
      primary: string;
      primaryDark: string;
      primaryHover: string;
      secondary: string;
      text: string;
      textLight: string;
      textPrimary: string;
      textSecondary: string;
      textBody: string;
      border: string;
      background: string;
      backgroundLight: string;
      footerBackground: string;
      accentBackground: string;
      success: string;
      successDark: string;
      danger: string;
      dangerDark: string;
      dangerHover?: string; // optional

      buttonDefault: string;
      buttonDefaultHover: string;
      borderColor: string;
      borderColorHover: string;
      disabledBackground: string;
      disabledText: string;
      disabledBorder: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
    };

    headerHeight: string;
  }
}
