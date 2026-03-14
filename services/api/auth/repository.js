import { getServerAuthClient } from '@/services/supabase/auth-client';
import { getServerSupabaseClient } from '@/services/supabase/server-client';
import { AppError, withErrorHandling } from '@/utils/error-handler';

async function ensureUserProfile(user, preferredRole = 'patient') {
  if (!user?.id || !user?.email) {
    return;
  }

  const supabase = getServerSupabaseClient();
  const { data: existing, error: existingError } = await supabase
    .from('users')
    .select('id')
    .eq('id', user.id)
    .maybeSingle();

  if (existingError) {
    throw new AppError(existingError.message, 500, existingError);
  }

  if (existing) {
    return;
  }

  const slugBase = user.email
    .toLowerCase()
    .split('@')[0]
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 30);
  const slug = `${slugBase || 'org'}-${user.id.slice(0, 8)}`;

  const { data: organization, error: organizationError } = await supabase
    .from('organizations')
    .insert({
      name: `${user.email} Organization`,
      slug
    })
    .select('id')
    .single();

  if (organizationError) {
    throw new AppError(organizationError.message, 500, organizationError);
  }

  const role = user.user_metadata?.role || preferredRole;
  const { error: userInsertError } = await supabase.from('users').insert({
    id: user.id,
    email: user.email,
    role,
    organization_id: organization.id
  });

  if (userInsertError) {
    throw new AppError(userInsertError.message, 500, userInsertError);
  }
}

const authRepository = {
  async signup({ email, password, role }) {
    return withErrorHandling(async () => {
      const supabase = getServerAuthClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { role }
        }
      });

      if (error) {
        throw new AppError(error.message, 400, error);
      }

      if (data?.user) {
        await ensureUserProfile(data.user, role);
      }

      return data;
    });
  },

  async login({ email, password }) {
    return withErrorHandling(async () => {
      const supabase = getServerAuthClient();
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        throw new AppError(error.message, 401, error);
      }

      if (data?.user) {
        await ensureUserProfile(data.user, data.user.user_metadata?.role);
      }

      return data;
    });
  },

  async logout() {
    return withErrorHandling(async () => {
      const supabase = getServerAuthClient();
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new AppError(error.message, 500, error);
      }

      return { loggedOut: true };
    });
  },

  async session(accessToken) {
    return withErrorHandling(async () => {
      const supabase = getServerAuthClient();
      const { data, error } = await supabase.auth.getUser(accessToken);
      if (error) {
        throw new AppError(error.message, 401, error);
      }

      return data.user;
    });
  }
};

export default authRepository;
