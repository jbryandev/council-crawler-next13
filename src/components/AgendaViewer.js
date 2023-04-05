import { agencies } from '@/utils/data';

export default function AgendaViewer({ agenda }) {
  const agency = agencies.find((agency) => agency.id === agenda?.agency);

  return (
    <main className='p-5 bg-slate-50 dark:bg-slate-800 rounded-lg'>
      <h1 className='text-3xl font-semibold mt-5 mb-2'>
        {new Date(agenda.date).toLocaleDateString('en-us', {
          dateStyle: 'long',
        })}
      </h1>

      <h2 className='text-lg mb-10'>{agency.name}</h2>

      <p className='whitespace-pre-line text-justify max-w-prose'>
        {agenda.content}
      </p>
    </main>
  );
}
