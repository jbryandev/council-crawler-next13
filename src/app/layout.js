import './globals.css';
import prisma from '@/utils/prisma';
import BackToTop from '@/components/BackToTop';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';

export const metadata = {
  title: 'Council Crawler',
  description: "Tracking your favorite council agendas so you don't have to.",
};

export default async function RootLayout({ children }) {
  const agencies = await prisma.agency.findMany();
  const agendas = await prisma.agenda.findMany();

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
