'use client';

import { ChevronRight } from 'react-feather';
import Button from './Button';
import { agencies, agendas } from '@/utils/data';
import { ChevronLeft } from 'react-feather';
import { useState } from 'react';

export default function SidebarNav() {
  const [selectedAgency, setSelectedAgency] = useState(agencies[0]);

  function PrimaryMenu() {
    return (
      <ul className='flex flex-col space-y-3'>
        {agencies.map((agency) => {
          return (
            <li key={agency.id}>
              <Button>{agency.name}</Button>
            </li>
          );
        })}
      </ul>
    );
  }

  function SecondaryMenu() {
    return (
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
    );
  }

  return (
    <nav id='sidebar' className='hidden lg:grid grid-cols-2 gap-3'>
      <PrimaryMenu />
      <SecondaryMenu />
    </nav>
  );
}
