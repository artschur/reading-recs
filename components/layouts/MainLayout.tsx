import React from 'react';
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";

type MainLayoutProps = {
    children: React.ReactNode;
};


const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SidebarProvider>
                <div className="flex"> {/* Flex container to organize sidebar and main content */}
                    <AppSidebar /> {/* Sidebar component */}
                    <main className="flex-1"> {/* Main content area */}
                        <SidebarTrigger />
                        {children} {/* Render children inside main area */}
                    </main>
                </div>
            </SidebarProvider>
        </ThemeProvider>
    );
};

export default MainLayout;

