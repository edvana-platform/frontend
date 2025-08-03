import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { OverviewView } from './views/OverviewView';
import { CoursesView } from './views/CoursesView';
import { StudentsView } from './views/StudentsView';
import { AssessmentView } from './views/AssessmentView';
import { SettingsView } from './views/SettingsView';

export function TeacherRoutes() {
  return (
    <Routes>
      <Route path="/" element={<OverviewView />} />
      <Route path="/overview" element={<OverviewView />} />
      <Route path="/courses" element={<CoursesView />} />
      <Route path="/students" element={<StudentsView />} />
      <Route path="/assessments" element={<AssessmentView />} />
      <Route path="/settings" element={<SettingsView />} />
      <Route path="*" element={<OverviewView />} />
    </Routes>
  );
}