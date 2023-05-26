import { ChevronLeft } from 'react-feather';
import { ChevronRight } from 'react-feather';
import Button from './Button';
import Link from 'next/link';

export default function AgendaMenu({
  agency,
  agendas,
  activeAgenda,
  onAgencyClick,
  onAgendaClick,
}) {
  return (
    <ul className='flex flex-col space-y-3'>
      <li key={agency.id}>
        <Button iconLeft={<ChevronLeft />} onClick={onAgencyClick}>
          {agency.name}
        </Button>
      </li>
      {agendas.map((agenda) => {
        const variant = agenda.id === activeAgenda?.id ? 'active' : 'base';
        return (
          <li key={agenda.id}>
            <Button
              variant={variant}
              iconRight={<ChevronRight />}
              onClick={onAgendaClick}
            >
              <Link href={`agenda/${agenda.id}`}>
                {new Date(agenda.date)
                  .toLocaleDateString('en-us', {
                    dateStyle: 'long',
                  })
                  .toString()}
              </Link>
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
