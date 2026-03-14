import { getSupabaseClient } from '@/services/supabase-client';

export function subscribeToOrganizationChannel(organizationId, callback) {
  const client = getSupabaseClient();

  const channel = client
    .channel(`organization-${organizationId}`)
    .on('broadcast', { event: 'message' }, callback)
    .subscribe();

  return () => {
    client.removeChannel(channel);
  };
}
