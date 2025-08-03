import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  ClipboardCheck,
  Calendar,
  MessageCircle
} from 'lucide-react';

export function OverviewView() {
  const stats = [
    { title: 'Active Courses', value: '4', icon: BookOpen, color: 'text-brand-teal' },
    { title: 'Total Students', value: '156', icon: Users, color: 'text-brand-accent' },
    { title: 'Pending Assessments', value: '12', icon: ClipboardCheck, color: 'text-brand-brown' },
    { title: 'Messages', value: '8', icon: MessageCircle, color: 'text-brand-primary' }
  ];

  const recentActivity = [
    { 
      title: 'Mathematics Assessment submitted by 23 students',
      time: '2 hours ago',
      type: 'assessment'
    },
    { 
      title: 'New enrollment in Physics course',
      time: '4 hours ago',
      type: 'enrollment'
    },
    { 
      title: 'Chemistry lab report grading completed',
      time: '1 day ago',
      type: 'grading'
    }
  ];

  const upcomingClasses = [
    {
      subject: 'Mathematics',
      class: 'S3 A',
      time: '10:00 AM',
      date: 'Today'
    },
    {
      subject: 'Physics',
      class: 'S2 B',
      time: '2:00 PM',
      date: 'Today'
    },
    {
      subject: 'Chemistry',
      class: 'S4 A',
      time: '9:00 AM',
      date: 'Tomorrow'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="glass-card-elevated p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Welcome back, Teacher!
        </h1>
        <p className="text-gray-600">
          Ready to inspire minds and shape the future of Rwanda's education
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
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Classes */}
        <Card className="glass-card-elevated lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-brand-teal" />
              Upcoming Classes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingClasses.map((classItem, index) => (
              <div key={index} className="glass-card p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{classItem.subject}</h3>
                  <p className="text-sm text-gray-600">{classItem.class}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-brand-teal">{classItem.time}</p>
                  <p className="text-sm text-gray-600">{classItem.date}</p>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full mt-4 text-brand-teal">
              View Full Schedule
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="glass-card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-brand-accent" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="glass-card p-3">
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
      </div>

      {/* Quick Actions */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="glass-button text-white">
              <BookOpen className="h-4 w-4 mr-2" />
              Create Course
            </Button>
            <Button variant="outline" className="glass-button-secondary">
              <ClipboardCheck className="h-4 w-4 mr-2" />
              New Assessment
            </Button>
            <Button variant="outline" className="glass-button-secondary">
              <Users className="h-4 w-4 mr-2" />
              Grade Submissions
            </Button>
            <Button variant="outline" className="glass-button-secondary">
              <MessageCircle className="h-4 w-4 mr-2" />
              Message Students
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}