import AppShell from '@/components/layout/app-shell';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import messagingService from '@/services/api/messaging/service';
import notificationService from '@/services/api/notifications/service';

export const dynamic = 'force-dynamic';

export default async function MessagesPage() {
  const [messages, notifications] = await Promise.all([
    messagingService.list({ limit: 10, offset: 0 }),
    notificationService.list({ limit: 10, offset: 0 })
  ]);

  return (
    <AppShell title='Secure Messaging' subtitle='Patient-provider chat, reminders, and notifications.'>
      <div className='grid gap-4 lg:grid-cols-2'>
        <Card>
          <CardTitle>Recent Messages</CardTitle>
          <CardDescription>{messages.length} message records.</CardDescription>
          <div className='mt-3 space-y-2'>
            {messages.length ? (
              messages.map((message) => (
                <Card key={message.id} className='border border-slate-100 p-3 shadow-none'>
                  <p className='text-sm text-slate-800'>{message.message}</p>
                </Card>
              ))
            ) : (
              <p className='text-sm text-slate-500'>No messages found.</p>
            )}
          </div>
        </Card>
        <Card>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>{notifications.length} notification records.</CardDescription>
          <div className='mt-3 space-y-2'>
            {notifications.length ? (
              notifications.map((notification) => (
                <Card key={notification.id} className='border border-slate-100 p-3 shadow-none'>
                  <p className='text-sm font-medium text-slate-800'>{notification.type}</p>
                  <p className='text-sm text-slate-600'>{notification.content}</p>
                </Card>
              ))
            ) : (
              <p className='text-sm text-slate-500'>No notifications found.</p>
            )}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
