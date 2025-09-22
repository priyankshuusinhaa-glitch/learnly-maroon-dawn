import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, TrendingUp, Calendar as CalendarIcon, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Progress = () => {
  const [progressEntries, setProgressEntries] = useState([
    {
      id: 1,
      date: "2024-12-20",
      goal: "React Hooks",
      hours: 3.5,
      notes: "Completed useState and useEffect deep dive"
    },
    {
      id: 2,
      date: "2024-12-19",
      goal: "TypeScript",
      hours: 2,
      notes: "Learned about generic types and interfaces"
    },
    {
      id: 3,
      date: "2024-12-18",
      goal: "Docker",
      hours: 4,
      notes: "Set up first containerized application"
    },
  ]);

  const [newEntry, setNewEntry] = useState({
    date: "",
    goal: "",
    hours: "",
    notes: ""
  });

  const weeklyData = [
    { day: "Mon", hours: 4.5 },
    { day: "Tue", hours: 3.2 },
    { day: "Wed", hours: 5.1 },
    { day: "Thu", hours: 4.8 },
    { day: "Fri", hours: 6.2 },
    { day: "Sat", hours: 2.5 },
    { day: "Sun", hours: 1.8 },
  ];

  const goalDistribution = [
    { name: "React", value: 40, color: "#800000" },
    { name: "TypeScript", value: 25, color: "#a00000" },
    { name: "Docker", value: 20, color: "#c00000" },
    { name: "Portfolio", value: 15, color: "#e00000" },
  ];

  const addProgress = () => {
    if (!newEntry.date || !newEntry.goal || !newEntry.hours) return;
    
    const entry = {
      id: Date.now(),
      date: newEntry.date,
      goal: newEntry.goal,
      hours: parseFloat(newEntry.hours),
      notes: newEntry.notes
    };
    
    setProgressEntries([entry, ...progressEntries]);
    setNewEntry({ date: "", goal: "", hours: "", notes: "" });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border border-border/50">
          <p className="text-foreground font-medium">{label}</p>
          <p className="text-primary">{`${payload[0].value} hours`}</p>
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
          <h1 className="text-3xl font-bold text-foreground">Progress Tracking</h1>
          <p className="text-muted-foreground">Monitor your learning journey and achievements</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="btn-maroon">
              <Plus className="h-4 w-4 mr-2" />
              Log Progress
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Add Progress Entry</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newEntry.date}
                  onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                  className="input-glass"
                />
              </div>
              <div>
                <Label htmlFor="goal">Goal/Subject</Label>
                <Select onValueChange={(value) => setNewEntry({ ...newEntry, goal: value })}>
                  <SelectTrigger className="input-glass">
                    <SelectValue placeholder="Select a goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="React Hooks">React Hooks</SelectItem>
                    <SelectItem value="TypeScript">TypeScript</SelectItem>
                    <SelectItem value="Docker">Docker</SelectItem>
                    <SelectItem value="Portfolio">Portfolio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="hours">Hours Spent</Label>
                <Input
                  id="hours"
                  type="number"
                  step="0.5"
                  placeholder="e.g., 2.5"
                  value={newEntry.hours}
                  onChange={(e) => setNewEntry({ ...newEntry, hours: e.target.value })}
                  className="input-glass"
                />
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="What did you learn or accomplish?"
                  value={newEntry.notes}
                  onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                  className="input-glass resize-none"
                />
              </div>
              <Button onClick={addProgress} className="w-full btn-maroon">
                Add Progress
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Hours Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Weekly Hours</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
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
                <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Goal Distribution Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Goal Distribution</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={goalDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {goalDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {goalDistribution.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Progress Entries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <CalendarIcon className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Recent Entries</h3>
        </div>
        
        <div className="space-y-4">
          {progressEntries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-foreground">{entry.goal}</h4>
                    <span className="text-primary font-semibold">{entry.hours}h</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">{entry.notes}</p>
                  <span className="text-xs text-muted-foreground">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Progress;