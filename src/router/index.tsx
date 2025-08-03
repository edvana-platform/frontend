import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { USER_ROLES } from "../constants/roles";

// Public pages
import HomePage from "../pages/home/HomePage";
import Login from "../pages/Login";
import SchoolInquiry from "@/pages/SchoolInquiry";
import NotFound from "../pages/NotFound";

// Dashboard components
import  StudentDashboard  from "../dashboard/student/StudentDashboard";
import { SelfStudentDashboard } from "../dashboard/selfstudent/SelfStudentDashboard";
import { TeacherDashboard } from "../dashboard/teacher/TeacherDashboard";
import { ParentDashboard } from "../dashboard/parent/ParentDashboard";
import { SchoolAdminDashboard } from "../dashboard/schooladmin/SchoolAdminDashboard";
import { SuperAdminDashboard } from "../dashboard/superadmin/SuperAdminDashboard";
import SelfStudentSignup from "@/dashboard/selfstudent/SelfStudentSignUp";
import SelfTeacherSignup from "@/dashboard/selfteacher/SelfTeacherSignUp";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/school-inquiry" element={<SchoolInquiry />} />
        <Route
          path="/selfstudent/student-signup"
          element={<SelfStudentSignup />}
        />
        <Route
          path="/selfteacher/teacher-signup"
          element={<SelfTeacherSignup />}
        />

        {/* Protected dashboard routes */}
        <Route
          path="/dashboard/student/*"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.STUDENT}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        {/* Protected dashboard routes */}
        <Route
          path="/dashboard/selfstudent/*"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.SELFSTUDENT}>
              <SelfStudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/teacher/*"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.TEACHER}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/parent/*"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.PARENT}>
              <ParentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/schooladmin/*"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.SCHOOL_ADMIN}>
              <SchoolAdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/superadmin/*"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.SUPER_ADMIN}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch all - 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
