import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

const WeeklyChart = () => {
  const data = [
    { day: "Mon", hours: 4.5 },
    { day: "Tue", hours: 3.2 },
    { day: "Wed", hours: 5.1 },
    { day: "Thu", hours: 4.8 },
    { day: "Fri", hours: 6.2 },
    { day: "Sat", hours: 2.5 },
    { day: "Sun", hours: 1.8 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border border-border/50">
          <p className="text-foreground font-medium">{label}</p>
          <p className="text-primary">
            {`${payload[0].value} hours`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">This Week's Progress</h3>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="day" 
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
            <Bar 
              dataKey="hours" 
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
        <span className="text-muted-foreground text-sm">Total this week</span>
        <span className="text-foreground font-semibold text-lg">28.1 hours</span>
      </div>
    </motion.div>
  );
};

export default WeeklyChart;