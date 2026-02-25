import { cn } from '../../lib/utils';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

interface PremiumCardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'sm' | 'md' | 'lg';
}

export const PremiumCard = forwardRef<HTMLDivElement, PremiumCardProps>(
  ({ className, padding = 'md', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white border border-border rounded-md',
          'transition-all duration-150 ease-in-out',
          {
            'p-4': padding === 'sm',
            'p-6': padding === 'md',
            'p-10': padding === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

PremiumCard.displayName = 'PremiumCard';
