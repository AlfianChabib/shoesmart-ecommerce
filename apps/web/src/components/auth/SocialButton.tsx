'use client';

import { Button } from '../ui/button';
import { FaGoogle } from 'react-icons/fa';

export default function SocialButton({ provider }: { provider: string }) {
  const onClick = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_API_URL}auth/${provider}`;
  };

  return (
    <Button onClick={onClick} className="capitalize">
      <FaGoogle className="mr-2 h-4 w-4" />
      {provider}
    </Button>
  );
}
