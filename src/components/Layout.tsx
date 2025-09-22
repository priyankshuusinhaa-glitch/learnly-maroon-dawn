import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;