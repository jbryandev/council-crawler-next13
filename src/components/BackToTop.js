'use client';

import { ChevronUp } from 'react-feather';
import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`z-50 w-14 h-14 rounded-full bg-blue-700 text-slate-50 flex justify-center items-center fixed bottom-5 right-5 shadow-lg transition-opacity duration-1000 ease-in-out ${
        isVisible
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
      onClick={handleClick}
    >
      <ChevronUp className='w-8 h-8' />
    </button>
  );
}
