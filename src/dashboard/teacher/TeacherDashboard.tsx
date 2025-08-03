import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { TeacherSidebar } from './components/TeacherSidebar';
import { TeacherRoutes } from './routes';

export function TeacherDashboard() {
  return (
    <DashboardLayout 
      sidebar={<TeacherSidebar />}
      title="Teacher Dashboard"
    >
      <TeacherRoutes />
    </DashboardLayout>
  );
}