import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Settings, School, Users, Bell } from 'lucide-react';

export function SettingsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">School Settings</h1>
        <p className="text-gray-600 mt-1">Configure school-wide settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* School Information */}
        <Card className="glass-card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <School className="h-5 w-5 mr-2 text-brand-teal" />
              School Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="schoolName">School Name</Label>
              <Input 
                id="schoolName" 
                defaultValue="Kigali International School" 
                className="glass-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="schoolAddress">Address</Label>
              <Input 
                id="schoolAddress" 
                defaultValue="KG 123 St, Kigali, Rwanda" 
                className="glass-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="schoolPhone">Phone</Label>
              <Input 
                id="schoolPhone" 
                defaultValue="+250 788 123 456" 
                className="glass-input"
              />
            </div>
            <Button className="glass-button text-white">
              Update Information
            </Button>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="glass-card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2 text-brand-accent" />
              System Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Student Registration</Label>
                <p className="text-sm text-gray-600">Allow new student registrations</p>
              </div>
              <Button variant="outline" size="sm" className="glass-button-secondary">
                Enabled
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Teacher Applications</Label>
                <p className="text-sm text-gray-600">Accept teacher job applications</p>
              </div>
              <Button variant="outline" size="sm" className="glass-button-secondary">
                Enabled
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Public Course Catalog</Label>
                <p className="text-sm text-gray-600">Show courses to public</p>
              </div>
              <Button variant="outline" size="sm" className="glass-button-secondary">
                Enabled
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}