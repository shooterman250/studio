
import type { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import AppHeader from '@/components/layout/AppHeader';
import { DesignProgressProvider } from '@/contexts/DesignProgressContext';
// AuthProvider was already removed from here and moved to RootLayout, then subsequently removed from RootLayout.

export default function AppLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DesignProgressProvider>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <div className="flex flex-1 flex-col">
            <AppHeader />
            <main className="flex-1 overflow-y-auto bg-background text-foreground">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </DesignProgressProvider>
  );
}
