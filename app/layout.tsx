import type { Metadata } from "next";
import "../app/globals.css";

import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

import { dark } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Reccommended Reacs",
  description: "A place to find book recommendations from famous people.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-w-full min-h-full" suppressHydrationWarning>
      <ClerkProvider
        appearance={{
          baseTheme: dark,
        }}
      >
        <body
          className={`${ibmPlexMono.className} antialiased min-w-full min-h-full`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
