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
  agendas.sort((a, b) => new Date(b.date) - new Date(a.date));

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
            <Link href={`/agenda/${agenda.id}`}>
              <Button
                variant={variant}
                iconRight={<ChevronRight />}
                onClick={onAgendaClick}
              >
                {new Date(agenda.date)
                  .toLocaleDateString('en-us', {
                    dateStyle: 'long',
                  })
                  .toString()}
              </Button>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
