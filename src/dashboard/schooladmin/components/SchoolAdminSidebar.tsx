import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  BookOpen, 
  BarChart3,
  Settings,
  Shield
} from 'lucide-react';
import { cn } from '../../../utils/cn';

const sidebarItems = [
  { 
    icon: Home, 
    label: 'Overview', 
    href: '/dashboard/schooladmin/overview' 
  },
  { 
    icon: Users, 
    label: 'User Management', 
    href: '/dashboard/schooladmin/users' 
  },
  { 
    icon: BookOpen, 
    label: 'Course Management', 
    href: '/dashboard/schooladmin/courses' 
  },
  { 
    icon: BarChart3, 
    label: 'Reports & Analytics', 
    href: '/dashboard/schooladmin/reports' 
  },
  { 
    icon: Settings, 
    label: 'School Settings', 
    href: '/dashboard/schooladmin/settings' 
  }
];

export function SchoolAdminSidebar() {
  const location = useLocation();

  return (
    <div className="glass-sidebar h-full w-64 p-4 space-y-2">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1 flex items-center">
          <Shield className="h-5 w-5 mr-2 text-brand-brown" />
          School Admin
        </h2>
        <p className="text-sm text-gray-600">Manage school operations</p>
      </div>
      
      <nav className="space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href || 
            (item.href === '/dashboard/schooladmin/overview' && location.pathname === '/dashboard/schooladmin');
          
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