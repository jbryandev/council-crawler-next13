import ListItem from './ListItem';

export default function AgencyList({
  agencies,
  selectedAgency,
  setSelectedAgency,
  setActiveMenu,
}) {
  const items = agencies.map((agency) => (
    <ListItem
      key={agency.id}
      active={selectedAgency === agency}
      onClick={() => {
        setSelectedAgency(agency);
        setActiveMenu('agenda');
      }}
    >
      {agency.name}
    </ListItem>
  ));
  return <ul>{items}</ul>;
}
