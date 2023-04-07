export default function Menu({ children }) {
  return (
    <menu className='z-20 flex flex-col absolute top-16 p-3 mt-5 mr-3 rounded-lg drop-shadow-lg font-medium bg-slate-50 dark:bg-slate-900'>
      {children}
    </menu>
  );
}
