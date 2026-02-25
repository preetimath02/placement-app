import { cn } from '../../lib/utils';

interface DayActivityProps {
  days: { day: string; active: boolean }[];
  className?: string;
}

export function DayActivity({ days, className }: DayActivityProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {days.map(({ day, active }) => (
        <div key={day} className="flex flex-col items-center gap-1">
          <div
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-150',
              active
                ? 'bg-accent text-white'
                : 'bg-muted text-muted-foreground'
            )}
          >
            {day.charAt(0)}
          </div>
          <span className="text-xs text-muted-foreground">{day}</span>
        </div>
      ))}
    </div>
  );
}
