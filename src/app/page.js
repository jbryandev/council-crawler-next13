import prisma from '@/utils/prisma';
import Content from '@/components/Content';
import Link from 'next/link';

export default async function Page() {
  const agencies = await prisma.agency.findMany();
  const agendas = await prisma.agenda.findMany();
  agendas.sort((a, b) => new Date(b.date) - new Date(a.date));
  const latestAgendas = agendas.slice(0, 5);

  return (
    <Content title='Recent Agendas'>
      <ul className='flex flex-col space-y-5 mt-10'>
        {latestAgendas.map((agenda) => {
          const agency = agencies.find(
            (agency) => agency.id === agenda.agencyId
          );
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
