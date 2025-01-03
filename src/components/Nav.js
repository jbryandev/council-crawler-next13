'use client';

import { useRef, useState } from 'react';
import useOutsideDetector from '@/utils/useOutsideDetector';
import HamburgerButton from './HamburgerButton';
import Menu from './Menu';

export default function Nav({ agencies, agendas }) {
  const [menuOpen, setMenuOpen] = useState(false);
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

  return (
    <>
      <nav id='mobile' className='block lg:hidden'>
        <HamburgerButton
          isActive={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          ref={buttonRef}
        />
        {menuOpen && (
          <div className='relative top-2' ref={menuRef}>
            <div className='z-50 absolute w-full max-w-[400px] p-3 rounded-lg shadow-lg font-medium bg-slate-50 dark:bg-slate-900 overflow-hidden'>
              <Menu
                agencies={agencies}
                agendas={agendas}
                setMenuOpen={setMenuOpen}
              />
            </div>
          </div>
        )}
      </nav>
      <nav id='desktop' className='hidden lg:block overflow-hidden rounded-lg'>
        <Menu agencies={agencies} agendas={agendas} />
      </nav>
    </>
  );
}
