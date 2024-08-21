export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const AUTH_URL = `${API_URL}/auth`;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';

export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';

export const SENTRY_DSN = process.env.SENTRY_DSN || '';

export const DEFAULT_PROFILE_PICTURE =
  'https://via.placeholder.com/150';