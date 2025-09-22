import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Target, 
  TrendingUp, 
  FileText, 
  Award, 
  Calendar as CalendarIcon, 
  User,
  LogOut
} from "lucide-react";
import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Goals", url: "/goals", icon: Target },
  { title: "Progress", url: "/progress", icon: TrendingUp },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Badges", url: "/badges", icon: Award },
  { title: "Calendar", url: "/calendar", icon: CalendarIcon },
  { title: "Profile", url: "/profile", icon: User },
];

const Sidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const collapsed = state === "collapsed";

  return (
    <SidebarUI className={`${collapsed ? "w-16" : "w-64"} glass-card border-r-0 rounded-none`}>
      <SidebarContent className="bg-sidebar/50 backdrop-blur-md">
        <SidebarGroup>
          <SidebarGroupLabel className={`text-foreground font-semibold ${collapsed ? "text-center" : ""}`}>
            {collapsed ? "L" : "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                            isActive
                              ? "bg-primary text-primary-foreground maroon-glow"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent"
                          }`
                        }
                      >
                        <item.icon className={`h-5 w-5 ${collapsed ? "mx-auto" : ""}`} />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </motion.div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4">
          <Button
            variant="ghost"
            className={`w-full ${collapsed ? "p-2" : "justify-start"} text-muted-foreground hover:text-foreground`}
          >
            <LogOut className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
            {!collapsed && "Logout"}
          </Button>
        </div>
      </SidebarContent>
    </SidebarUI>
  );
};

export default Sidebar;