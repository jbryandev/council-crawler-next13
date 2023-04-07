import { useRef, useState } from 'react';
import Menu from './Menu';
import AgencyList from './AgencyList';
import Button from './Button';
import AgendaList from './AgendaList';
import { Menu as Hamburger, ChevronLeft } from 'react-feather';
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
  const buttonRef = useRef(null);
  const agencyMenuRef = useRef(null);
  const agendaMenuRef = useRef(null);

  useOutsideDetector((event) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target) &&
      ((agencyMenuRef.current &&
        !agencyMenuRef.current.contains(event.target)) ||
        (agendaMenuRef.current &&
          !agendaMenuRef.current.contains(event.target)))
    ) {
      setMenuOpen(false);
    }
  });

  return (
    <>
      <nav className='grid gap-3 xl:hidden'>
        <Button
          styleOverrides='xl:hidden w-20'
          active={!menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          ref={buttonRef}
        >
          <Hamburger />
        </Button>
        {menuOpen && activeMenu === 'agency' && (
          <Menu ref={agencyMenuRef}>
            <AgencyList
              agencies={agencies}
              selectedAgency={selectedAgency}
              setSelectedAgency={setSelectedAgency}
              setActiveMenu={setActiveMenu}
            />
          </Menu>
        )}
        {menuOpen && activeMenu === 'agenda' && (
          <Menu ref={agendaMenuRef}>
            <Button
              styleOverrides='xl:hidden mb-3 justify-between text-left bg-slate-50 hover:bg-slate-200/100 dark:bg-slate-900 dark:hover:bg-slate-800'
              onClick={() => {
                setActiveMenu('agency');
              }}
              iconLeft={<ChevronLeft className='mr-5' />}
            >
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
