import AgendaViewer from '@/components/AgendaViewer';
import prisma from '@/utils/prisma';

export default async function Page() {
  const agencies = await prisma.agency.findMany();
  const agendas = await prisma.agenda.findMany();
  return <AgendaViewer agencies={agencies} agendas={agendas} />;
}
