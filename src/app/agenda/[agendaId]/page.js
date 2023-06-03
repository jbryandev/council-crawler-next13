import Content from '@/components/Content';
import { getAgencyById } from '@/utils/agency';
import { getAgendaById } from '@/utils/agenda';

export default async function Page({ params }) {
  const agenda = await getAgendaById(params.agendaId);

  if (!agenda) {
    throw new Error('The agenda you are searching for does not exist!');
  }
  const agency = await getAgencyById(agenda.agencyId);

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
