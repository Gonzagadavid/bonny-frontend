export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  VOLUNTEER = "VOLUNTEER",
}

const permissionsRule: Record<UserRole, UserRole[]> = {
  [UserRole.USER]: [UserRole.USER],
  [UserRole.VOLUNTEER]: [UserRole.USER, UserRole.VOLUNTEER],
  [UserRole.ADMIN]: [UserRole.USER, UserRole.VOLUNTEER, UserRole.ADMIN],
};

export const checkPermissions = (
  requiredPermission: UserRole,
  userPermission: UserRole,
) => {
  const userPermissions = permissionsRule?.[userPermission];
  if (
    !requiredPermission ||
    (userPermission && userPermissions.includes(requiredPermission))
  ) {
    return true;
  }
  return false;
};
