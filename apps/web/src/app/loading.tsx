import LoadingAnimation from '@/components/base/LoadingAnimation';

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center space-y-2">
      <LoadingAnimation />
      <p className="text-foreground/60 text-lg font-semibold">Shoesmart.</p>
    </div>
  );
}
