import { cn } from '@/utils/cn';

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-primary transition placeholder:text-slate-400 focus:border-primary focus:ring-2',
        className
      )}
      {...props}
    />
  );
}
