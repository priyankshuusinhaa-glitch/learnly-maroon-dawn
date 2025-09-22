import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import learnlyLogo from "@/assets/learnly-logo.png";

const Navbar = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-16 border-b border-border bg-background/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-50"
    >
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <img src={learnlyLogo} alt="Learnly" className="h-8 w-8" />
        <h1 className="text-xl font-bold text-foreground">Learnly</h1>
      </div>

      <div className="flex items-center gap-4 flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search goals, progress..."
            className="pl-10 input-glass"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </motion.header>
  );
};

export default Navbar;