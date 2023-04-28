export default function AgendaDisplay({ agenda, agencies }) {
  const agency = agencies.find((agency) => agency.id === agenda.agencyId);

  return (
    <main className='p-5 bg-slate-50 dark:bg-slate-800 rounded-lg drop-shadow-lg'>
      <h1 className='text-3xl font-semibold mt-5 mb-2'>{agenda.date}</h1>

      <h2 className='text-lg mb-10 opacity-75'>{agency.name}</h2>

      <ol>
        {agenda.content.map((row) => {
          return (
            <li key={row.section.sectionNumber}>
              <h2 className='my-5 flex'>
                <div className='w-8'>{row.section.sectionNumber}</div>
                <div>{row.section.sectionTitle}</div>
              </h2>
              <ol>
                {row.items.map((item) => {
                  return (
                    <li
                      key={item.key}
                      className='flex mb-2 p-3 border-l-4 border-slate-50 first:bg-slate-200 first:border-blue-700'
                    >
                      <div className='ml-4 mr-5'>{item.itemNumber}</div>
                      <div>{item.itemContents}</div>
                    </li>
                  );
                })}
              </ol>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
