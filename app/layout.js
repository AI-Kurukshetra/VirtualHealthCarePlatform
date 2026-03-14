import '@/styles/globals.css';
import AppProviders from '@/components/providers/app-providers';
import TopNav from '@/components/layout/top-nav';

export const metadata = {
  title: 'Virtual Healthcare Platform',
  description: 'API-first virtual healthcare platform for telehealth organizations.'
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppProviders>
          <TopNav />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
