export const AUTH_COOKIE_NAME = 'vhp_session';
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export function getAuthCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: AUTH_COOKIE_MAX_AGE
  };
}
