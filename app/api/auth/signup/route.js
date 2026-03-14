import authController from '@/services/api/auth/controller';

export async function POST(request) {
  return authController.signup(request);
}
