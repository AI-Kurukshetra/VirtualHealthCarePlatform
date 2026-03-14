import controller from '@/services/api/clinical-notes/controller';

export async function GET(request) {
  return controller.list(request);
}

export async function POST(request) {
  return controller.create(request);
}
