import AgendaViewer from '@/components/AgendaViewer';
import prisma from '@/utils/prisma';

export default async function Page() {
  const agencies = await prisma.agency.findMany();
  const agendas = await prisma.agenda.findMany();
  const agendasWithNewLines = agendas.map((agenda) => {
    return {
      ...agenda,
      content: agenda.content.replace(/\\n/g, '\n'),
    };
  });
  return <AgendaViewer agencies={agencies} agendas={agendasWithNewLines} />;
}
