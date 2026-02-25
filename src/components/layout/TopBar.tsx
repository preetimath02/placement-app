import { cn } from '../../lib/utils';

interface TopBarProps {
  projectName: string;
  step?: {
    current: number;
    total: number;
  };
  status?: 'Not Started' | 'In Progress' | 'Shipped';
  className?: string;
}

export function TopBar({ projectName, step, status = 'Not Started', className }: TopBarProps) {
  const statusColors = {
    'Not Started': 'bg-muted text-muted-foreground',
    'In Progress': 'bg-warning/10 text-warning',
    'Shipped': 'bg-success/10 text-success',
  };

  return (
    <div className={cn('flex items-center justify-between px-6 py-4 bg-white border-b border-border', className)}>
      <div className="flex items-center gap-2">
        <span className="font-serif text-lg font-medium text-foreground">{projectName}</span>
      </div>
      
      {step && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Step {step.current} / {step.total}</span>
          <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent transition-all duration-200 ease-in-out"
              style={{ width: `${(step.current / step.total) * 100}%` }}
            />
          </div>
        </div>
      )}
      
      <div className={cn('px-3 py-1 rounded-full text-xs font-medium', statusColors[status])}>
        {status}
      </div>
    </div>
  );
}
