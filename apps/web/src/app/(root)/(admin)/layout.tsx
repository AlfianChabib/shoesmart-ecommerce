import { ReactNode } from 'react';

export default function layout({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}
