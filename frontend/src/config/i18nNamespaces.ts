export const globalNamespaces = ["common"];

// Define namespaces specifically for the ClientServices module/folder
export const ClientServicesNamespaces = [
  "ClientServices.login",

  // Add any other pages within ClientServices here
];

// Combine all namespaces into a single array for i18n initialization
export const allNamespaces = [
  ...globalNamespaces,
  ...ClientServicesNamespaces,
  // Add other feature/module namespace arrays here as you create them
];
