import { cn } from '@/utils/cn';

export function Card({ className, children }) {
  return <div className={cn('rounded-2xl bg-white p-5 shadow-card', className)}>{children}</div>;
}

export function CardTitle({ className, children }) {
  return <h3 className={cn('text-base font-semibold text-slate-900', className)}>{children}</h3>;
}

export function CardDescription({ className, children }) {
  return <p className={cn('mt-1 text-sm text-slate-500', className)}>{children}</p>;
}
