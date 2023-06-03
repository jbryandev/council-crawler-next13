import Content from '@/components/Content';
import { getAgencyById } from '@/utils/agency';
import { getAllAgendas } from '@/utils/agenda';
import Link from 'next/link';

export default async function Page() {
  const lastFiveAgendas = (await getAllAgendas()).slice(0, 5);

  return (
    <Content title='Recent Agendas'>
      <ul className='flex flex-col space-y-5 mt-10'>
        {lastFiveAgendas.map(async (agenda) => {
          const agency = await getAgencyById(agenda.agencyId);
          const date = new Date(agenda.date).toLocaleDateString('en-us', {
            dateStyle: 'long',
          });
          return (
            <li key={agenda.id} className='hover:opacity-75'>
              <Link href={`/agenda/${agenda.id}`}>
                <h2 className='text-lg font-medium'>{date}</h2>
                <h3 className='text-md opacity-75'>{agency.name}</h3>
              </Link>
            </li>
          );
        })}
      </ul>
    </Content>
  );
}
