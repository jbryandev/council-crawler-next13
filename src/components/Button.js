import { forwardRef } from 'react';

const Button = forwardRef(function Button(
  { styleOverrides, active = false, onClick, iconLeft, iconRight, children },
  ref
) {
  return (
    <button
      className={`flex ${
        iconLeft || iconRight ? 'justify-between' : 'justify-center'
      } items-center p-5 rounded-lg cursor-pointer font-medium ${
        active
          ? 'bg-blue-700 hover:bg-blue-700/95 dark:bg-blue-800 dark:hover:bg-blue-800/90 text-slate-50'
          : 'bg-slate-50 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800'
      } ${styleOverrides}`}
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
