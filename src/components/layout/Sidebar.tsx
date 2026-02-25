import { cn } from '../../lib/utils';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Code2, 
  FileText, 
  BookOpen, 
  User,
  History,
  Search
} from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { path: '/practice', label: 'Practice', icon: <Code2 size={20} /> },
  { path: '/assessments', label: 'Assessments', icon: <FileText size={20} /> },
  { path: '/resources', label: 'Resources', icon: <BookOpen size={20} /> },
  { path: '/history', label: 'History', icon: <History size={20} /> },
  { path: '/analysis', label: 'Analyze JD', icon: <Search size={20} /> },
  { path: '/profile', label: 'Profile', icon: <User size={20} /> },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside className={cn('w-64 bg-white border-r border-border h-screen sticky top-0', className)}>
      <div className="p-6">
        <h2 className="font-serif text-xl font-medium text-foreground">Placement Prep</h2>
      </div>
      
      <nav className="px-4 pb-6">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-150 ease-in-out',
                    isActive
                      ? 'bg-accent/10 text-accent'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
