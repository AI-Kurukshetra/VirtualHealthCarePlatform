import Link from 'next/link';
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
	return (
		<aside className='hidden md:block min-h-[calc(100vh-73px)] w-full max-w-64 xl:max-w-72 border-r border-slate-200 bg-white p-4'>
			<p className='mb-3 px-3 text-xs font-semibold uppercase tracking-wide text-slate-500'>Modules</p>
			<nav className='space-y-1'>
				{navItems.map((item) => {
					const Icon = item.icon;
					return (
						<Link
							key={item.href}
							href={item.href}
							className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100'
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
