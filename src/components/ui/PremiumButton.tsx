import { cn } from '../../lib/utils';
import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';

interface PremiumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const PremiumButton = forwardRef<HTMLButtonElement, PremiumButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-150 ease-in-out',
          'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-accent text-white hover:bg-accent/90': variant === 'primary',
            'bg-transparent border border-foreground text-foreground hover:bg-foreground hover:text-background': variant === 'secondary',
          },
          {
            'px-3 py-1.5 text-sm rounded': size === 'sm',
            'px-4 py-2 text-base rounded-md': size === 'md',
            'px-6 py-3 text-lg rounded-md': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PremiumButton.displayName = 'PremiumButton';
