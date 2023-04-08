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
      <nav id='mobile' className='grid gap-3 xl:hidden'>
        <Button
          styles={`xl:hidden w-20 ${
            menuOpen &&
            '!bg-slate-300 hover:!bg-slate-400/40 dark:!bg-slate-800 dark:hover:!bg-slate-700/60'
          }`}
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
              styles='xl:hidden mb-3'
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
      <nav id='desktop' className='hidden xl:grid grid-cols-2 gap-3'>
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
