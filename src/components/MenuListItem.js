export default function MenuListItem({
  iconLeft,
  iconRight,
  isActive = false,
  addStyles,
  onClick,
  children,
}) {
  return (
    <li
      className={`group flex w-full ${
        iconLeft || iconRight ? 'justify-between' : 'justify-center'
      } items-center p-5 rounded-lg cursor-pointer font-medium text-left ${
        isActive
          ? 'bg-blue-700 hover:bg-blue-600 dark:bg-blue-800 dark:hover:bg-blue-700 text-slate-50'
          : 'bg-slate-50 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 lg:bg-slate-200 lg:hover:bg-slate-300 lg:dark:bg-slate-900 lg:dark:hover:bg-slate-800'
      } ${addStyles}`}
      onClick={onClick}
    >
      {iconLeft && <div className='mr-5'>{iconLeft}</div>}
      {children}
      {iconRight && <div className='ml-5'>{iconRight}</div>}
    </li>
  );
}
