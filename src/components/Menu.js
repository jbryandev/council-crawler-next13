import { forwardRef } from 'react';

const Menu = forwardRef(function Menu({ children }, ref) {
  return (
    <menu
      className='z-50 flex flex-col absolute top-16 p-3 mt-5 mr-3 rounded-lg drop-shadow-lg font-medium bg-slate-50 dark:bg-slate-900'
      ref={ref}
    >
      {children}
    </menu>
  );
});

export default Menu;
