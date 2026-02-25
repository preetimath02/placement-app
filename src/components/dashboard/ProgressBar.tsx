import { cn } from '../../lib/utils';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  className?: string;
}

export function ProgressBar({ current, total, label, className }: ProgressBarProps) {
  const percentage = Math.min((current / total) * 100, 100);
  
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="flex justify-between mb-2">
          <span className="text-sm text-muted-foreground">{label}</span>
          <span className="text-sm font-medium text-foreground">
            {current}/{total}
          </span>
        </div>
      )}
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
