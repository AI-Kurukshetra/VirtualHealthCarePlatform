import analyticsController from '@/services/api/analytics/controller';

export async function GET(request) {
  return analyticsController.summary(request);
}
