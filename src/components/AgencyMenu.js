import { ChevronRight } from 'react-feather';
import { agencies } from '@/utils/data';
import Button from './Button';

export default function AgencyMenu({
  activeAgency,
  setSelectedAgency,
  onClick,
}) {
  return (
    <ul className='flex flex-col space-y-3'>
      {agencies.map((agency) => {
        return (
          <li key={agency.id}>
            <Button
              variant={agency.id === activeAgency?.id ? 'active' : 'base'}
              iconRight={<ChevronRight />}
              onClick={() => {
                setSelectedAgency(agency);
                onClick();
              }}
            >
              {agency.name}
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
