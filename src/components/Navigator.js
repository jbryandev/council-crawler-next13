import AgencyList from './AgencyList';
import AgendaList from './AgendaList';
import DropdownMenu from './DropdownMenu';

export default function Navigator({
  agencies,
  agendas,
  selectedAgency,
  setSelectedAgency,
  selectedAgenda,
  setSelectedAgenda,
}) {
  return (
    <>
      <DropdownMenu
        agencies={agencies}
        agendas={agendas}
        selectedAgency={selectedAgency}
        selectedAgenda={selectedAgenda}
        setSelectedAgency={setSelectedAgency}
        setSelectedAgenda={setSelectedAgenda}
      />
      <nav id='desktop' className='hidden lg:grid grid-cols-2 gap-3'>
        <AgencyList
          agencies={agencies}
          agendas={agendas}
          selectedAgency={selectedAgency}
          setSelectedAgency={setSelectedAgency}
        />
        <AgendaList
          agency={selectedAgency}
          agendas={agendas}
          selectedAgenda={selectedAgenda}
          setSelectedAgenda={setSelectedAgenda}
        />
      </nav>
    </>
  );
}
