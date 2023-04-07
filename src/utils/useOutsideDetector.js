import { useEffect, useState } from 'react';

export default function useOutsideDetector(ref) {
  const [clickOutside, setClickOutside] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setClickOutside(true);
      } else {
        setClickOutside(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return clickOutside;
}
