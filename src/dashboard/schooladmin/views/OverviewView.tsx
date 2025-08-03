import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  TrendingUp,
  UserPlus,
  Plus,
  AlertCircle,
  Calendar
} from 'lucide-react';

export function OverviewView() {
  const stats = [
    { title: 'Total Students', value: '1,248', icon: Users, color: 'text-brand-teal', change: '+12%' },
    { title: 'Total Teachers', value: '86', icon: GraduationCap, color: 'text-brand-accent', change: '+5%' },
    { title: 'Active Courses', value: '24', icon: BookOpen, color: 'text-brand-brown', change: '+2%' },
    { title: 'School Performance', value: '87%', icon: TrendingUp, color: 'text-brand-primary', change: '+8%' }
  ];

  const recentActivity = [
    {
      title: 'New teacher John Mugisha joined Physics department',
      time: '2 hours ago',
      type: 'user'
    },
    {
      title: 'Senior 4 Chemistry course updated with new curriculum',
      time: '4 hours ago',
      type: 'course'
    },
    {
      title: '15 new student enrollments for next semester',
      time: '1 day ago',
      type: 'enrollment'
    },
    {
      title: 'Monthly performance report generated',
      time: '2 days ago',
      type: 'report'
    }
  ];

  const pendingTasks = [
    {
      task: 'Review 8 new teacher applications',
      priority: 'high',
      dueDate: 'Today'
    },
    {
      task: 'Approve course curriculum updates',
      priority: 'medium',
      dueDate: 'Tomorrow'
    },
    {
      task: 'Process student transfer requests',
      priority: 'medium',
      dueDate: 'This week'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="glass-card-elevated p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          School Administration Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your school's operations and track institutional performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="glass-card">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="glass-card-elevated lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-brand-accent" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="glass-card p-4">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            ))}
            <Button variant="ghost" className="w-full mt-4 text-brand-accent">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card className="glass-card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-brand-brown" />
              Pending Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingTasks.map((task, index) => (
              <div key={index} className="glass-card p-3">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {task.task}
                </p>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.priority}
                  </span>
                  <span className="text-xs text-gray-500">{task.dueDate}</span>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full mt-4 text-brand-brown">
              View All Tasks
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="glass-button text-white">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
            <Button variant="outline" className="glass-button-secondary">
              <Plus className="h-4 w-4 mr-2" />
              Create Course
            </Button>
            <Button variant="outline" className="glass-button-secondary">
              <Calendar className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline" className="glass-button-secondary">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}