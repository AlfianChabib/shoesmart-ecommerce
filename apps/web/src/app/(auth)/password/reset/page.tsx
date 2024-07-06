import ResetPasswordForm from '@/components/auth/reset-password-form';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import AuthTemplate from '@/components/templates/auth-template';
import Link from 'next/link';

export default function ResetPassword() {
  return (
    <div className="bg-gray-50">
      <MaxWidthWrapper className="flex min-h-screen items-center justify-center">
        <AuthTemplate>
          <div className="flex h-full flex-col justify-between">
            <div>
              <h2 className="text-foreground/85 text-2xl font-semibold">Reset Password</h2>
              <p className="text-foreground/85 text-sm">Reset your password by entering otp or email</p>
            </div>
            <ResetPasswordForm />
            <div className="flex items-center justify-center">
              <Link href="/sign-in" className="text-foreground/60 text-sm">
                Back to login
              </Link>
            </div>
          </div>
        </AuthTemplate>
      </MaxWidthWrapper>
    </div>
  );
}
