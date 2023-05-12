import { useEffect, useRef, useState } from 'react';
import AgencyList from './AgencyList';
import AgendaList from './AgendaList';
import { ChevronLeft } from 'react-feather';
import { motion } from 'framer-motion';
import MenuListItem from './MenuListItem';
import HamburgerButton from './HamburgerButton';
import { AnimatePresence } from 'framer-motion';
import useOutsideDetector from '@/utils/useOutsideDetector';
import { LayoutGroup } from 'framer-motion';
import { CSSTransition } from 'react-transition-group';

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
  const [menuHeight, setMenuHeight] = useState(468);
  const button = useRef(null);
  const menu = useRef(null);
  const agencyMenu = useRef(null);
  const agendaMenu = useRef(null);

  useOutsideDetector((event) => {
    if (
      !button.current?.contains(event.target) &&
      !menu.current?.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  });

  async function calcHeight(el) {
    const height = el.offsetHeight;
    console.log(`${activeMenu} height is ${height}px.`);
    setMenuHeight(height);
  }

  return (
    <nav id='mobile' className='block lg:hidden'>
      <HamburgerButton
        active={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
        ref={button}
      />
      {menuOpen && (
        <menu
          ref={menu}
          className={`z-50 absolute w-[368px] top-16 p-3 mt-5 mr-3 rounded-lg drop-shadow-lg font-medium bg-slate-50 dark:bg-slate-900 overflow-hidden transition-height duration-500 ease-in-out`}
          style={{ height: menuHeight }}
        >
          <CSSTransition
            in={activeMenu === 'agency'}
            timeout={500}
            classNames={{
              enter: 'absolute -translate-x-[110%]',
              enterActive: 'translate-x-[0] ease-out duration-500',
              exit: 'absolute',
              exitActive: '-translate-x-[110%] ease-out duration-500',
            }}
            unmountOnExit
            onEnter={calcHeight}
          >
            <AgencyList
              agencies={agencies}
              agendas={agendas}
              selectedAgency={selectedAgency}
              setSelectedAgency={setSelectedAgency}
              setActiveMenu={setActiveMenu}
            />
          </CSSTransition>
          <CSSTransition
            in={activeMenu === 'agenda'}
            timeout={500}
            classNames={{
              enter: 'translate-x-[110%]',
              enterActive: 'translate-x-[0] ease-out duration-500',
              exit: '',
              exitActive: 'translate-x-[110%] ease-out duration-500',
            }}
            unmountOnExit
            onEnter={calcHeight}
          >
            <div>
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
            </div>
          </CSSTransition>
        </menu>
      )}
    </nav>
  );
}
