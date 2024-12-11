import { Bell, Book, Search, Settings, UsersRound } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

import { ModeToggle } from "./mode-toggle";
import { UserButton } from "@clerk/nextjs";

const items = [
  {
    title: "recommended reads",
    url: "/recommended",
    icon: Book,
  },
  {
    title: "notifications",
    url: "/notifications",
    icon: Bell,
  },
  {
    title: "people",
    url: "/users",
    icon: UsersRound,
  },
  {
    title: "search",
    url: "/search",
    icon: Search,
  },
  {
    title: "settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {

  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      className=""
    >
      <SidebarContent className="flex flex-col h-full">
        <SidebarGroup>
          <SidebarGroupLabel className={`font-semibold text-xl mt-4 mb-6`}>
            readingrecs
          </SidebarGroupLabel>
          <SidebarGroupContent className="flex-grow">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarFooter className="mt-auto">
          <ModeToggle />
          <UserButton />
        </SidebarFooter>
      </SidebarContent >
    </Sidebar >
  );
}