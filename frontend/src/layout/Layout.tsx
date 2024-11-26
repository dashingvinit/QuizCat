import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import Topbar from '@/components/layout/Topbar';
import { ThemeProvider } from '@/components/layout/theme-provider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="antialiased flex h-screen">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SidebarProvider>
          <div className="grid grid-cols-[auto,1fr] w-full">
            <AppSidebar />
            <main className="flex flex-col h-screen overflow-auto">
              <div>
                <Topbar />
              </div>
              {children}
            </main>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </div>
  );
}
