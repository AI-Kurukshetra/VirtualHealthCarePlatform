import { cn } from '@/utils/cn';

const styles = {
  scheduled: 'bg-blue-100 text-blue-800',
  completed: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-rose-100 text-rose-800',
  no_show: 'bg-amber-100 text-amber-800',
  default: 'bg-slate-100 text-slate-800'
};

export function Badge({ label, status = 'default' }) {
  return (
    <span className={cn('inline-flex rounded-full px-2 py-1 text-xs font-semibold', styles[status] || styles.default)}>
      {label}
    </span>
  );
}
