import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { SchoolAdminSidebar } from './components/SchoolAdminSidebar';
import { SchoolAdminRoutes } from './routes';

export function SchoolAdminDashboard() {
  return (
    <DashboardLayout 
      sidebar={<SchoolAdminSidebar />}
      title="School Admin Dashboard"
    >
      <SchoolAdminRoutes />
    </DashboardLayout>
  );
}