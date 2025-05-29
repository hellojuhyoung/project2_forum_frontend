import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "40px",
  },
  fontSizes: {
    sm: "0.875rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.5rem",
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
  colors: {
    primary: "#0070f3",
    primaryDark: "#004a99",
    primaryHover: "#007bff",
    secondary: "#ff4081",
    text: "#333",
    textLight: "#eee",
    textPrimary: "#212121", // new
    textSecondary: "#757575", // new
    textBody: "#4f4f4f", // new
    border: "#ddd",
    background: "#fff",
    backgroundLight: "#ffffff",
    footerBackground: "#222",
    accentBackground: "#f5f5f5", // new
    success: "#28a745", // new
    successDark: "#1e7e34", // new
    danger: "#dc3545", // new
    dangerDark: "#a71d2a", // new
    dangerHover: "#c82333", // optional new
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
  },
};
