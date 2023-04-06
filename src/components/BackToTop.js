import { ChevronUp } from 'react-feather';

export default function BackToTop() {
  return (
    <button className='z-50 w-16 h-16 rounded-full bg-blue-700 flex justify-center items-center fixed bottom-5 right-5 shadow-lg'>
      <ChevronUp className='w-8 h-8' />
    </button>
  );
}
