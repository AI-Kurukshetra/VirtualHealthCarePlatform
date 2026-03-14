'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { HiChevronDown } from 'react-icons/hi';

export default function TopNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadSession() {
      try {
        const response = await fetch('/api/auth/session', {
          method: 'GET',
          cache: 'no-store'
        });
        const payload = await response.json();
        if (isMounted) {
          setIsAuthenticated(Boolean(payload?.data?.authenticated));
        }
      } catch (_error) {
        if (isMounted) {
          setIsAuthenticated(false);
        }
      } finally {
        if (isMounted) {
          setIsLoadingSession(false);
        }
      }
    }

    loadSession();

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await fetch('/api/auth/logout', {
        method: 'POST'
      });
    } finally {
      setIsAuthenticated(false);
      setIsLoggingOut(false);
      router.push('/login');
      router.refresh();
    }
  }

  return (
    <header className='sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8 2xl:px-12'>
      <div className='mx-auto flex w-full max-w-[1800px] items-center justify-between'>
        <Link href='/' className='text-lg font-bold text-primary'>
          Virtual Healthcare Platform
        </Link>

        <div className='relative group'>
          <button
            type='button'
            className='inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/30'
          >
            Admin
            <HiChevronDown className='h-4 w-4' />
          </button>

          <div className='invisible absolute right-0 mt-2 w-40 rounded-lg border border-slate-200 bg-white p-1 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100'>
            <Link href='/dashboard' className='block rounded-md px-3 py-2 text-sm hover:bg-slate-100'>
              Dashboard
            </Link>
            {!isLoadingSession && !isAuthenticated ? (
              <Link href='/login' className='block rounded-md px-3 py-2 text-sm hover:bg-slate-100'>
                Sign in
              </Link>
            ) : null}
            {!isLoadingSession && isAuthenticated ? (
              <button
                type='button'
                onClick={handleLogout}
                disabled={isLoggingOut}
                className='block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60'
              >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
