'use client';

import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import { buttonVariants } from './ui/button';
import { useCurrentSession } from './providers/session-provider';

export const Header = () => {
  const session = useCurrentSession();

  console.log(session);
  return (
    <header className="bg-background sticky top-0 z-50">
      <MaxWidthWrapper>
        <nav className="flex h-14 w-full items-center justify-between ">
          <Link href="/">
            <h1 className="text-xl font-semibold">Shoesmart</h1>
          </Link>
          <Link
            href="/sign-in"
            className={buttonVariants({
              variant: 'default',
              size: 'sm',
              className: 'px-6',
            })}
          >
            Sign in
          </Link>
        </nav>
      </MaxWidthWrapper>
    </header>
  );
};
