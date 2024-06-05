import Test from '@/components/test';
import { Suspense } from 'react';

export default function page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Test />
      </Suspense>
    </div>
  );
}
