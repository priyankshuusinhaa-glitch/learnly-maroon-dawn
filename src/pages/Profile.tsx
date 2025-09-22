import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Calendar, Settings, Bell, Palette, LogOut, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    joinDate: "2024-11-01",
    timezone: "UTC-8",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    goalReminders: true,
    darkMode: true,
    googleCalendarSync: false,
  });

  const { toast } = useToast();

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "Preferences Saved",
      description: "Your preferences have been updated.",
    });
  };

  const stats = [
    { label: "Learning Goals", value: "12", change: "+3 this month" },
    { label: "Hours Logged", value: "89", change: "+21% from last month" },
    { label: "Streak Days", value: "7", change: "Current streak" },
    { label: "Badges Earned", value: "4", change: "1 pending" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-6"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative"
        >
          <Avatar className="h-20 w-20 ring-2 ring-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-2 -right-2 h-6 w-6 bg-primary rounded-full flex items-center justify-center">
            <User className="h-3 w-3 text-primary-foreground" />
          </div>
        </motion.div>
        
        <div>
          <h1 className="text-3xl font-bold text-foreground">{profile.name}</h1>
          <p className="text-muted-foreground">Member since {new Date(profile.joinDate).toLocaleDateString()}</p>
          <p className="text-sm text-primary">Learning enthusiast</p>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            className="glass-card p-4"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
              <span className="text-xs text-primary">{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <User className="h-5 w-5 text-primary" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-foreground">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="input-glass"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-foreground">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="input-glass"
                />
              </div>
              
              <div>
                <Label htmlFor="timezone" className="text-foreground">Timezone</Label>
                <Input
                  id="timezone"
                  value={profile.timezone}
                  onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                  className="input-glass"
                />
              </div>

              <Button onClick={handleSaveProfile} className="w-full btn-maroon">
                <Save className="h-4 w-4 mr-2" />
                Save Profile
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Settings className="h-5 w-5 text-primary" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Notifications */}
              <div>
                <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                  <Bell className="h-4 w-4 text-primary" />
                  Notifications
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications" className="text-foreground">Email Notifications</Label>
                    <Switch
                      id="email-notifications"
                      checked={preferences.emailNotifications}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, emailNotifications: checked })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifications" className="text-foreground">Push Notifications</Label>
                    <Switch
                      id="push-notifications"
                      checked={preferences.pushNotifications}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, pushNotifications: checked })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="weekly-reports" className="text-foreground">Weekly Reports</Label>
                    <Switch
                      id="weekly-reports"
                      checked={preferences.weeklyReports}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, weeklyReports: checked })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="goal-reminders" className="text-foreground">Goal Reminders</Label>
                    <Switch
                      id="goal-reminders"
                      checked={preferences.goalReminders}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, goalReminders: checked })}
                    />
                  </div>
                </div>
              </div>

              <Separator className="bg-border" />

              {/* Integrations */}
              <div>
                <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Integrations
                </h4>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="google-calendar" className="text-foreground">Google Calendar Sync</Label>
                    <p className="text-sm text-muted-foreground">Sync your learning sessions with Google Calendar</p>
                  </div>
                  <Switch
                    id="google-calendar"
                    checked={preferences.googleCalendarSync}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, googleCalendarSync: checked })}
                  />
                </div>
              </div>

              <Button onClick={handleSavePreferences} className="w-full btn-maroon">
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="glass-card border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Account Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Sign Out</h4>
                <p className="text-sm text-muted-foreground">Sign out of your Learnly account</p>
              </div>
              <Button variant="destructive" className="btn-ghost-maroon border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Profile;