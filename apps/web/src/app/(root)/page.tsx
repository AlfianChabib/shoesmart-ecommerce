'use client';

import { useLoading } from '@/context/loading';

export default function Home() {
  const { loading } = useLoading();

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
