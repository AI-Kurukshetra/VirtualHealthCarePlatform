import { getServerSupabaseClient } from '@/services/supabase/server-client';
import { AppError, withErrorHandling } from '@/utils/error-handler';

export function createBaseRepository(tableName, options = {}) {
  const organizationScoped = options.organizationScoped !== false;
  const orderByColumn = options.orderByColumn || 'created_at';
  const orderAscending = options.orderAscending === true;

  function toAppError(error) {
    const code = error?.code;

    if (code === '23505') {
      return new AppError(error.message, 409, error);
    }

    if (code === '23503' || code === '23502' || code === '22P02' || code === '22007' || code === '22008') {
      return new AppError(error.message, 400, error);
    }

    return new AppError(error?.message || 'Database operation failed.', 500, error);
  }

  function withOrganizationFilter(query, organizationId) {
    if (organizationScoped && organizationId) {
      return query.eq('organization_id', organizationId);
    }

    return query;
  }

  return {
    async list({ organization_id, limit = 25, offset = 0 }) {
      return withErrorHandling(async () => {
        const supabase = getServerSupabaseClient();
        let query = supabase
          .from(tableName)
          .select('*')
          .range(offset, offset + limit - 1)
          .order(orderByColumn, { ascending: orderAscending });
        query = withOrganizationFilter(query, organization_id);

        const { data, error } = await query;
        if (error) {
          throw toAppError(error);
        }

        return data;
      });
    },

    async getById(id, organization_id) {
      return withErrorHandling(async () => {
        const supabase = getServerSupabaseClient();
        let query = supabase.from(tableName).select('*').eq('id', id).maybeSingle();
        query = withOrganizationFilter(query, organization_id);

        const { data, error } = await query;
        if (error) {
          throw toAppError(error);
        }

        return data;
      });
    },

    async create(payload) {
      return withErrorHandling(async () => {
        const supabase = getServerSupabaseClient();
        const { data, error } = await supabase.from(tableName).insert(payload).select('*').single();
        if (error) {
          throw toAppError(error);
        }

        return data;
      });
    },

    async updateById(id, payload, organization_id) {
      return withErrorHandling(async () => {
        const supabase = getServerSupabaseClient();
        let query = supabase.from(tableName).update(payload).eq('id', id);
        query = withOrganizationFilter(query, organization_id);

        const { data, error } = await query.select('*').single();
        if (error) {
          throw toAppError(error);
        }

        return data;
      });
    },

    async deleteById(id, organization_id) {
      return withErrorHandling(async () => {
        const supabase = getServerSupabaseClient();
        let query = supabase.from(tableName).delete().eq('id', id);
        query = withOrganizationFilter(query, organization_id);

        const { error } = await query;
        if (error) {
          throw toAppError(error);
        }

        return { id };
      });
    }
  };
}
