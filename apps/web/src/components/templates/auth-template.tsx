'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';

interface AuthTemplateProps {
  children: ReactNode;
}

export default function AuthTemplate({ children }: AuthTemplateProps) {
  return (
    <div className="flex w-full max-w-[500px] flex-col items-center gap-2 transition-all md:max-w-[900px]">
      <div className="text-foreground/70 flex w-full items-end justify-between">
        <h1 className="text-xl font-medium">Shoesmart</h1>
        <Link href="/" className="group flex items-center gap-1 ">
          <ChevronLeft size={20} className="translate-x-0 transition-all group-hover:-translate-x-1" />
          <p>Back to home</p>
        </Link>
      </div>
      <div className="bg-background flex min-h-[500px] w-full justify-between gap-4 rounded-xl border p-2 md:p-4">
        <div className="hidden flex-1 items-center justify-center rounded-lg bg-blue-200 md:flex">
          <Image src="/auth.svg" alt="auth-image" width={300} height={300} priority />
        </div>
        <div className="flex flex-1 flex-col justify-between">{children}</div>
      </div>
    </div>
  );
}
