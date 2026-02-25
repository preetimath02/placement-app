import { cn } from '../../lib/utils';
import { User } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn('flex items-center justify-between px-6 py-4 bg-white border-b border-border', className)}>
      <h1 className="font-serif text-xl font-medium text-foreground">Placement Prep</h1>
      
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <User size={20} className="text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
