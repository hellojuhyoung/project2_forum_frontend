export const globalNamespaces = ["common"];

// Define namespaces specifically for the ClientServices module/folder
export const ClientServicesNamespaces = [
  "ClientServices.login",
  "ClientServices.forgotusername",
  "ClientServices.forgotpassword",
  "ClientServices.resetpassword",
  "ClientServices.signup",
  "ClientServices.profile",

  // Add any other pages within ClientServices here
];

export const CreatePostNamespaces = ["createpost"];
export const EditPostNamespaces = ["editpost"];
export const DetailFeedNamespaces = ["detailfeed"];
export const MainFeedNamespaces = ["mainfeed"];
export const HomeNamespaces = ["home"];

export const MarginsNamespaces = ["Margins.header", "Margins.footer"];

// Combine all namespaces into a single array for i18n initialization
export const allNamespaces = [
  ...globalNamespaces,
  ...ClientServicesNamespaces,
  ...CreatePostNamespaces,
  ...EditPostNamespaces,
  ...DetailFeedNamespaces,
  ...MainFeedNamespaces,
  ...HomeNamespaces,
  // Add other feature/module namespace arrays here as you create them
];
