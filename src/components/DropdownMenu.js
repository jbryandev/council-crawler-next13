import { useEffect, useRef, useState } from 'react';
import AgencyList from './AgencyList';
import AgendaList from './AgendaList';
import { ChevronLeft } from 'react-feather';
import MenuListItem from './MenuListItem';
import HamburgerButton from './HamburgerButton';
import useOutsideDetector from '@/utils/useOutsideDetector';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

export default function DropdownMenu({
  agencies,
  agendas,
  selectedAgency,
  selectedAgenda,
  setSelectedAgency,
  setSelectedAgenda,
}) {
  const [activeMenu, setActiveMenu] = useState('agency');
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(null);
  const button = useRef(null);
  const menu = useRef(null);

  useOutsideDetector((event) => {
    if (
      !button.current?.contains(event.target) &&
      !menu.current?.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  });

  useEffect(() => {
    if (activeMenu === 'agency') {
      setMenuHeight(menu.current?.firstChild.offsetHeight + 24 || 468);
    } else if (activeMenu === 'agenda') {
      setMenuHeight(menu.current?.lastChild.offsetHeight + 24);
    }
  }, [activeMenu]);

  return (
    <nav id='mobile' className='block lg:hidden'>
      <HamburgerButton
        active={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
        ref={button}
      />
      {menuOpen && (
        <menu
          className={`z-50 absolute w-96 top-16 p-3 mt-5 mr-3 rounded-lg shadow-lg font-medium bg-slate-50 dark:bg-slate-900 overflow-hidden transition-height duration-300 ease-out`}
          style={{ height: menuHeight }}
          ref={menu}
        >
          <AnimatePresence>
            {activeMenu === 'agency' && (
              <motion.div
                initial={{ x: '-110%' }}
                animate={{ x: '0%' }}
                exit={{ x: '-110%' }}
                transition={{ duration: 0.3 }}
                className='absolute w-full pr-6'
              >
                <AgencyList
                  agencies={agencies}
                  agendas={agendas}
                  selectedAgency={selectedAgency}
                  setSelectedAgency={setSelectedAgency}
                  setActiveMenu={setActiveMenu}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {activeMenu === 'agenda' && (
              <motion.div
                initial={{ x: '110%' }}
                animate={{ x: '0%' }}
                exit={{ x: '110% ' }}
                transition={{ duration: 0.3 }}
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
            )}
          </AnimatePresence>
        </menu>
      )}
    </nav>
  );
}
