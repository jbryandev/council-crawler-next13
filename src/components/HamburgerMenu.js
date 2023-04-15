import { forwardRef } from 'react';
import Button from './Button';

const HamburgerMenu = forwardRef(function HamburgerMenu(
  { active, onClick },
  ref
) {
  return (
    <Button
      styles='lg:hidden flex-col !bg-blue-700 dark:!bg-blue-800 hover:!bg-blue-600 dark:hover:!bg-blue-700'
      active={active}
      onClick={onClick}
      ref={ref}
    >
      <div
        className={`h-[3px] w-7 my-[3px] duration-500 bg-slate-50 ${
          active && 'rotate-45 translate-y-[9px]'
        }`}
      />
      <div
        className={`h-[3px] w-7 my-[3px] duration-500 bg-slate-50 ${
          active && 'opacity-0'
        }`}
      />
      <div
        className={`h-[3px] w-7 my-[3px] duration-500 bg-slate-50 ${
          active && '-rotate-45 -translate-y-[9px]'
        }`}
      />
    </Button>
  );
});

export default HamburgerMenu;
