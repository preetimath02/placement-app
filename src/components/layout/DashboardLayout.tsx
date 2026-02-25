import { cn } from '../../lib/utils';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';

interface DashboardLayoutProps {
  className?: string;
}

export function DashboardLayout({ className }: DashboardLayoutProps) {
  return (
    <div className={cn('flex min-h-screen bg-background', className)}>
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
