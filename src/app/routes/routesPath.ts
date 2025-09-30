export const RoutePaths = {
  // Invoice routes
  INVOICES: "/invoices",
  
  // Other common routes
  DASHBOARD: "/dashboard",
  SETTINGS: "/settings",
  PERMISSIONS: "/settings/permissions",
  ADDRESS_BOOK: "/settings/address-book",
  HIRING_TEMPLATES: "/settings/hiring-templates",
  
  // Auth routes
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD: "/auth/forgot-password",
  
  // Profile routes
  PROFILE: "/profile",
} as const;

export type RoutePathType = typeof RoutePaths[keyof typeof RoutePaths];