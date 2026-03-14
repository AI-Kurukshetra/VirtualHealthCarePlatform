import { getServerSupabaseClient } from '@/services/supabase/server-client';
import { AppError, withErrorHandling } from '@/utils/error-handler';

const analyticsRepository = {
  async getKpis(organizationId, limit = 25) {
    return withErrorHandling(async () => {
      const supabase = getServerSupabaseClient();
      const filters = organizationId ? { organization_id: organizationId } : null;

      async function count(table) {
        if (table === 'claims' && filters?.organization_id) {
          const { data, error } = await supabase
            .from('claims')
            .select('id, billing!inner(organization_id)')
            .limit(limit)
            .eq('billing.organization_id', filters.organization_id);

          if (error) {
            throw new AppError(error.message, 500, error);
          }

          return data?.length || 0;
        }

        let query = supabase.from(table).select('id').limit(limit);
        if (filters?.organization_id) {
          query = query.eq('organization_id', filters.organization_id);
        }

        const { data, error } = await query;
        if (error) {
          throw new AppError(error.message, 500, error);
        }

        return data?.length || 0;
      }

      const [patients, providers, appointments, claims] = await Promise.all([
        count('patients'),
        count('providers'),
        count('appointments'),
        count('claims')
      ]);

      return {
        patients,
        providers,
        appointments,
        claims,
        generated_at: new Date().toISOString()
      };
    });
  }
};

export default analyticsRepository;
