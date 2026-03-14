import { z } from 'zod';
import { errorResponse, successResponse } from '@/utils/api-response';
import { mapError } from '@/utils/error-handler';
import { AUTH_COOKIE_NAME, getAuthCookieOptions } from '@/utils/auth-cookie';
import authService from './service';
import { loginSchema, signUpSchema } from './schema';

const authController = {
  async signup(request) {
    try {
      const payload = await request.json();
      const parsed = signUpSchema.parse(payload);
      const data = await authService.signup(parsed);
      return successResponse(data, 201);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return errorResponse('Validation failed.', 400, error.flatten());
      }
      const mapped = mapError(error);
      return errorResponse(mapped.message, mapped.status, mapped.details);
    }
  },

  async login(request) {
    try {
      const payload = await request.json();
      const parsed = loginSchema.parse(payload);
      const data = await authService.login(parsed);
      const response = successResponse(data);

      if (data?.session?.access_token) {
        response.cookies.set(AUTH_COOKIE_NAME, data.session.access_token, getAuthCookieOptions());
      }

      return response;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return errorResponse('Validation failed.', 400, error.flatten());
      }
      const mapped = mapError(error);
      return errorResponse(mapped.message, mapped.status, mapped.details);
    }
  },

  async logout(request) {
    try {
      const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
      if (token) {
        await authService.logout();
      }

      const response = successResponse({ loggedOut: true });
      response.cookies.set(AUTH_COOKIE_NAME, '', { ...getAuthCookieOptions(), maxAge: 0 });
      return response;
    } catch (error) {
      const mapped = mapError(error);
      const response = errorResponse(mapped.message, mapped.status, mapped.details);
      response.cookies.set(AUTH_COOKIE_NAME, '', { ...getAuthCookieOptions(), maxAge: 0 });
      return response;
    }
  },

  async session(request) {
    try {
      const accessToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;
      if (!accessToken) {
        return successResponse({ authenticated: false, user: null });
      }

      const user = await authService.session(accessToken);
      return successResponse({ authenticated: true, user });
    } catch (error) {
      const response = successResponse({ authenticated: false, user: null });
      response.cookies.set(AUTH_COOKIE_NAME, '', { ...getAuthCookieOptions(), maxAge: 0 });
      return response;
    }
  }
};

export default authController;
