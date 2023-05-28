export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <section className='grid gap-3 mt-3 lg:grid-cols-3'>
      <p className='text-sm font-medium opacity-75 lg:col-start-2 lg:col-span-2 ml-5'>
        Council Crawler | &copy; {currentYear}
      </p>
    </section>
  );
}
