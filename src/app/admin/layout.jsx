import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import { assets } from "@/Assets/assets";
export default function layout({ children }) {
  return (
    <div className="flex ">
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <div className="flex flex-col w-full">
          <ToastContainer position="top-right" theme="dark" />
          <div className="flex items-center justify-between w-full py-3 max-h-[64px] px-12 border-b border-gray-500">
            <h2>Admin Panel </h2>
            <Image
              src={assets.profile_icon}
              width={40}
              alt=" profile Picture "
            ></Image>
          </div>
          {children}
        </div>
      </SidebarProvider>{" "}
    </div>
  );
}
