import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  BookOpen, 
  Users, 
  ClipboardCheck,
  Settings,
  Home
} from 'lucide-react';
import { cn } from '../../../utils/cn';

const sidebarItems = [
  { 
    icon: Home, 
    label: 'Overview', 
    href: '/dashboard/teacher/overview' 
  },
  { 
    icon: BookOpen, 
    label: 'My Courses', 
    href: '/dashboard/teacher/courses' 
  },
  { 
    icon: Users, 
    label: 'Students', 
    href: '/dashboard/teacher/students' 
  },
  { 
    icon: ClipboardCheck, 
    label: 'Assessments', 
    href: '/dashboard/teacher/assessments' 
  },
  { 
    icon: Settings, 
    label: 'Settings', 
    href: '/dashboard/teacher/settings' 
  }
];

export function TeacherSidebar() {
  const location = useLocation();

  return (
    <div className="glass-sidebar h-full w-64 p-4 space-y-2">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Teacher Portal</h2>
        <p className="text-sm text-gray-600">Manage courses & students</p>
      </div>
      
      <nav className="space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href || 
            (item.href === '/dashboard/teacher/overview' && location.pathname === '/dashboard/teacher');
          
          return (
            <Link key={item.href} to={item.href}>
              <div
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive 
                    ? "glass-card-elevated text-brand-teal" 
                    : "text-gray-700 hover:glass-button-secondary hover:text-brand-teal"
                )}
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}