import { z } from 'zod';
import { errorResponse, successResponse } from '@/utils/api-response';
import { mapError } from '@/utils/error-handler';
import { getRequestAuthContext } from '@/utils/request-auth-context';
import analyticsService from './service';

const querySchema = z.object({
  organization_id: z.string().uuid().optional()
});

const analyticsController = {
  async summary(request) {
    try {
      const authContext = await getRequestAuthContext(request);
      const query = Object.fromEntries(request.nextUrl.searchParams.entries());
      const parsed = querySchema.parse(query);
      const data = await analyticsService.getKpis(parsed.organization_id || authContext.organizationId);
      return successResponse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return errorResponse('Validation failed.', 400, error.flatten());
      }

      const mapped = mapError(error);
      return errorResponse(mapped.message, mapped.status, mapped.details);
    }
  }
};

export default analyticsController;
