import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import AuthTemplate from '@/components/templates/auth-template';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const SignUpForm = dynamic(() => import('@/components/auth/sign-up-form'), { ssr: false });

export default function SignUp() {
  return (
    <main className="bg-gray-50">
      <MaxWidthWrapper className="flex min-h-screen items-center justify-center">
        <AuthTemplate>
          <div className="flex h-full flex-col justify-between gap-4">
            <div>
              <h2 className="text-foreground/85 text-2xl font-semibold">Create an account</h2>
              <p className="text-foreground/60 text-sm">Enter your email and username below to create your account</p>
            </div>
            {SignUpForm && <SignUpForm />}
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
