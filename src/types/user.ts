// types/user.ts

import { USER_ROLES } from "@/constants/roles";

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export interface BaseUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  schoolId: string;
  avatar?: string;
  phone?: string;
  grade?: string;
  gradeCombination?: string;
  subGrade?: string;
  parentId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthUser extends BaseUser {
  password?: string;
}

export interface UserProfile extends BaseUser {
  address?: string;
  dateOfBirth?: Date;
  gender?: "male" | "female" | "other";
  parentName?: string;
  parentPhone?: string;
  emergencyContact?: string;
}

export type LoginUser = AuthUser & Partial<UserProfile> & { password: string };