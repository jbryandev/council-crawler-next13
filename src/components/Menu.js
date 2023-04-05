export default function Menu({ open, active, children }) {
  return (
    <menu
      className={`${
        open && active
          ? 'z-20 flex flex-col absolute top-16 p-3 mt-3 rounded-lg drop-shadow-lg font-medium bg-slate-50 dark:bg-slate-900'
          : 'hidden xl:grid gap-3'
      }`}
    >
      {children}
    </menu>
  );
}
