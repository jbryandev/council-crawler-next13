import { forwardRef } from 'react';

const MenuListItem = forwardRef(function MenuListItem(
  {
    styles,
    active = false,
    onClick,
    iconLeft,
    iconRight,
    badgeValue,
    children,
  },
  ref
) {
  return (
    <button
      className={`flex ${
        iconLeft || iconRight || badgeValue != undefined
          ? 'justify-between'
          : 'justify-center'
      } items-center p-5 rounded-lg cursor-pointer font-medium text-left ${
        active
          ? 'bg-blue-700 hover:bg-blue-600 dark:bg-blue-800 dark:hover:bg-blue-700 text-slate-50'
          : 'bg-slate-50 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 lg:bg-slate-200 lg:hover:bg-slate-300 lg:dark:bg-slate-900 lg:dark:hover:bg-slate-800'
      } ${styles}`}
      onClick={onClick}
      ref={ref}
    >
      {iconLeft && <div className='mr-5'>{iconLeft}</div>}
      {children}
      <div className='flex items-center'>
        {badgeValue != undefined && (
          <div
            className={`ml-5 px-2 py-1 rounded-full ${
              active
                ? 'bg-blue-800 dark:bg-blue-900'
                : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            {badgeValue}
          </div>
        )}
        {badgeValue != undefined && (
          <div className='ml-5 min-w-[24px]'>{iconRight}</div>
        )}
      </div>
    </button>
  );
});

export default MenuListItem;
