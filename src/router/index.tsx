// src/router/index.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { USER_ROLES } from "../constants/roles";

// Public pages
import HomePage from "@/pages/home/HomePage";
import Login from "@/pages/Login";
import SchoolInquiry from "@/pages/SchoolInquiry";
import NotFound from "@/pages/NotFound";
import SelfStudentSignup from "@/dashboard/selfstudent/SelfStudentSignUp";
import SelfTeacherSignup from "@/dashboard/selfteacher/SelfTeacherSignUp";

// Student Dashboard
import StudentDashboard from "@/dashboard/student/StudentDashboard";
import StudentOverview from "@/dashboard/student/views/Overview";
import StudentSubjectsView from "@/dashboard/student/views/SubjectsView";
import StudentExamsView from "@/dashboard/student/views/ExamsView";
import StudentChatbotView from "@/dashboard/student/views/ai-tutor/ChatbotView";
import StudentQuizGeneratorView from "@/dashboard/student/views/ai-tutor/QuizGeneratorView";
import StudentAssignmentsView from "@/dashboard/student/views/AssignmentsView";
import StudentScheduleView from "@/dashboard/student/views/ScheduleView";
import StudentResourcesView from "@/dashboard/student/views/ResourcesView";
import StudentAccountSettingsView from "@/dashboard/student/views/settings/AccountSettingsView";
import StudentGeneralSettingsView from "@/dashboard/student/views/settings/GeneralSettingsView";
import { StudentDashboardErrorFallback } from "@/dashboard/student/states/ErrorBoundary";

// School Admin Dashboard
import SchoolAdminDashboard from "@/dashboard/schooladmin/SchoolAdminDashboard";
import SchoolAdminOverview from "@/dashboard/schooladmin/views/Overview";
import SchoolAdminSubjectsView from "@/dashboard/schooladmin/views/SubjectsView";
import SchoolAdminRolesView from "@/dashboard/schooladmin/views/RolesView";
import SchoolAdminTeachersView from "@/dashboard/schooladmin/views/TeachersView";
import SchoolAdminClassesView from "@/dashboard/schooladmin/views/ClassesView";
import SchoolAdminStudentsView from "@/dashboard/schooladmin/views/StudentsView";
import SchoolAdminResourcesView from "@/dashboard/schooladmin/views/ResourcesView";
import SchoolAdminEdvanaBankView from "@/dashboard/schooladmin/views/EdvanaBankView";
import SchoolAdminParentsView from "@/dashboard/schooladmin/views/ParentsView";
import SchoolAdminSupportView from "@/dashboard/schooladmin/views/SupportView";
import { GeneralSettingsView, AccountSettingsView } from "@/dashboard/schooladmin/views/settings";
import { SchoolAdminDashboardErrorFallback } from "@/dashboard/schooladmin/states/ErrorBoundary";

// Other dashboards
import { SelfStudentDashboard } from "../dashboard/selfstudent/SelfStudentDashboard";
import { TeacherDashboard } from "../dashboard/teacher/TeacherDashboard";
import { ParentDashboard } from "../dashboard/parent/ParentDashboard";
import { SuperAdminDashboard } from "../dashboard/superadmin/SuperAdminDashboard";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
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

        {/* STUDENT (nested) */}
        <Route
          path="/dashboard/student"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.STUDENT}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        >
          {/* index → overview */}
          <Route index element={<StudentOverview />} />
          <Route path="overview" element={<StudentOverview />} />
          <Route path="subjects" element={<StudentSubjectsView />} />
          <Route path="exams" element={<StudentExamsView />} />
          <Route path="assignments" element={<StudentAssignmentsView />} />
          <Route path="schedule" element={<StudentScheduleView />} />
          <Route path="resources" element={<StudentResourcesView />} />

          {/* AI tutor group */}
          <Route path="ai-tutor">
            <Route index element={<Navigate to="chatbot" replace />} />
            <Route path="chatbot" element={<StudentChatbotView />} />
            <Route path="quiz-generator" element={<StudentQuizGeneratorView />} />
          </Route>

          {/* Settings group */}
          <Route path="settings">
            <Route index element={<Navigate to="general" replace />} />
            <Route path="general" element={<StudentGeneralSettingsView />} />
            <Route path="account" element={<StudentAccountSettingsView />} />
          </Route>

          {/* student catch-all */}
          <Route path="*" element={<StudentDashboardErrorFallback />} />
        </Route>

        {/* SCHOOL ADMIN Dashboard */}
        <Route
          path="/dashboard/schooladmin"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.ADMIN}>
              <SchoolAdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<SchoolAdminOverview />} />
          <Route path="overview" element={<SchoolAdminOverview />} />
          <Route path="subjects" element={<SchoolAdminSubjectsView />} />
          <Route path="roles" element={<SchoolAdminRolesView />} />
          <Route path="teachers" element={<SchoolAdminTeachersView />} />
          <Route path="classes" element={<SchoolAdminClassesView />} />
          <Route path="students" element={<SchoolAdminStudentsView />} />
          <Route path="resources" element={<SchoolAdminResourcesView />} />
          <Route path="edvana-bank" element={<SchoolAdminEdvanaBankView />} />
          <Route path="parents" element={<SchoolAdminParentsView />} />
          <Route path="support" element={<SchoolAdminSupportView />} />
          <Route path="settings">
            <Route index element={<Navigate to="general" replace />} />
            <Route path="general" element={<GeneralSettingsView />} />
            <Route path="account" element={<AccountSettingsView />} />
          </Route>
       <Route path="*" element={<SchoolAdminDashboardErrorFallback />} />
        </Route>

        {/* OTHER DASHBOARDS (can be nested later the same way) */}
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
          path="/dashboard/superadmin/*"
          element={
            <ProtectedRoute requiredRole={USER_ROLES.SUPER_ADMIN}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
