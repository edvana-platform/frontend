import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { BookOpen, Plus } from 'lucide-react';

export function CoursesView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-600 mt-1">Manage curriculum and course offerings</p>
        </div>
        <Button className="glass-button text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create Course
        </Button>
      </div>

      <div className="glass-card-elevated p-6">
        <h2 className="text-xl font-semibold mb-4">Course management interface coming soon</h2>
        <p className="text-gray-600">
          This section will include tools to create, edit, and manage courses, 
          curriculum standards, and academic programs.
        </p>
      </div>
    </div>
  );
}