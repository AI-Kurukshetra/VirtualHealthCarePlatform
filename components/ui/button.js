import { cn } from '@/utils/cn';

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  secondary: 'bg-primary-light text-primary hover:bg-blue-100',
  danger: 'bg-danger text-white hover:bg-red-800',
  ghost: 'bg-transparent hover:bg-slate-100'
};

const sizes = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-3 text-base'
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  disabled = false,
  children,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
