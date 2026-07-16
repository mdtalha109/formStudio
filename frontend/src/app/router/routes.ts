export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  BUILDER: '/forms/:formId/builder',
  PUBLIC_FORM: '/f/:slug',
} as const;

export function buildBuilderPath(formId: string): string {
  return `/forms/${formId}/builder`;
}

export function buildPublicFormPath(slug: string): string {
  return `/f/${slug}`;
}
