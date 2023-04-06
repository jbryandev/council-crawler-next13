import useIntersectionObserver from '@/utils/useIntersectionObserver';
import { useRef, useState } from 'react';
import Menu from './Menu';
import AgencyList from './AgencyList';
import Button from './Button';
import AgendaList from './AgendaList';
import { Menu as Hamburger } from 'react-feather';
import { ChevronLeft } from 'react-feather';

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
        addStyles={`xl:hidden z-10 w-20 ${
          open &&
          'bg-slate-300 hover:bg-slate-400/40 dark:bg-slate-800 dark:hover:bg-slate-700/60'
        }`}
        active={!open}
        onClick={() => setOpen(!open)}
        ref={buttonRef}
      >
        <Hamburger />
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
          addStyles='xl:hidden mb-3 justify-between text-left'
          active={false}
          onClick={() => {
            setActiveMenu('agency');
          }}
        >
          <ChevronLeft className='mr-5' />
          {selectedAgency.name}
        </Button>
        <AgendaList
          agency={selectedAgency}
          agendas={agendas}
          selectedAgenda={selectedAgenda}
          setSelectedAgenda={setSelectedAgenda}
          setOpen={setOpen}
        />
      </Menu>
    </nav>
  );
}
