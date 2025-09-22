import { motion } from "framer-motion";
import { Target, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const RecentGoals = () => {
  const goals = [
    {
      id: 1,
      title: "Master React Hooks",
      progress: 75,
      status: "in-progress",
      dueDate: "Dec 30",
    },
    {
      id: 2,
      title: "Complete TypeScript Course",
      progress: 100,
      status: "completed",
      dueDate: "Dec 15",
    },
    {
      id: 3,
      title: "Learn Docker Basics",
      progress: 45,
      status: "in-progress",
      dueDate: "Jan 15",
    },
    {
      id: 4,
      title: "Build Portfolio Website",
      progress: 20,
      status: "in-progress",
      dueDate: "Jan 30",
    },
  ];

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Recent Goals</h3>
        </div>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-foreground text-sm">{goal.title}</h4>
              {goal.status === "completed" ? (
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
              ) : (
                <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
              )}
            </div>
            
            <div className="progress-maroon mb-2">
              <motion.div
                className="fill"
                initial={{ width: 0 }}
                animate={{ width: `${goal.progress}%` }}
                transition={{ duration: 1, delay: 0.2 * index }}
              />
            </div>
            
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">{goal.progress}% complete</span>
              <span className="text-primary">Due {goal.dueDate}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentGoals;