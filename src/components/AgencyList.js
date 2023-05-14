import { ChevronRight } from 'react-feather';
import MenuListItem from './MenuListItem';

export default function AgencyList({
  agencies,
  selectedAgency,
  setSelectedAgency,
  setActiveMenu,
}) {
  const items = agencies.map((agency) => (
    <li key={agency.id} className='mt-3 first:mt-0'>
      <MenuListItem
        active={selectedAgency === agency}
        onClick={() => {
          setSelectedAgency(agency);
          setActiveMenu && setActiveMenu('agenda');
        }}
        iconRight={<ChevronRight />}
      >
        {agency.name}
      </MenuListItem>
    </li>
  ));
  return <ul>{items}</ul>;
}
