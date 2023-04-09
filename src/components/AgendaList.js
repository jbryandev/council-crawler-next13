import Button from './Button';

export default function AgendaList({
  agency,
  agendas,
  selectedAgenda,
  setSelectedAgenda,
  setOpen,
}) {
  const filteredAgendas = agendas.filter(
    (agenda) => agenda.agencyID === agency?.id
  );
  filteredAgendas.sort((a, b) => new Date(b.date) - new Date(a.date));

  const items = filteredAgendas.map((agenda) => (
    <li key={agenda.id} className='flex flex-col mt-3 first:mt-0'>
      <Button
        styles='!justify-start'
        active={selectedAgenda === agenda}
        onClick={() => {
          setSelectedAgenda(agenda);
          setOpen(false);
        }}
      >
        {new Date(agenda.date).toLocaleDateString('en-us', {
          dateStyle: 'long',
        })}
      </Button>
    </li>
  ));
  return <ul>{items}</ul>;
}
