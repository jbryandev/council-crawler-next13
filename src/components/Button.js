export default function Button({
  variant = 'base',
  iconLeft,
  iconRight,
  onClick,
  className,
  children,
}) {
  const variants = {
    base: 'bg-slate-50 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 lg:bg-slate-300 lg:hover:bg-slate-400/40 lg:dark:bg-slate-800 lg:dark:hover:bg-slate-700/70',
    active:
      'bg-blue-700 hover:bg-blue-600 dark:bg-blue-800 dark:hover:bg-blue-700 text-slate-50',
    selected:
      'bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700/80 lg:bg-slate-400/70 lg:hover:bg-slate-400/80 lg:dark:bg-slate-700 lg:dark:hover:bg-slate-600/90',
  };

  return (
    <button
      className={`group flex w-full items-center p-5 rounded-lg cursor-pointer font-medium text-left ${
        iconLeft || iconRight ? 'justify-between' : 'justify-center'
      } ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {iconLeft && <div className='mr-5'>{iconLeft}</div>}
      {children}
      {iconRight && <div className='ml-5'>{iconRight}</div>}
    </button>
  );
}
