'use client';

import Link from 'next/link';
import AuthTemplate from '@/components/templates/auth-template';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import VerifyAccountForm from '@/components/auth/verify-account-form';
import { useQuery } from '@tanstack/react-query';
import { AuthService } from '@/services/auth-service';
import { useSearchParams } from 'next/navigation';

export default function Verification() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const {
    data: checkToken,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['checkToken', token],
    queryFn: () => {
      return AuthService.checkToken(token as string);
    },
    retry: false,
    enabled: !!token,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="bg-gray-50">
      <MaxWidthWrapper className="flex min-h-screen items-center justify-center">
        <AuthTemplate>
          <div className="flex h-full flex-col justify-between gap-4">
            <div>
              <h2 className="text-foreground/85 text-2xl font-semibold">Account verification</h2>
              <p className="text-foreground/60 text-sm">Verify your account by enter password</p>
            </div>
            {!isError && checkToken && token ? (
              <div>
                <VerifyAccountForm token={token} />
              </div>
            ) : (
              <p>{error?.message}</p>
            )}
            <div className="flex items-center justify-center">
              <Link href="/sign-in" className="text-foreground/60 text-sm">
                Have an account? Sign In
              </Link>
            </div>
          </div>
        </AuthTemplate>
      </MaxWidthWrapper>
    </main>
  );
}
