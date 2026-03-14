'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiOutlineCalendar, HiOutlineChat, HiOutlineClipboardList, HiOutlineHome, HiOutlineUserGroup } from 'react-icons/hi';

const navItems = [
	{ href: '/dashboard', label: 'Dashboard', icon: HiOutlineHome },
	{ href: '/patients', label: 'Patients', icon: HiOutlineUserGroup },
	{ href: '/appointments', label: 'Appointments', icon: HiOutlineCalendar },
	{ href: '/records', label: 'Records', icon: HiOutlineClipboardList },
	{ href: '/messages', label: 'Messages', icon: HiOutlineChat },
	// { href: '/billing', label: 'Billing', icon: HiOutlineClipboardList },
	{ href: '/analytics', label: 'Analytics', icon: HiOutlineHome }
];

export default function SideNav() {
	const pathname = usePathname();

	return (
		<aside className='hidden md:block min-h-[calc(100vh-73px)] w-full max-w-64 xl:max-w-72 border-r border-slate-200 bg-white py-4 pr-4 pl-0 md:mr-4 lg:mr-6'>
			<p className='mb-3 px-3 text-xs font-semibold uppercase tracking-wide text-slate-500'>Modules</p>
			<nav className='space-y-1'>
				{navItems.map((item) => {
					const Icon = item.icon;
					const isActive = pathname === item.href;
					return (
						<Link
							key={item.href}
							href={item.href}
							className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
								isActive
									? 'bg-blue-600 text-white'
									: 'text-slate-700 hover:bg-slate-100'
							}`}
						>
							<Icon className='h-4 w-4' />
							{item.label}
						</Link>
					);
				})}
			</nav>
		</aside>
	);
}
