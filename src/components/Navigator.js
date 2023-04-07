import useIntersectionObserver from '@/utils/useIntersectionObserver';
import { useRef, useState } from 'react';
import Menu from './Menu';
import AgencyList from './AgencyList';
import Button from './Button';
import AgendaList from './AgendaList';
import { Menu as Hamburger } from 'react-feather';
import { ChevronLeft } from 'react-feather';
import useOutsideDetector from '@/utils/useOutsideDetector';

export default function Navigator({
  agencies,
  agendas,
  selectedAgency,
  setSelectedAgency,
  selectedAgenda,
  setSelectedAgenda,
}) {
  const [activeMenu, setActiveMenu] = useState('agency');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  useOutsideDetector(menuRef, () => setMenuOpen(false));

  return (
    <>
      <nav className='grid gap-3 xl:hidden' ref={menuRef}>
        <Button
          addStyles={`xl:hidden z-10 w-20 ${
            menuOpen &&
            'bg-slate-300 hover:bg-slate-400/40 dark:bg-slate-800 dark:hover:bg-slate-700/60'
          }`}
          active={!menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Hamburger />
        </Button>
        {menuOpen && activeMenu === 'agency' && (
          <Menu>
            <AgencyList
              agencies={agencies}
              selectedAgency={selectedAgency}
              setSelectedAgency={setSelectedAgency}
              setActiveMenu={setActiveMenu}
            />
          </Menu>
        )}
        {menuOpen && activeMenu === 'agenda' && (
          <Menu>
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
              setOpen={setMenuOpen}
            />
          </Menu>
        )}
      </nav>
      <nav className='hidden xl:grid grid-cols-2 gap-3'>
        <AgencyList
          agencies={agencies}
          selectedAgency={selectedAgency}
          setSelectedAgency={setSelectedAgency}
          setActiveMenu={setActiveMenu}
        />
        <AgendaList
          agency={selectedAgency}
          agendas={agendas}
          selectedAgenda={selectedAgenda}
          setSelectedAgenda={setSelectedAgenda}
          setOpen={setMenuOpen}
        />
      </nav>
    </>
  );
}
