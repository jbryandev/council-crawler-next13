import ListItem from './ListItem';
import { ChevronRight } from 'react-feather';

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
      arrowRight={<ChevronRight className='ml-5' />}
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
