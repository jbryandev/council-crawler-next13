import { forwardRef } from 'react';

const Button = forwardRef(function Button(
  { addStyles, active, onClick, children },
  ref
) {
  return (
    <button
      className={`flex justify-center items-center p-5 rounded-lg cursor-pointer font-medium ${
        active
          ? 'bg-blue-700 hover:bg-blue-700/95 dark:bg-blue-800 dark:hover:bg-blue-800/90 text-slate-50'
          : 'hover:bg-slate-200 dark:hover:bg-slate-800'
      } ${addStyles}`}
      onClick={onClick}
      ref={ref}
    >
      {children}
    </button>
  );
});

export default Button;
