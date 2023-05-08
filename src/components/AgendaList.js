import MenuListItem from './MenuListItem';

export default function AgendaList({
  agency,
  agendas,
  selectedAgenda,
  setSelectedAgenda,
  setOpen,
}) {
  const filteredAgendas = agendas.filter(
    (agenda) => agenda.agencyId === agency?.id
  );
  filteredAgendas.sort((a, b) => new Date(b.date) - new Date(a.date));

  const items = filteredAgendas.map((agenda) => (
    <li key={agenda.id} className='flex flex-col mt-3 first:mt-0'>
      <MenuListItem
        styles='!justify-start'
        active={selectedAgenda === agenda}
        onClick={() => {
          setSelectedAgenda(agenda);
          setOpen && setOpen(false);
        }}
      >
        {new Date(agenda.date).toLocaleDateString('en-us', {
          dateStyle: 'long',
        })}
      </MenuListItem>
    </li>
  ));
  return (
    <ul>
      {items.length > 0 ? (
        items
      ) : (
        <li className='p-5 font-normal'>No agendas to display</li>
      )}
    </ul>
  );
}
