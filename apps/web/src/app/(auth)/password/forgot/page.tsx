import ForgotPasswordForm from '@/components/auth/forgot-password-form';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import AuthTemplate from '@/components/templates/auth-template';
import Link from 'next/link';

export default function ResetPassword() {
  return (
    <main className="bg-gray-50">
      <MaxWidthWrapper className="flex min-h-screen items-center justify-center">
        <AuthTemplate>
          <div className="flex h-full flex-col justify-between">
            <div>
              <h2 className="text-foreground/85 text-2xl font-semibold">Reset Password</h2>
              <p className="text-foreground/60 text-sm">Enter your email to reset your password</p>
            </div>
            <ForgotPasswordForm />
            <div className="flex items-center justify-center">
              <Link href="/sign-in" className="text-foreground/60 text-sm">
                Back to login
              </Link>
            </div>
          </div>
        </AuthTemplate>
      </MaxWidthWrapper>
    </main>
  );
}