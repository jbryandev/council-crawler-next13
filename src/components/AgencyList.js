import { ChevronRight } from 'react-feather';
import MenuListItem from './MenuListItem';

export default function AgencyList({
  agencies,
  selectedAgency,
  setSelectedAgency,
  setActiveMenu,
}) {
  const items = agencies.map((agency) => (
    <li key={agency.id} className='flex flex-col mt-3 first:mt-0 w-[340px]'>
      <MenuListItem
        active={selectedAgency === agency}
        onClick={() => {
          setSelectedAgency(agency);
          setActiveMenu('agenda');
        }}
        iconRight={<ChevronRight />}
      >
        {agency.name}
      </MenuListItem>
    </li>
  ));
  return <ul>{items}</ul>;
}
