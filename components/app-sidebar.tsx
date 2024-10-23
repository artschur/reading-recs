import { Bell, Book, Calendar, Inbox, Search, Settings, User2, UsersRound } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ModeToggle } from "./mode-toggle";
import { IBM_Plex_Mono } from "next/font/google";

const ibmMono700 = IBM_Plex_Mono({ subsets: ['latin'], weight: '700' });

// Menu items.
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
    <Sidebar variant="floating" collapsible="icon" className="">
      <SidebarContent className="flex flex-col h-full"> {/* Flex column and full height */}
        <SidebarGroup>
          <SidebarGroupLabel className={`font-semibold text-xl mt-4 mb-6`}>RecReads</SidebarGroupLabel>
          <SidebarGroupContent className="flex-grow"> {/* Allow this to grow */}
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

        {/* Username and ModeToggle at the bottom */}
        <SidebarFooter className="mt-auto"> {/* Ensure footer is at the bottom */}
  <div className=""> {/* Flex container to align items side by side */}
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <User2 /> Username
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width]"
          >
            <DropdownMenuItem>
              <span>Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
    
    {/* No gap applied directly, maintain alignment */}
    <div className=""> {/* Add margin-left to create space only when necessary */}
      <ModeToggle/>
    </div>
  </div>
</SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}