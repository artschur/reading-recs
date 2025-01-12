import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { SignedIn } from "@clerk/nextjs";

export default function RecommendedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SignedIn>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>
          <div className="flex">
            <AppSidebar /> {/* Sidebar component */}
            <main className="flex-1">
              {children} {/* Render dashboard-specific content */}
            </main>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </SignedIn>
  );
}
