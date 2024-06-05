import SignInForm from '@/components/auth/sign-in-form';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import AuthTemplate from '@/components/templates/auth-template';
import Link from 'next/link';

export default async function SignIn() {
  return (
    <main className="bg-gray-50">
      <MaxWidthWrapper className="flex min-h-screen items-center justify-center">
        <AuthTemplate>
          <div className="flex h-full flex-col justify-between">
            <div>
              <h2 className="text-foreground/85 text-2xl font-semibold">Wellcome Back to Shoesmart</h2>
              <p className="text-foreground/60 text-sm">Login to your account</p>
            </div>
            <SignInForm />
            <div className="flex items-center justify-center">
              <Link href="/sign-up" className="text-foreground/60 text-sm">
                Don&apos;t have an account? Sign up
              </Link>
            </div>
          </div>
        </AuthTemplate>
      </MaxWidthWrapper>
    </main>
  );
}
