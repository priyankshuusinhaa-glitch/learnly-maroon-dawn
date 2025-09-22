import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
}

const StatsCard = ({ title, value, icon: Icon, trend }: StatsCardProps) => {
  return (
    <motion.div
      className="glass-card p-6 hover:maroon-glow transition-all duration-300 cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
        <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
        <p className="text-xs text-primary">{trend}</p>
      </div>
    </motion.div>
  );
};

export default StatsCard;