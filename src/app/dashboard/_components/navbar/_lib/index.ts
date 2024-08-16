export const navigation = [
  { name: "Chat", href: "/dashboard" },
  { name: "Templates", href: "/dashboard/templates" },
];

export const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Top up", href: "#", onClick: () => console.log("Top up") },
  { name: "Sign out", href: "/api/auth/signout" },
];
