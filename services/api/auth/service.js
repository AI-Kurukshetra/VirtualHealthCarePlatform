import { withErrorHandling } from '@/utils/error-handler';
import authRepository from './repository';

const authService = {
  async signup(input) {
    return withErrorHandling(async () => authRepository.signup(input));
  },

  async login(input) {
    return withErrorHandling(async () => authRepository.login(input));
  },

  async logout() {
    return withErrorHandling(async () => authRepository.logout());
  },

  async session(accessToken) {
    return withErrorHandling(async () => authRepository.session(accessToken));
  }
};

export default authService;
