import { Prompt } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';

const prompt = Prompt({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'thai'],
});

export const metadata = {
  title: 'Thai Hajj Health System - ระบบสุขภาพผู้เดินทางไปประกอบพิธีฮัจญ์',
  description: 'ระบบจัดการและติดตามสุขภาพผู้เดินทางไปประกอบพิธีฮัจญ์ของประเทศไทย - Thai Hajj Health Management System',
  keywords: 'hajj, health, thailand, dashboard, admin, thai hajj health, ฮัจญ์, สุขภาพ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1F2937" />
      </head>
      <body className={`${prompt.className} dark:bg-gray-900`}>
        <AuthProvider>
          <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
