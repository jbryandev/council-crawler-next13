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
import HamburgerMenu from './HamburgerMenu';

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
  const hamburgerLine = `h-[3px] w-7 my-[3px] transition ease transform duration-300 ${
    !menuOpen ? 'bg-slate-50' : 'bg-slate-600 dark:bg-slate-300'
  }`;

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
      <nav id='mobile' className='block lg:hidden'>
        <HamburgerMenu
          active={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          ref={buttonRef}
        />
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
