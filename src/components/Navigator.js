import useIntersectionObserver from '@/utils/useIntersectionObserver';
import { useRef, useState } from 'react';
import Menu from './Menu';
import AgencyList from './AgencyList';
import Button from './Button';
import AgendaList from './AgendaList';

export default function Navigator({
  agencies,
  agendas,
  selectedAgency,
  setSelectedAgency,
  selectedAgenda,
  setSelectedAgenda,
}) {
  const [activeMenu, setActiveMenu] = useState('agency');
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);

  const buttonVisible = useIntersectionObserver(buttonRef);
  if (!buttonVisible && open) {
    setOpen(false);
  }

  return (
    <nav className='grid gap-3 xl:grid-cols-2'>
      <Button
        addStyles='xl:hidden z-10'
        active={!open}
        onClick={() => setOpen(!open)}
        ref={buttonRef}
      >
        Menu
      </Button>
      <Menu open={open} active={activeMenu === 'agency'}>
        <AgencyList
          agencies={agencies}
          selectedAgency={selectedAgency}
          setSelectedAgency={setSelectedAgency}
          setActiveMenu={setActiveMenu}
        />
      </Menu>
      <Menu open={open} active={activeMenu === 'agenda'}>
        <Button
          addStyles='xl:hidden block my-3 first:mt-0'
          active={false}
          onClick={() => {
            setActiveMenu('agency');
          }}
        >
          {selectedAgency.name}
        </Button>
        <AgendaList
          agency={selectedAgency}
          agendas={agendas}
          selectedAgenda={selectedAgenda}
          setSelectedAgenda={setSelectedAgenda}
        />
      </Menu>
    </nav>
  );
}
