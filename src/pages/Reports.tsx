import { motion } from "framer-motion";
import { FileText, Download, TrendingUp, Calendar, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const Reports = () => {
  const monthlyData = [
    { month: "Jul", hours: 45, goals: 3 },
    { month: "Aug", hours: 52, goals: 4 },
    { month: "Sep", hours: 38, goals: 2 },
    { month: "Oct", hours: 67, goals: 5 },
    { month: "Nov", hours: 74, goals: 6 },
    { month: "Dec", hours: 89, goals: 8 },
  ];

  const performanceData = [
    { week: "Week 1", completion: 65 },
    { week: "Week 2", completion: 78 },
    { week: "Week 3", completion: 72 },
    { week: "Week 4", completion: 85 },
    { week: "Week 5", completion: 91 },
    { week: "Week 6", completion: 88 },
  ];

  const aiInsights = [
    {
      title: "Peak Learning Hours",
      insight: "You're most productive between 2-4 PM. Consider scheduling challenging topics during this time.",
      type: "productivity"
    },
    {
      title: "Learning Streak",
      insight: "Great job maintaining a 7-day learning streak! Consistency is key to long-term success.",
      type: "motivation"
    },
    {
      title: "Goal Completion Rate",
      insight: "Your completion rate has improved by 23% this month. Focus on breaking down larger goals.",
      type: "improvement"
    },
    {
      title: "Recommended Break",
      insight: "Based on your learning pattern, consider a 15-minute break every 45 minutes for optimal retention.",
      type: "wellness"
    },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border border-border/50">
          <p className="text-foreground font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-primary">
              {`${entry.dataKey}: ${entry.value}${entry.dataKey === 'hours' ? 'h' : ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Learning Reports</h1>
          <p className="text-muted-foreground">AI-powered insights and analytics for your learning journey</p>
        </div>
        
        <Button className="btn-maroon">
          <Download className="h-4 w-4 mr-2" />
          Export PDF
        </Button>
      </motion.div>

      {/* AI Insights Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <Award className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">AI-Generated Insights</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
            >
              <h4 className="font-medium text-foreground mb-2">{insight.title}</h4>
              <p className="text-muted-foreground text-sm">{insight.insight}</p>
              <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                insight.type === 'productivity' ? 'bg-blue-500/20 text-blue-300' :
                insight.type === 'motivation' ? 'bg-green-500/20 text-green-300' :
                insight.type === 'improvement' ? 'bg-primary/20 text-primary' :
                'bg-purple-500/20 text-purple-300'
              }`}>
                {insight.type}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Progress */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Monthly Progress</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="goals" 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: 'hsl(var(--muted-foreground))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Hours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted-foreground" />
              <span className="text-muted-foreground">Goals</span>
            </div>
          </div>
        </motion.div>

        {/* Completion Rate Trend */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Clock className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Completion Rate Trend</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="week" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="completion" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary) / 0.3)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="glass-card p-6 text-center">
          <Calendar className="h-8 w-8 text-primary mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-foreground">89</h3>
          <p className="text-muted-foreground">Hours This Month</p>
          <span className="text-green-400 text-sm">+21% from last month</span>
        </div>
        
        <div className="glass-card p-6 text-center">
          <Award className="h-8 w-8 text-primary mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-foreground">8</h3>
          <p className="text-muted-foreground">Goals Completed</p>
          <span className="text-green-400 text-sm">+60% completion rate</span>
        </div>
        
        <div className="glass-card p-6 text-center">
          <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-foreground">91%</h3>
          <p className="text-muted-foreground">Weekly Average</p>
          <span className="text-green-400 text-sm">Personal best!</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Reports;