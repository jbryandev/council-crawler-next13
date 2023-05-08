import { forwardRef } from 'react';

const MenuListItem = forwardRef(function MenuListItem(
  { styles, active = false, onClick, iconLeft, iconRight, children },
  ref
) {
  return (
    <button
      className={`group flex ${
        iconLeft || iconRight ? 'justify-between' : 'justify-center'
      } items-center p-5 w-full rounded-lg cursor-pointer font-medium text-left ${
        active
          ? 'bg-blue-700 hover:bg-blue-600 dark:bg-blue-800 dark:hover:bg-blue-700 text-slate-50'
          : 'bg-slate-50 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 lg:bg-slate-200 lg:hover:bg-slate-300 lg:dark:bg-slate-900 lg:dark:hover:bg-slate-800'
      } ${styles}`}
      onClick={onClick}
      ref={ref}
    >
      {iconLeft && <div className='mr-5'>{iconLeft}</div>}
      {children}
      {iconRight && <div className='ml-5'>{iconRight}</div>}
    </button>
  );
});

export default MenuListItem;
