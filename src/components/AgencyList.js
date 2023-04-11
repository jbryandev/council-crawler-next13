import { ChevronRight } from 'react-feather';
import MenuListItem from './MenuListItem';

export default function AgencyList({
  agencies,
  agendas,
  selectedAgency,
  setSelectedAgency,
  setActiveMenu,
}) {
  const agencyIdsWithAgendas = agendas.map((agenda) => agenda.agencyId);
  const agenciesWithAgendas = agencies.filter((agency) =>
    agencyIdsWithAgendas.includes(agency.id)
  );

  const items = agencies.map((agency) => (
    <li key={agency.id} className='flex flex-col mt-3 first:mt-0'>
      <MenuListItem
        active={selectedAgency === agency}
        onClick={() => {
          setSelectedAgency(agency);
          setActiveMenu('agenda');
        }}
        iconRight={agencyIdsWithAgendas.includes(agency.id) && <ChevronRight />}
        badgeValue={
          agendas.filter((agenda) => agenda.agencyId === agency.id).length
        }
      >
        {agency.name}
      </MenuListItem>
    </li>
  ));
  return <ul>{items}</ul>;
}
