import { useEffect, useRef, useState } from 'react';
import Menu from './Menu';
import AgencyList from './AgencyList';
import AgendaList from './AgendaList';
import { ChevronLeft } from 'react-feather';
import useOutsideDetector from '@/utils/useOutsideDetector';
import { motion } from 'framer-motion';
import MenuListItem from './MenuListItem';
import HamburgerMenu from './HamburgerMenu';
import { AnimatePresence } from 'framer-motion';

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
  const [currentMenuHeight, setCurrentMenuHeight] = useState(0);
  const [newMenuHeight, setNewMenuHeight] = useState(468);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  useOutsideDetector((event) => {
    if (
      !buttonRef.current?.contains(event.target) &&
      !menuRef.current?.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  });

  function onAnimationStart() {}

  return (
    <>
      <nav id='mobile' className='block lg:hidden'>
        <HamburgerMenu
          active={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          ref={buttonRef}
        />
        {menuOpen && (
          <Menu ref={menuRef}>
            <AnimatePresence>
              {activeMenu === 'agency' && (
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '0%' }}
                  exit={{ x: '-100%' }}
                  transition={{ duration: 0.2 }}
                  onAnimationStart={onAnimationStart}
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
                  initial={{ x: '100%' }}
                  animate={{ x: '0%' }}
                  exit={{ x: '100%' }}
                  transition={{ duration: 0.2 }}
                  onAnimationStart={onAnimationStart}
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
