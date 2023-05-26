import { agencies, agendas } from '@/utils/data';
import Content from '@/components/Content';

export default function Page({ params }) {
  const agenda = agendas.find((agenda) => agenda.id == params.agendaId);
  const agency = agencies.find((agency) => agency.id === agenda.agencyId);
  const title = new Date(agenda.date).toLocaleDateString('en-us', {
    dateStyle: 'long',
  });

  return (
    <Content title={title}>
      <h2 className='text-lg mb-10 opacity-75'>{agency.name}</h2>
      <p className='whitespace-pre-line text-justify max-w-prose'>
        {agenda.content}
      </p>
    </Content>
  );
}