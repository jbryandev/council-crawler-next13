import './globals.css';

export const metadata = {
  title: 'Council Crawler',
  description:
    "Tracking your favorite City Council agendas so you don't have to.",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='subpixel-antialiased dark'>
      <body className='bg-slate-200 dark:bg-slate-900 text-slate-800 dark:text-slate-300'>
        {children}
      </body>
    </html>
  );
}
