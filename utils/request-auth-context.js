import { AUTH_COOKIE_NAME } from '@/utils/auth-cookie';
import { getServerSupabaseClient } from '@/services/supabase/server-client';

const ALLOWED_APP_ROLES = new Set(['patient', 'provider', 'admin', 'system_admin']);

function decodeJwtPayload(token) {
  try {
    const payload = token.split('.')[1];
    if (!payload) {
      return null;
    }

    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
    const decoded = Buffer.from(padded, 'base64').toString('utf-8');
    return JSON.parse(decoded);
  } catch (_error) {
    return null;
  }
}

function resolveAppRole(payload) {
  const role = payload?.user_metadata?.role;
  if (ALLOWED_APP_ROLES.has(role)) {
    return role;
  }

  return 'admin';
}

async function ensureUserOrgContext({ userId, email, role }) {
  const supabase = getServerSupabaseClient();
  const { data: existing, error: existingError } = await supabase
    .from('users')
    .select('organization_id')
    .eq('id', userId)
    .maybeSingle();

  if (existingError) {
    return { userId, organizationId: null };
  }

  if (existing?.organization_id) {
    return { userId, organizationId: existing.organization_id };
  }

  const safeEmail = (email || `${userId}@local`).toLowerCase();
  const slugBase = safeEmail
    .split('@')[0]
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 30);
  const slug = `${slugBase || 'org'}-${userId.slice(0, 8)}`;

  const { data: organization, error: orgError } = await supabase
    .from('organizations')
    .insert({
      name: `${safeEmail} Organization`,
      slug
    })
    .select('id')
    .single();

  if (orgError || !organization?.id) {
    return { userId, organizationId: null };
  }

  const { error: userInsertError } = await supabase.from('users').upsert(
    {
      id: userId,
      email: safeEmail,
      role,
      organization_id: organization.id
    },
    { onConflict: 'id' }
  );

  if (userInsertError) {
    return { userId, organizationId: null };
  }

  return { userId, organizationId: organization.id };
}

export async function getRequestAuthContext(request) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    return { userId: null, organizationId: null };
  }

  const payload = decodeJwtPayload(token);
  const userId = payload?.sub || null;

  if (!userId) {
    return { userId: null, organizationId: null };
  }

  return ensureUserOrgContext({
    userId,
    email: payload?.email,
    role: resolveAppRole(payload)
  });
}
