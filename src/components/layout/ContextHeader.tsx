import { cn } from '../../lib/utils';

interface ContextHeaderProps {
  headline: string;
  subtext: string;
  className?: string;
}

export function ContextHeader({ headline, subtext, className }: ContextHeaderProps) {
  return (
    <div className={cn('px-6 py-10', className)}>
      <h1 className="font-serif text-4xl font-medium text-foreground mb-4 tracking-tight">
        {headline}
      </h1>
      <p className="text-lg text-muted-foreground max-w-text leading-relaxed">
        {subtext}
      </p>
    </div>
  );
}
