import { Routes, Route, Navigate } from "react-router-dom";
import { ErrorBoundary, StudentDashboardErrorFallback } from "./states/ErrorBoundary";
import OverviewView from "./views/OverviewView";
import SubjectsView from "./views/SubjectsView";
import ExamsView from "./views/ExamsView";
import ChatbotView from "./views/ai-tutor/ChatbotView";
import QuizGeneratorView from "./views/ai-tutor/QuizGeneratorView";
import AssignmentsView from "./views/AssignmentsView";
import ScheduleView from "./views/ScheduleView";
import ResourcesView from "./views/ResourcesView";
import SupportView from "./views/SupportView";
import AccountSettingsView from "./views/settings/AccountSettingsView";
import GeneralSettingsView from "./views/settings/GeneralSettingsView";

export function StudentRoutes() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route index element={<OverviewView />} />
        <Route path="overview" element={<OverviewView />} />
        <Route path="subjects" element={<SubjectsView />} />
        <Route path="exams" element={<ExamsView />} />
        <Route path="ai-tutor/chatbot" element={<ChatbotView />} />
        <Route path="ai-tutor/quiz-generator" element={<QuizGeneratorView />} />
        <Route path="ai-tutor" element={<Navigate to="ai-tutor/chatbot" replace />} />
        <Route path="assignments" element={<AssignmentsView />} />
        <Route path="schedule" element={<ScheduleView />} />
        <Route path="resources" element={<ResourcesView />} />
        <Route path="settings/account" element={<AccountSettingsView />} />
        <Route path="settings/general" element={<GeneralSettingsView />} />
        <Route path="settings" element={<Navigate to="settings/general" replace />} />
        <Route path="support" element={<SupportView />} />
        <Route path="*" element={<StudentDashboardErrorFallback />} />
      </Routes>
    </ErrorBoundary>
  );
}