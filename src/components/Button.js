import { forwardRef } from 'react';

const Button = forwardRef(function Button(
  { styles, active = false, onClick, iconLeft, iconRight, children },
  ref
) {
  return (
    <button
      className={`flex ${
        iconLeft || iconRight ? 'justify-between' : 'justify-center'
      } items-center p-5 rounded-lg cursor-pointer font-medium text-left ${
        active
          ? 'bg-blue-700 hover:bg-blue-600 dark:bg-blue-800 dark:hover:bg-blue-700 text-slate-50'
          : 'bg-slate-50 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 xl:bg-slate-200 xl:hover:bg-slate-300 xl:dark:bg-slate-900 xl:dark:hover:bg-slate-800'
      } ${styles}`}
      onClick={onClick}
      ref={ref}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
});

export default Button;
