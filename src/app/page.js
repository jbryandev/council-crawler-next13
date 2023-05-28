// import AgendaViewer from '@/components/AgendaViewer';
// import prisma from '@/utils/prisma';
import { agencies, agendas } from '@/utils/data';

import Content from '@/components/Content';
import Link from 'next/link';
import Button from '@/components/Button';
import { ChevronRight } from 'react-feather';

export default async function Page() {
  agendas.sort((a, b) => new Date(b.date) - new Date(a.date));
  const latestAgendas = agendas.slice(0, 5);

  return (
    <Content title='Latest Agendas'>
      <ul className='flex flex-col space-y-3 mt-5'>
        {latestAgendas.map((agenda) => {
          const agency = agencies.find(
            (agency) => agency.id === agenda.agencyId
          );
          return (
            <li key={agenda.id}>
              <Link href={`/agenda/${agenda.id}`}>
                <Button iconRight={' '}>
                  {agenda.date} - {agency.name}
                </Button>
              </Link>
            </li>
          );
        })}
      </ul>
    </Content>
  );
  // const agencies = await prisma.agency.findMany();
  // const agendas = (await prisma.agenda.findMany()).map((agenda) => {
  //   return {
  //     ...agenda,
  //     date: new Date(agenda.date).toLocaleDateString('en-us', {
  //       dateStyle: 'long',
  //     }),
  //     content: agenda.content.replace(/\\n/g, '\n'),
  //   };
  // });
  // return <AgendaViewer agencies={agencies} agendas={agendas} />;
}
