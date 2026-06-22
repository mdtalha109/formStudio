export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  BUILDER: '/forms/:formId/builder',
} as const;

export function buildBuilderPath(formId: string): string {
  return `/forms/${formId}/builder`;
}
