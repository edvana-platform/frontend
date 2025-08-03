import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { OverviewView } from './views/OverviewView';
import { UsersView } from './views/UsersView';
import { CoursesView } from './views/CoursesView';
import { ReportsView } from './views/ReportsView';
import { SettingsView } from './views/SettingsView';

export function SchoolAdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<OverviewView />} />
      <Route path="/overview" element={<OverviewView />} />
      <Route path="/users" element={<UsersView />} />
      <Route path="/courses" element={<CoursesView />} />
      <Route path="/reports" element={<ReportsView />} />
      <Route path="/settings" element={<SettingsView />} />
      <Route path="*" element={<OverviewView />} />
    </Routes>
  );
}