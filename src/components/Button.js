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
          : 'bg-slate-300 hover:bg-slate-400/40 dark:bg-slate-800 dark:hover:bg-slate-700/60'
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
