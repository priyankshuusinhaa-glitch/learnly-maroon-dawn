import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Target, CheckCircle2, Clock, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Goal {
  id: number;
  title: string;
  description: string;
  progress: number;
  status: "active" | "completed" | "paused";
  dueDate: string;
  category: string;
}

const Goals = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      title: "Master React Hooks",
      description: "Learn all React hooks in depth including custom hooks",
      progress: 75,
      status: "active",
      dueDate: "2024-12-30",
      category: "Web Development"
    },
    {
      id: 2,
      title: "Complete TypeScript Course",
      description: "Comprehensive TypeScript course with projects",
      progress: 100,
      status: "completed",
      dueDate: "2024-12-15",
      category: "Programming"
    },
    {
      id: 3,
      title: "Learn Docker Basics",
      description: "Containerization fundamentals and Docker compose",
      progress: 45,
      status: "active",
      dueDate: "2025-01-15",
      category: "DevOps"
    },
    {
      id: 4,
      title: "Build Portfolio Website",
      description: "Create a responsive portfolio with modern technologies",
      progress: 20,
      status: "active",
      dueDate: "2025-01-30",
      category: "Projects"
    },
  ]);

  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    dueDate: "",
    category: ""
  });

  const addGoal = () => {
    if (!newGoal.title) return;
    
    const goal: Goal = {
      id: Date.now(),
      title: newGoal.title,
      description: newGoal.description,
      progress: 0,
      status: "active",
      dueDate: newGoal.dueDate,
      category: newGoal.category
    };
    
    setGoals([...goals, goal]);
    setNewGoal({ title: "", description: "", dueDate: "", category: "" });
  };

  const deleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
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
          <h1 className="text-3xl font-bold text-foreground">Learning Goals</h1>
          <p className="text-muted-foreground">Track and manage your learning objectives</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="btn-maroon">
              <Plus className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Create New Goal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Goal Title</Label>
                <Input
                  id="title"
                  placeholder="Enter goal title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  className="input-glass"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your learning goal"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  className="input-glass resize-none"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="e.g., Web Development, Data Science"
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                  className="input-glass"
                />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newGoal.dueDate}
                  onChange={(e) => setNewGoal({ ...newGoal, dueDate: e.target.value })}
                  className="input-glass"
                />
              </div>
              <Button onClick={addGoal} className="w-full btn-maroon">
                Create Goal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 hover:maroon-glow transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {goal.status === "completed" ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Target className="h-5 w-5 text-primary" />
                  )}
                </div>
                <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {goal.category}
                </span>
              </div>
              
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => deleteGoal(goal.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <h3 className="font-semibold text-foreground mb-2">{goal.title}</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {goal.description}
            </p>

            <div className="progress-maroon mb-3">
              <motion.div
                className="fill"
                initial={{ width: 0 }}
                animate={{ width: `${goal.progress}%` }}
                transition={{ duration: 1, delay: 0.2 * index }}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{goal.progress}% complete</span>
              <div className="flex items-center gap-1 text-primary">
                <Clock className="h-3 w-3" />
                <span>{new Date(goal.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Goals;