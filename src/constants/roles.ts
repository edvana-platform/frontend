export const USER_ROLES = {
  STUDENT: 'student',
    SELFSTUDENT: 'selfstudent',
  TEACHER: 'teacher',
  PARENT: 'parent',
  ADMIN: 'admin',
  SUPER_ADMIN: 'superadmin',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

export const ROLE_LABELS = {
  [USER_ROLES.STUDENT]: 'Student',
    [USER_ROLES.SELFSTUDENT]: 'Self Student',
  [USER_ROLES.TEACHER]: 'Teacher',
  [USER_ROLES.PARENT]: 'Parent',
  [USER_ROLES.ADMIN]: 'School Administrator',
  [USER_ROLES.SUPER_ADMIN]: 'Super Administrator',
};

export const ROLE_PERMISSIONS = {
  [USER_ROLES.STUDENT]: ['view_courses', 'take_assessments', 'view_progress'],
    [USER_ROLES.SELFSTUDENT]: ['view_courses', 'take_assessments', 'view_progress'],
  [USER_ROLES.TEACHER]: ['create_courses', 'grade_assessments', 'view_student_progress'],
  [USER_ROLES.PARENT]: ['view_child_progress', 'communicate_with_teachers'],
  [USER_ROLES.ADMIN]: ['manage_teachers', 'view_school_analytics', 'manage_curriculum'],
  [USER_ROLES.SUPER_ADMIN]: ['manage_all_schools', 'system_administration'],
};

export const normalizeUserRole = (role: string): UserRole | null => {
  const normalized = role.toLowerCase().replace(/[\s_]/g, ""); // "school admin" → "schooladmin"
  const roles = Object.values(USER_ROLES);
  return roles.includes(normalized as UserRole) ? (normalized as UserRole) : null;
};


export const hasPermission = (role: string, permission: string): boolean => {
  const normalizedRole = normalizeUserRole(role);
  if (!normalizedRole) return false;
  return ROLE_PERMISSIONS[normalizedRole]?.includes(permission) ?? false;
};
