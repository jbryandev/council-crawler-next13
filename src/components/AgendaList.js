import ListItem from './ListItem';

export default function AgendaList({
  agency,
  agendas,
  selectedAgenda,
  setSelectedAgenda,
  setOpen,
}) {
  const filteredAgendas = agendas.filter(
    (agenda) => agenda.agency === agency?.id
  );
  filteredAgendas.sort((a, b) => new Date(b.date) - new Date(a.date));

  const items = filteredAgendas.map((agenda) => (
    <ListItem
      key={agenda.id}
      active={selectedAgenda === agenda}
      onClick={() => {
        setSelectedAgenda(agenda);
        setOpen(false);
      }}
    >
      {new Date(agenda.date).toLocaleDateString('en-us', {
        dateStyle: 'long',
      })}
    </ListItem>
  ));
  return <ul>{items}</ul>;
}
