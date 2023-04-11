export default function AgendaViewer({ agenda, agencies }) {
  const agency = agencies.find((agency) => agency.id === agenda.agencyId);

  return (
    <main className='p-5 bg-slate-50 dark:bg-slate-800 rounded-lg drop-shadow-lg'>
      <h1 className='text-3xl font-semibold mt-5 mb-2'>
        {new Date(agenda.date).toLocaleDateString('en-us', {
          dateStyle: 'long',
        })}
      </h1>

      <h2 className='text-lg mb-10 opacity-75'>{agency.name}</h2>

      <p className='whitespace-pre-line text-justify max-w-prose'>
        {agenda.content}
      </p>
    </main>
  );
}
