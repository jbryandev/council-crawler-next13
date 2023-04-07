import { useEffect } from 'react';

export default function useOutsideDetector(onClickOutside) {
  useEffect(() => {
    function handleOutsideClick(event) {
      onClickOutside && onClickOutside(event);
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClickOutside]);
}
