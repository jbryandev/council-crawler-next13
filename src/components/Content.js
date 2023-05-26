export default function Content({ title, children }) {
  return (
    <main className='p-5 bg-slate-50 dark:bg-slate-800 rounded-lg shadow-lg'>
      <h1 className='text-3xl font-semibold mt-5 mb-2'>{title}</h1>
      {children}
    </main>
  );
}
