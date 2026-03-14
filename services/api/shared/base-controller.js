import { z } from 'zod';
import { errorResponse, successResponse } from '@/utils/api-response';
import { mapError } from '@/utils/error-handler';
import { getRequestAuthContext } from '@/utils/request-auth-context';

function parseQuery(searchParams) {
  const queryObject = {};

  for (const [key, value] of searchParams.entries()) {
    queryObject[key] = value;
  }

  return queryObject;
}

function valueOrUndefined(value) {
  return value == null ? undefined : value;
}

export function createBaseController({ service, listSchema, createSchema, updateSchema }) {
  return {
    async list(request) {
      try {
        const authContext = await getRequestAuthContext(request);
        const query = parseQuery(request.nextUrl.searchParams);
        const parsed = listSchema.parse({
          ...query,
          organization_id: valueOrUndefined(query.organization_id || authContext.organizationId)
        });
        const records = await service.list(parsed);
        return successResponse(records);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return errorResponse('Validation failed.', 400, error.flatten());
        }

        const mapped = mapError(error);
        return errorResponse(mapped.message, mapped.status, mapped.details);
      }
    },

    async create(request) {
      try {
        const authContext = await getRequestAuthContext(request);
        const payload = await request.json();
        const parsed = createSchema.parse({
          ...payload,
          user_id: valueOrUndefined(payload.user_id || authContext.userId),
          organization_id: valueOrUndefined(payload.organization_id || authContext.organizationId)
        });
        const record = await service.create(parsed);
        return successResponse(record, 201);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return errorResponse('Validation failed.', 400, error.flatten());
        }

        const mapped = mapError(error);
        return errorResponse(mapped.message, mapped.status, mapped.details);
      }
    },

    async getById(request, id) {
      try {
        const authContext = await getRequestAuthContext(request);
        const query = parseQuery(request.nextUrl.searchParams);
        const orgId = valueOrUndefined(query.organization_id || authContext.organizationId);
        const record = await service.getById(id, orgId);
        return successResponse(record);
      } catch (error) {
        const mapped = mapError(error);
        return errorResponse(mapped.message, mapped.status, mapped.details);
      }
    },

    async updateById(request, id) {
      try {
        const authContext = await getRequestAuthContext(request);
        const payload = await request.json();
        const parsed = updateSchema.parse({
          ...payload,
          id,
          organization_id: valueOrUndefined(payload.organization_id || authContext.organizationId)
        });
        const { id: _id, ...updatePayload } = parsed;
        const record = await service.updateById(
          id,
          updatePayload,
          valueOrUndefined(updatePayload.organization_id || authContext.organizationId)
        );
        return successResponse(record);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return errorResponse('Validation failed.', 400, error.flatten());
        }

        const mapped = mapError(error);
        return errorResponse(mapped.message, mapped.status, mapped.details);
      }
    },

    async deleteById(request, id) {
      try {
        const authContext = await getRequestAuthContext(request);
        const query = parseQuery(request.nextUrl.searchParams);
        const orgId = valueOrUndefined(query.organization_id || authContext.organizationId);
        const result = await service.deleteById(id, orgId);
        return successResponse(result);
      } catch (error) {
        const mapped = mapError(error);
        return errorResponse(mapped.message, mapped.status, mapped.details);
      }
    }
  };
}
