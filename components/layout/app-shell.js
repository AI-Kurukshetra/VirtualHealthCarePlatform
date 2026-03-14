import SideNav from '@/components/layout/side-nav';

export default function AppShell({ title, subtitle, actions, children }) {
  return (
    <main className='mx-auto flex w-full max-w-[1800px] pl-0 pr-4 sm:pr-6 lg:pr-8 2xl:pr-12'>
      <SideNav />
      <section className='min-h-[calc(100vh-73px)] flex-1 py-5 md:py-8 lg:py-10'>
        <div className='mb-6 flex flex-wrap items-start justify-between gap-3'>
          <div>
            <h1 className='text-2xl font-bold text-slate-900'>{title}</h1>
            {subtitle ? <p className='text-sm text-slate-500'>{subtitle}</p> : null}
          </div>
          {actions || null}
        </div>
        {children}
      </section>
    </main>
  );
}
