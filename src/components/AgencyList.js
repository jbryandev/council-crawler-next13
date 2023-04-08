import Button from './Button';
import { ChevronRight } from 'react-feather';

export default function AgencyList({
  agencies,
  selectedAgency,
  setSelectedAgency,
  setActiveMenu,
}) {
  const items = agencies.map((agency) => (
    <li key={agency.id} className='flex flex-col mt-3 first:mt-0'>
      <Button
        active={selectedAgency === agency}
        arrowRight={<ChevronRight className='ml-5' />}
        onClick={() => {
          setSelectedAgency(agency);
          setActiveMenu('agenda');
        }}
        iconRight={<ChevronRight className='ml-5' />}
      >
        {agency.name}
      </Button>
    </li>
  ));
  return <ul>{items}</ul>;
}
