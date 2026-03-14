import controller from '@/services/api/lab-orders/controller';

export async function GET(request, { params }) {
  return controller.getById(request, params.id);
}

export async function PATCH(request, { params }) {
  return controller.updateById(request, params.id);
}

export async function PUT(request, { params }) {
  return controller.updateById(request, params.id);
}

export async function DELETE(request, { params }) {
  return controller.deleteById(request, params.id);
}
