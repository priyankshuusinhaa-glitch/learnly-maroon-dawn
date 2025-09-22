import { motion } from "framer-motion";
import { Award, Flame, Target, BookOpen, Clock, Star, Trophy, Zap, Calendar as CalendarIcon } from "lucide-react";

interface Badge {
  id: number;
  title: string;
  description: string;
  icon: any;
  unlocked: boolean;
  progress?: number;
  requirement?: string;
  unlockedDate?: string;
}

const Badges = () => {
  const badges: Badge[] = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first learning goal",
      icon: Target,
      unlocked: true,
      unlockedDate: "2024-11-15"
    },
    {
      id: 2,
      title: "Week Warrior",
      description: "Learn for 7 consecutive days",
      icon: Flame,
      unlocked: true,
      unlockedDate: "2024-11-22"
    },
    {
      id: 3,
      title: "Knowledge Seeker",
      description: "Complete 5 learning goals",
      icon: BookOpen,
      unlocked: true,
      unlockedDate: "2024-12-01"
    },
    {
      id: 4,
      title: "Time Master",
      description: "Log 50 hours of learning",
      icon: Clock,
      unlocked: true,
      unlockedDate: "2024-12-10"
    },
    {
      id: 5,
      title: "Streak Master",
      description: "Maintain a 30-day learning streak",
      icon: Zap,
      unlocked: false,
      progress: 23,
      requirement: "30 days"
    },
    {
      id: 6,
      title: "Goal Crusher",
      description: "Complete 10 learning goals",
      icon: Trophy,
      unlocked: false,
      progress: 8,
      requirement: "10 goals"
    },
    {
      id: 7,
      title: "Century Club",
      description: "Log 100 hours of learning",
      icon: Star,
      unlocked: false,
      progress: 89,
      requirement: "100 hours"
    },
    {
      id: 8,
      title: "Monthly Champion",
      description: "Complete all goals in a month",
      icon: CalendarIcon,
      unlocked: false,
      progress: 0,
      requirement: "Complete monthly goals"
    },
    {
      id: 9,
      title: "Learning Legend",
      description: "Maintain a 100-day streak",
      icon: Award,
      unlocked: false,
      progress: 23,
      requirement: "100 days"
    },
  ];

  const unlockedBadges = badges.filter(badge => badge.unlocked);
  const lockedBadges = badges.filter(badge => !badge.unlocked);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Award className="h-8 w-8 text-primary" />
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground">Achievement Badges</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Unlock badges as you progress through your learning journey. Each badge represents a milestone in your growth.
        </p>
      </motion.div>

      {/* Current Streak Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-6 text-center"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <Flame className="h-12 w-12 text-primary animate-glow-pulse" />
          <span className="text-4xl font-bold text-foreground">7</span>
        </motion.div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Day Streak</h3>
        <p className="text-muted-foreground">Keep up the momentum! You're doing great.</p>
      </motion.div>

      {/* Unlocked Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Unlocked Achievements ({unlockedBadges.length})
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {unlockedBadges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className="glass-card p-6 text-center maroon-glow hover:scale-105 transition-all duration-300"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  delay: index * 0.2
                }}
                className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4"
              >
                <badge.icon className="h-8 w-8 text-primary" />
              </motion.div>
              
              <h3 className="font-semibold text-foreground mb-2">{badge.title}</h3>
              <p className="text-muted-foreground text-sm mb-3">{badge.description}</p>
              
              <div className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                Unlocked {new Date(badge.unlockedDate!).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Locked Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-muted-foreground" />
          In Progress ({lockedBadges.length})
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {lockedBadges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className="glass-card p-6 text-center opacity-75 hover:opacity-90 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-muted/20 rounded-full mb-4">
                <badge.icon className="h-8 w-8 text-muted-foreground" />
              </div>
              
              <h3 className="font-semibold text-muted-foreground mb-2">{badge.title}</h3>
              <p className="text-muted-foreground text-sm mb-3">{badge.description}</p>
              
              {badge.progress !== undefined && (
                <div className="mb-3">
                  <div className="progress-maroon mb-2">
                    <motion.div
                      className="fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${(badge.progress! / parseInt(badge.requirement!.split(' ')[0])) * 100}%` }}
                      transition={{ duration: 1, delay: 0.2 * index }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {badge.progress} / {badge.requirement}
                  </div>
                </div>
              )}
              
              <div className="text-xs text-muted-foreground bg-muted/20 px-2 py-1 rounded-full">
                {badge.requirement}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Badges;