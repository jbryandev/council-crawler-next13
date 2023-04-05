import { useEffect, useState } from 'react';

export default function useIntersectionObserver(ref) {
  const [isVisible, setIsVisible] = useState(false);

  function callback(entries) {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callback);
    let current = ref.current;
    current && observer.observe(current);

    return () => {
      observer.unobserve(current);
    };
  });

  return isVisible;
}
