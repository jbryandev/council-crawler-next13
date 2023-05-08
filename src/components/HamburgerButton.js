import { forwardRef } from 'react';

const HamburgerButton = forwardRef(function HamburgerButton(
  { active, onClick },
  ref
) {
  return (
    <button
      className='lg:hidden justify-center p-5 rounded-lg cursor-pointer bg-blue-700 dark:bg-blue-800 hover:bg-blue-600 dark:hover:bg-blue-700'
      active={active ? true : undefined}
      onClick={onClick}
      ref={ref}
    >
      <div
        className={`h-[3px] w-7 my-1 duration-500 bg-slate-50 ${
          active ? 'rotate-45 translate-y-[7px]' : undefined
        }`}
      />
      <div
        className={`h-[3px] w-7 my-1 duration-500 bg-slate-50 ${
          active ? 'opacity-0' : undefined
        }`}
      />
      <div
        className={`h-[3px] w-7 my-1 duration-500 bg-slate-50 ${
          active ? '-rotate-45 -translate-y-[7px]' : undefined
        }`}
      />
    </button>
  );
});

export default HamburgerButton;
