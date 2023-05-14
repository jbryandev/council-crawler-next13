import { forwardRef } from 'react';

const Menu = forwardRef(function Menu({ children }, ref) {
  return (
    <menu
      className='z-50 w-[363px] flex absolute top-16 p-3 mt-5 mr-3 rounded-lg shadow-lg font-medium bg-slate-50 dark:bg-slate-900 overflow-hidden'
      ref={ref}
    >
      {children}
    </menu>
  );
});

export default Menu;
