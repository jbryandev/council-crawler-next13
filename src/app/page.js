import AgendaViewer from '@/components/AgendaViewer';
import prisma from '@/utils/prisma';
import { agencies, agendas } from '@/utils/data';

export default async function Page() {
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
  return <AgendaViewer agencies={agencies} agendas={agendas} />;
}
