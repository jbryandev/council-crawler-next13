import AgendaViewer from '@/components/AgendaViewer';
// import { agendas } from '@/utils/data';
import prisma from '@/utils/prisma';

export default async function Page() {
  const agencies = await prisma.agency.findMany();
  const agendas = await prisma.agenda.findMany();
  console.log(agendas);
  return <AgendaViewer agencies={agencies} agendas={agendas} />;
}
