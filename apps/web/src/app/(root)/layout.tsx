import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
