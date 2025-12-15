import SidebarNav from "../SidebarNav/SidebarNav";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <SidebarProvider>
        <SidebarNav />
       <div className="w-full">
         <header className="w-full p-2 border-b h-auto">
         <SidebarTrigger />
        </header>
        <main className="w-full p-3">
          <Outlet />
        </main>
       </div>
      </SidebarProvider>
    </>
  );
}

export default AppLayout;
