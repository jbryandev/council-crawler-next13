import { forwardRef } from 'react';
import Button from './Button';

const HamburgerMenu = forwardRef(function HamburgerMenu(
  { active, onClick },
  ref
) {
  const hamburgerLine = `h-[3px] w-7 my-[3px] transition ease transform duration-300 ${
    active ? 'bg-slate-600 dark:bg-slate-300' : 'bg-slate-50'
  }`;

  return (
    <Button
      styles={`lg:hidden flex-col ${
        active &&
        '!bg-slate-300 hover:!bg-slate-400/40 dark:!bg-slate-800 dark:hover:!bg-slate-700/60'
      }`}
      active={!active}
      onClick={onClick}
      ref={ref}
    >
      <div
        className={`${hamburgerLine} ${
          active && 'rotate-45 translate-y-[9px]'
        }`}
      />
      <div className={`${hamburgerLine} ${active && 'opacity-0'}`} />
      <div
        className={`${hamburgerLine} ${
          active && '-rotate-45 -translate-y-[9px]'
        }`}
      />
    </Button>
  );
});

export default HamburgerMenu;
