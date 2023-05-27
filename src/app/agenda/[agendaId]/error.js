'use client';
import Button from '@/components/Button';
import Content from '@/components/Content';
import Link from 'next/link';

// Error components must be Client Components

export default function Error({ error }) {
  return (
    <Content title={'Uh oh!'}>
      <p>{error.message}</p>
      <Link href={'/'}>
        <Button variant='active' className='mt-5 w-48'>
          Back to home
        </Button>
      </Link>
    </Content>
  );
}
