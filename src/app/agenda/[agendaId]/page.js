import prisma from '@/utils/prisma';
import Content from '@/components/Content';

export default async function Page({ params }) {
  const agencies = await prisma.agency.findMany();
  const agendas = await prisma.agenda.findMany();
  const agenda = agendas.find((agenda) => agenda.id == params.agendaId);
  if (!agenda) {
    throw new Error('The agenda you are searching for does not exist!');
  }
  const agency = agencies.find((agency) => agency.id === agenda.agencyId);
  const date = new Date(agenda.date).toLocaleDateString('en-us', {
    dateStyle: 'long',
  });

  return (
    <Content title={date}>
      <h2 className='text-lg mb-10 opacity-75'>{agency.name}</h2>
      <p className='whitespace-pre-line text-justify max-w-prose'>
        {agenda.content}
      </p>
    </Content>
  );
}
