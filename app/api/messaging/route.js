import controller from '@/services/api/messaging/controller';

export async function GET(request) {
  return controller.list(request);
}

export async function POST(request) {
  return controller.create(request);
}
