import { useRef, useState } from 'react';
import Menu from './Menu';
import AgencyList from './AgencyList';
import Button from './Button';
import AgendaList from './AgendaList';
import { Menu as Hamburger, ChevronLeft } from 'react-feather';
import useOutsideDetector from '@/utils/useOutsideDetector';
import { motion } from 'framer-motion';
import MenuListItem from './MenuListItem';
import { X } from 'react-feather';

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
      <nav id='mobile' className='grid gap-3 lg:hidden'>
        <Button
          styles={`lg:hidden w-20 ${
            menuOpen &&
            '!bg-slate-300 hover:!bg-slate-400/40 dark:!bg-slate-800 dark:hover:!bg-slate-700/60'
          }`}
          active={!menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          ref={buttonRef}
        >
          {menuOpen ? <X /> : <Hamburger />}
        </Button>
        {menuOpen && activeMenu === 'agency' && (
          <Menu ref={agencyMenuRef}>
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 0.2 }}
            >
              <AgencyList
                agencies={agencies}
                agendas={agendas}
                selectedAgency={selectedAgency}
                setSelectedAgency={setSelectedAgency}
                setActiveMenu={setActiveMenu}
              />
            </motion.div>
          </Menu>
        )}
        {menuOpen && activeMenu === 'agenda' && (
          <Menu ref={agendaMenuRef}>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 0.2 }}
            >
              <MenuListItem
                styles='lg:hidden mb-3'
                onClick={() => {
                  setActiveMenu('agency');
                }}
                iconLeft={<ChevronLeft />}
              >
                {selectedAgency.name}
              </MenuListItem>
              <AgendaList
                agency={selectedAgency}
                agendas={agendas}
                selectedAgenda={selectedAgenda}
                setSelectedAgenda={setSelectedAgenda}
                setOpen={setMenuOpen}
              />
            </motion.div>
          </Menu>
        )}
      </nav>
      <nav id='desktop' className='hidden lg:grid grid-cols-2 gap-3'>
        <AgencyList
          agencies={agencies}
          agendas={agendas}
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
