import { motion } from "framer-motion";
import { Target, TrendingUp, Flame, Clock, BookOpen, Calendar } from "lucide-react";
import dashboardBg from "@/assets/dashboard-bg.jpg";

// Components
import StatsCard from "@/components/StatsCard";
import QuoteCard from "@/components/QuoteCard";
import RecentGoals from "@/components/RecentGoals";
import WeeklyChart from "@/components/WeeklyChart";

const Dashboard = () => {
  const statsData = [
    { title: "Total Goals", value: "12", icon: Target, trend: "+2 this week" },
    { title: "Hours This Week", value: "28.5", icon: Clock, trend: "+15% from last week" },
    { title: "Current Streak", value: "7 days", icon: Flame, trend: "Keep it up!" },
    { title: "Courses Active", value: "4", icon: BookOpen, trend: "2 completing soon" },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative glass-card p-8 overflow-hidden"
      >
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            backgroundImage: `url(${dashboardBg})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          }}
        />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, Alex! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            You're doing great! Keep up the momentum and achieve your learning goals.
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Quote & Recent Goals */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <QuoteCard />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <RecentGoals />
          </motion.div>
        </div>

        {/* Right Column - Charts & Calendar Preview */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <WeeklyChart />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Upcoming Sessions</h3>
            </div>
            <div className="space-y-3">
              {[
                { time: "2:00 PM", title: "React Advanced Patterns", duration: "2 hours" },
                { time: "7:00 PM", title: "Machine Learning Basics", duration: "1.5 hours" },
                { time: "Tomorrow 10:00 AM", title: "TypeScript Deep Dive", duration: "3 hours" },
              ].map((session, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{session.title}</p>
                    <p className="text-sm text-muted-foreground">{session.time}</p>
                  </div>
                  <span className="text-sm text-primary">{session.duration}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;