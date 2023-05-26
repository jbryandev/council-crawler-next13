'use client';

import { forwardRef, useState } from 'react';

const HamburgerButton = forwardRef(function HamburgerButton(
  { isActive, onClick },
  ref
) {
  function handleClick() {
    onClick && onClick();
  }

  return (
    <button
      className='justify-center p-5 rounded-lg cursor-pointer bg-blue-700 dark:bg-blue-800 hover:bg-blue-600 dark:hover:bg-blue-700'
      onClick={handleClick}
      ref={ref}
    >
      <div
        className={`h-[3px] w-7 my-1 duration-200 bg-slate-50 ${
          isActive ? 'rotate-45 translate-y-[7px]' : undefined
        }`}
      />
      <div
        className={`h-[3px] w-7 my-1 duration-200 bg-slate-50 ${
          isActive ? 'opacity-0' : undefined
        }`}
      />
      <div
        className={`h-[3px] w-7 my-1 duration-200 bg-slate-50 ${
          isActive ? '-rotate-45 -translate-y-[7px]' : undefined
        }`}
      />
    </button>
  );
});

export default HamburgerButton;
