export default function ListItem({ key, active, onClick, children }) {
  return (
    <li
      key={key}
      className={`block mt-3 first:mt-0 p-5 rounded-lg cursor-pointer font-medium ${
        active
          ? 'bg-blue-700 hover:bg-blue-700/95 dark:bg-blue-800 dark:hover:bg-blue-800/90 text-slate-50'
          : 'hover:bg-slate-300 dark:hover:bg-slate-800'
      } `}
      onClick={onClick}
    >
      {children}
    </li>
  );
}
