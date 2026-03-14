export const roles = {
  PATIENT: 'patient',
  PROVIDER: 'provider',
  ADMIN: 'admin',
  SYSTEM_ADMIN: 'system_admin'
};

const permissions = {
  [roles.PATIENT]: ['appointments:read:own', 'records:read:own', 'messaging:read:own'],
  [roles.PROVIDER]: ['patients:read:assigned', 'appointments:manage', 'records:write'],
  [roles.ADMIN]: ['organization:read', 'organization:write', 'billing:manage'],
  [roles.SYSTEM_ADMIN]: ['*']
};

export function hasPermission(role, requiredPermission) {
  const rolePermissions = permissions[role] || [];
  return rolePermissions.includes('*') || rolePermissions.includes(requiredPermission);
}
