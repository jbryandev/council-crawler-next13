import ListItem from './ListItem';

export default function AgendaList({
  agency,
  agendas,
  selectedAgenda,
  setSelectedAgenda,
}) {
  const filteredAgendas = agendas.filter(
    (agenda) => agenda.agency === agency?.id
  );

  const items = filteredAgendas.map((agenda) => (
    <ListItem
      key={agenda.id}
      active={selectedAgenda === agenda}
      onClick={() => setSelectedAgenda(agenda)}
    >
      {new Date(agenda.date).toLocaleDateString('en-us', {
        dateStyle: 'long',
      })}
    </ListItem>
  ));
  return <ul>{items}</ul>;
}
