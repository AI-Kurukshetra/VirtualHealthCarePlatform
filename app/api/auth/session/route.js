import authController from '@/services/api/auth/controller';

export async function GET(request) {
  return authController.session(request);
}
