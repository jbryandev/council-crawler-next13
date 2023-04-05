export default function Menu({ open, active, children }) {
  return (
    <menu
      className={`${
        open && active
          ? 'flex flex-col absolute top-16 p-3 mt-3 rounded-lg border-solid border-2 border-slate-400 dark:border-slate-700 font-medium bg-slate-200 dark:bg-slate-900'
          : 'hidden xl:grid gap-3'
      }`}
    >
      {children}
    </menu>
  );
}
