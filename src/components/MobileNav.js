'use client';

import { useState } from 'react';
import HamburgerButton from './HamburgerButton';
import Button from './Button';
import { ChevronRight } from 'react-feather';
import { ChevronLeft } from 'react-feather';

export default function MobileNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav id='mobile' className='block lg:hidden'>
      <HamburgerButton onClick={() => setMenuOpen(!menuOpen)} />
      {menuOpen && (
        <div className='relative top-2'>
          <div className='z-50 absolute w-full max-w-[400px] p-3 rounded-lg shadow-lg font-medium bg-slate-50 dark:bg-slate-900 overflow-hidden transition-height duration-300 ease-out'>
            <ul className='flex flex-col space-y-3'>
              <li>
                <Button variant={'active'}>Button</Button>
              </li>
              <li>
                <Button variant={'selected'}>Button</Button>
              </li>
              <li>
                <Button iconRight={<ChevronRight />}>Button</Button>
              </li>
              <li>
                <Button iconLeft={<ChevronLeft />}>Button</Button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
