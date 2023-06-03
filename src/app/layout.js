import './globals.css';
import BackToTop from '@/components/BackToTop';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { getAllAgencies } from '@/utils/agency';
import { getAllAgendas } from '@/utils/agenda';

export const metadata = {
  title: 'Council Crawler',
  description: "Tracking your favorite council agendas so you don't have to.",
};

export default async function RootLayout({ children }) {
  const agencies = await getAllAgencies();
  const agendas = await getAllAgendas();

  return (
    <html lang='en' className='subpixel-antialiased'>
      <body className='m-3 bg-slate-200 dark:bg-slate-900 text-slate-800 dark:text-slate-300'>
        <BackToTop />
        <section className='grid gap-3 mt-3 lg:grid-cols-3'>
          <Nav agencies={agencies} agendas={agendas} />
          <main className='lg:col-span-2'>{children}</main>
        </section>
        <Footer />
      </body>
    </html>
  );
}
